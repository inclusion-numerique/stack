import type { UtilisateursDataTableSearchParams } from '@app/web/app/administration/utilisateurs/UtilisateursDataTable'
import { searchUtilisateur } from '@app/web/app/administration/utilisateurs/searchUtilisateur'
import { getCommunesAndDepartementsOptions } from '@app/web/app/lieu-activite/getCommunesAndDepartementsOptions'
import { getLieuxActiviteOptions } from '@app/web/app/lieu-activite/getLieuxActiviteOptions'
import { prismaClient } from '@app/web/prismaClient'

export const getUtilisateursListPageData = async ({
  searchParams,
}: {
  searchParams: UtilisateursDataTableSearchParams
}) => {
  const searchResult = await searchUtilisateur({
    searchParams,
  })

  const { communesOptions, departementsOptions } =
    await getCommunesAndDepartementsOptions()

  const lieuxActiviteOptions = await getLieuxActiviteOptions()

  const totalCount = await prismaClient.user.count({})

  return {
    totalCount,
    searchResult,
    searchParams,
    communesOptions,
    departementsOptions,
    lieuxActiviteOptions,
  }
}
