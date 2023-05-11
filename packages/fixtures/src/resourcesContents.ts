import { faker } from '@faker-js/faker'
import { prismaClient } from '@app/web/prismaClient'
import { ContentTypeValues } from '@app/web/utils/prismaEnums'

const BASE_NUMBER = 10

const contentTypes = Object.values(ContentTypeValues)
export const randomResourcesContents: (
  random: number,
) => Promise<
  Exclude<
    Exclude<
      Parameters<typeof prismaClient.content.createMany>[0],
      undefined
    >['data'],
    undefined
  >
> = async (random) => {
  const resources = await prismaClient.resource.findMany()
  return resources.flatMap(
    (resource) =>
      Array.from(
        { length: Math.random() * 2 * random * BASE_NUMBER },
        (_, index) => {
          const type = faker.helpers.arrayElement(contentTypes)
          switch (type) {
            case 'SectionTitle': {
              return {
                type,
                order: index,
                resourceId: resource.id,
                title: faker.lorem.text(),
              }
            }
            default: {
              return null
            }
          }
        },
        // Will be removed once everything is managed
      ).filter(Boolean) as Exclude<
        Exclude<
          Parameters<typeof prismaClient.content.createMany>[0],
          undefined
        >['data'],
        undefined
      >,
  )
}
