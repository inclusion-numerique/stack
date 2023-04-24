import { v4 } from 'uuid'
import { LegacyResource } from '@app/migration/modelMigrations/migrateResource'
import type { Prisma } from '@prisma/client'
import { Resource } from '@prisma/client'

export type MigrateContentInput = {
  legacyResource: LegacyResource
  resource: Pick<Resource, 'id'>
  transaction: Prisma.TransactionClient
  legacyContent: LegacyResource['main_contentblock'][number]
  order: number
}

type CreateContentData = Parameters<
  Prisma.TransactionClient['content']['create']
>[0]['data']

export const migrateContent = async ({
  resource,
  legacyContent,
  transaction,
  order,
}: MigrateContentInput) => {
  const legacyId = Number(legacyContent.id)

  const type: CreateContentData['type'] = legacyContent.main_textcontent
    ? 'Text'
    : legacyContent.main_linkcontent || legacyContent.main_linkedresourcecontent
    ? 'Link'
    : legacyContent.main_filecontent
    ? 'File'
    : 'SectionTitle'

  // TODO SectionTitle here is not correct how to determine if it is one ?

  const data = {
    id: v4(),
    legacyId,
    resourceId: resource.id,
    order,
    type,
    title: legacyContent.title,
    created: legacyContent.created,
    updated: legacyContent.modified,
  } satisfies CreateContentData

  const content = await transaction.content.create({
    data,
  })

  return content
}
