import type { UtilisateursDataTableSearchParams } from '@app/web/app/administration/utilisateurs/UtilisateursDataTable'
import { searchUtilisateur } from '@app/web/app/administration/utilisateurs/searchUtilisateur'
import { prismaClient } from '@app/web/prismaClient'

export const getUtilisateursListPageData = async ({
  searchParams,
}: {
  searchParams: UtilisateursDataTableSearchParams
}) => {
  const searchResult = await searchUtilisateur({
    searchParams,
  })

  const totalCount = await prismaClient.user.count({})

  return {
    totalCount,
    searchResult,
    searchParams,
  }
}

export type UtilisateursListPageData = Exclude<
  Awaited<ReturnType<typeof getUtilisateursListPageData>>,
  null
>
