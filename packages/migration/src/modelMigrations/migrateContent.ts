import { v4 } from 'uuid'
import { LegacyResource } from '@app/migration/modelMigrations/migrateResource'
import type { Prisma } from '@prisma/client'
import { Resource } from '@prisma/client'

export type MigrateContentInput = {
  legacyResource: LegacyResource
  resource: Pick<Resource, 'id'>
  transaction: Prisma.TransactionClient
  legacyContent:
    | LegacyResource['main_contentsection'][number]['main_contentblock'][number]
    | LegacyResource['main_contentsection'][number]
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

  const type: CreateContentData['type'] | null =
    // We migrate sections as SectionTitle
    'main_contentblock' in legacyContent
      ? 'SectionTitle'
      : // Other contents are migrated as Text, Link or File
      legacyContent.main_textcontent
      ? 'Text'
      : legacyContent.main_linkcontent ||
        legacyContent.main_linkedresourcecontent
      ? 'Link'
      : legacyContent.main_filecontent
      ? 'File'
      : null

  if (!type) {
    throw new Error('Could not determine content type')
  }

  const typeData: Partial<CreateContentData> = {
    // All relevant contents have a title
    title: legacyContent.title,
  }

  // We migrate sections as SectionTitle
  if ('main_contentblock' in legacyContent) {
    typeData.type = 'SectionTitle'
  } else if (legacyContent.main_textcontent) {
    typeData.type = 'Text'
    typeData.text = legacyContent.main_textcontent.text
  } else if (legacyContent.main_linkcontent) {
    typeData.type = 'Link'
    // TODO QUESTION What is target_image in a main_link content
    typeData.url = legacyContent.main_linkcontent.link
    typeData.showPreview = legacyContent.main_linkcontent.with_preview
    typeData.caption = legacyContent.main_linkcontent.target_description
    // TODO We should have a system to scrap link previews automaticaly
  } else if (legacyContent.main_linkedresourcecontent) {
    typeData.type = 'Link'
    // TODO Seems wierd to migrate resources links like this
    typeData.url = `/legacy-content/${
      legacyContent.main_linkedresourcecontent.linked_resource_id?.toString() ??
      'missing'
    }`
    typeData.showPreview = true
  } else if (legacyContent.main_filecontent) {
    typeData.type = 'File'
    typeData.file = legacyContent.main_filecontent.file
  }

  // TODO Add data depending on type

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
