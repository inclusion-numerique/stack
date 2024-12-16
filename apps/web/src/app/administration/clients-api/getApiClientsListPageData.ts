import { prismaClient } from '@app/web/prismaClient'

export const getApiClientsListPageData = async () => {
  const apiClients = await prismaClient.apiClient.findMany({
    orderBy: {
      created: 'desc',
    },
  })

  return { apiClients }
}

export type ApiClientsListPageData = Exclude<
  Awaited<ReturnType<typeof getApiClientsListPageData>>,
  null
>

export type ApiClientListItem = ApiClientsListPageData['apiClients'][number]
