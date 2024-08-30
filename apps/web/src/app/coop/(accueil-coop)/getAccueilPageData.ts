import { getActivitesListPageData } from '@app/web/app/coop/mes-activites/(liste)/getActivitesListPageData'
import {
  EMPTY_BENEFICIAIRE_DATA,
  getBeneficiairesAnonymesStats,
  getBeneficiaireStats,
} from '@app/web/app/coop/mes-statistiques/_queries/getBeneficiaireStats'
import {
  getAccompagnementBeneficiaires,
  getModalitesAccompagnementStats,
} from '@app/web/app/coop/mes-statistiques/_queries/getModalitesAccompagnementStats'
import { mergeQuantifiedShare } from '@app/web/app/coop/mes-statistiques/quantifiedShare'

export const getAccueilPageData = async (mediateurId: string) => {
  const modalitesAccompagnement =
    await getModalitesAccompagnementStats(mediateurId)

  const beneficiaireStats = await getBeneficiaireStats(mediateurId)

  const beneficiairesAnonymesStats =
    await getBeneficiairesAnonymesStats(mediateurId)

  const accompagnementBeneficiaires = getAccompagnementBeneficiaires(
    modalitesAccompagnement,
    mergeQuantifiedShare(EMPTY_BENEFICIAIRE_DATA, beneficiaireStats),
    mergeQuantifiedShare(EMPTY_BENEFICIAIRE_DATA, beneficiairesAnonymesStats),
  )

  const data = await getActivitesListPageData({
    mediateurId,
    searchParams: { lignes: '3' },
  })

  return {
    activites: data.searchResult.activites,
    statistiques: {
      accompagnementBeneficiaires: {
        dernierMois: accompagnementBeneficiaires,
        derniereSemaine: accompagnementBeneficiaires,
      },
      modalitesAccompagnement: {
        dernierMois: modalitesAccompagnement,
        derniereSemaine: modalitesAccompagnement,
      },
    },
  }
}

export type AccueilPageData = Awaited<ReturnType<typeof getAccueilPageData>>
