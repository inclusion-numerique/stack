import { output } from '@app/cli/output'
import { prismaClient } from '@app/web/prismaClient'
import type { MigrateResourceCommand } from '@app/web/server/resources/feature/MigrateResource'
import type { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import { handleResourceCreationCommand } from '@app/web/server/resources/feature/handleResourceCreationCommand'
import { createSlug } from '@app/web/utils/createSlug'
import { chunk } from 'lodash'
import { v4 } from 'uuid'
import type { FindManyItemType } from '@app/migration/utils/findManyItemType'
import {
  SlugToLegacyIdMap,
  computeSlugAndUpdateExistingSlugs,
} from '@app/migration/utils/computeSlugAndUpdateExistingSlugs'
import { transformContent } from '@app/migration/modelMigrations/transformContent'
import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import type { LegacyToNewIdHelper } from '@app/migration/legacyToNewIdHelper'

export const getLegacyResources = () =>
  migrationPrismaClient.main_resource.findMany({
    include: {
      main_basesection_resources: true,
      // Each content seems to be inside a section. With a null title if at the "root", or with a "title" if inside a section
      main_contentsection: {
        orderBy: { order: 'asc' },
        include: {
          main_contentblock: {
            orderBy: { order: 'asc' },
            include: {
              main_filecontent: true,
              main_linkcontent: true,
              main_linkedresourcecontent: true,
              main_textcontent: true,
            },
          },
        },
      },
      // TODO Do not know if this is useful
      main_contentblock: true,
    },
  })

export type LegacyResource = FindManyItemType<typeof getLegacyResources>

export const getExistingResourceSlugs = (): Promise<SlugToLegacyIdMap> =>
  prismaClient.resource
    .findMany({ select: { slug: true, legacyId: true } })
    .then(
      (resources) =>
        new Map(resources.map(({ slug, legacyId }) => [slug, legacyId])),
    )

export const transformResource = ({
  legacyResource,
  slug,
  userIdFromLegacyId,
  baseIdFromLegacyId,
  imageIdFromLegacyId,
  uploadKeyFromLegacyKey,
}: {
  legacyResource: LegacyResource
  userIdFromLegacyId: LegacyToNewIdHelper
  baseIdFromLegacyId: LegacyToNewIdHelper
  imageIdFromLegacyId: LegacyToNewIdHelper
  uploadKeyFromLegacyKey: (legacyKey: string) => string
  // Deduplicated slug
  slug: string
}):
  | MigrateResourceCommand
  | { error: string; legacyResource: LegacyResource } => {
  const legacyId = Number(legacyResource.id)

  if (!legacyResource.creator_id) {
    return { error: 'No creator', legacyResource }
  }

  const payload = {
    resourceId: v4(),
    legacyId,
    title: legacyResource.title,
    slug,
    titleDuplicationCheckSlug: createSlug(legacyResource.title),
    description: legacyResource.description ?? '',
    byId: userIdFromLegacyId(Number(legacyResource.creator_id)),
    baseId: legacyResource.root_base_id
      ? baseIdFromLegacyId(Number(legacyResource.root_base_id))
      : null,
    created: legacyResource.created,
    updated: legacyResource.modified,
    imageId: legacyResource.profile_image_id
      ? imageIdFromLegacyId(Number(legacyResource.profile_image_id))
      : null,
    contents: [] as MigrateResourceCommand['payload']['contents'],
    isPublic: legacyResource.state === 'public',
    published:
      legacyResource.state === 'draft' ? null : legacyResource.modified,
  } satisfies MigrateResourceCommand['payload']

  const orderedLegacyResourcesOrSectionTitle =
    legacyResource.main_contentsection.flatMap((legacySection) => {
      if (legacySection.title === null) {
        // This is a section without title, it is at the "root" level of the resource
        return legacySection.main_contentblock
      }

      // This is a legacy section with a title, we flatten the structure in the new app and the section becomes a content
      return [legacySection, ...legacySection.main_contentblock]
    })

  for (const [
    index,
    content,
  ] of orderedLegacyResourcesOrSectionTitle.entries()) {
    const transformedContent = transformContent({
      legacyContent: content,
      imageIdFromLegacyId,
      uploadKeyFromLegacyKey,
      order: index,
    })
    if (!transformedContent) {
      continue
    }
    payload.contents.push(transformedContent)
  }

  return {
    name: 'MigrateResource',
    payload,
  }
}

export const migrateResources = async ({
  userIdFromLegacyId,
  baseIdFromLegacyId,
  imageIdFromLegacyId,
  uploadKeyFromLegacyKey,
  existingResourceSlugs,
}: {
  userIdFromLegacyId: LegacyToNewIdHelper
  baseIdFromLegacyId: LegacyToNewIdHelper
  imageIdFromLegacyId: LegacyToNewIdHelper
  uploadKeyFromLegacyKey: (legacyKey: string) => string
  existingResourceSlugs: SlugToLegacyIdMap
}) => {
  const legacyResources = await getLegacyResources()
  output(`- Found ${legacyResources.length} resources to migrate`)
  const commands = legacyResources
    .map((legacyResource) => {
      const slug = computeSlugAndUpdateExistingSlugs(
        legacyResource,
        existingResourceSlugs,
      )
      const command = transformResource({
        slug,
        legacyResource,
        userIdFromLegacyId,
        baseIdFromLegacyId,
        imageIdFromLegacyId,
        uploadKeyFromLegacyKey,
      })

      if ('error' in command) {
        output(
          `-- ⚠️ Could not migrate resource ${legacyResource.id}: ${command.error}`,
          legacyResource,
        )
      }
      return command
    })
    .filter(
      (
        command,
      ): command is Exclude<
        ReturnType<typeof transformResource>,
        {
          error: string
          legacyResource: LegacyResource
        }
      > => !('error' in command),
    )
  const migratedResources: ResourceProjection[] = []
  const migratedContents: ResourceProjection['contents'] = []

  output(`- Migrating ${commands.length} resources`)

  const executeCommand = async (command: MigrateResourceCommand) => {
    const result = await handleResourceCreationCommand(command, {
      user: undefined,
    })
    migratedResources.push(result.resource)
    migratedContents.push(...result.resource.contents)
    if (migratedResources.length % 25 === 0) {
      output(
        `-- ${migratedResources.length} ${(
          (migratedResources.length * 100) /
          commands.length
        ).toFixed(0)}%`,
      )
    }
  }

  const chunkSize = 50
  for (const commandChunk of chunk(commands, chunkSize)) {
    // eslint-disable-next-line no-await-in-loop
    await Promise.all(commandChunk.map(executeCommand))
  }

  return {
    migratedResources,
    migratedContents,
  }
}
