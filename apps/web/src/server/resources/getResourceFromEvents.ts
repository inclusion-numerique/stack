import { prismaClient } from '@app/web/prismaClient'
import {
  ResourceProjection,
  createResourceProjection,
} from '@app/web/server/resources/feature/createResourceProjection'
import { HistoryEventsForResource } from '@app/web/server/resources/feature/features'

export const getResourceFromEvents = async (
  where: { slug: string } | { id: string },
): Promise<ResourceProjection | null> => {
  const resourceWithEvents = await prismaClient.resource.findUnique({
    where,
    select: {
      events: {
        select: {
          id: true,
          type: true,
          data: true,
        },
        orderBy: [{ timestamp: 'asc' }, { sequence: 'asc' }],
      },
    },
  })

  if (!resourceWithEvents) {
    return null
  }

  return createResourceProjection(
    resourceWithEvents.events as unknown as HistoryEventsForResource,
  )
}
