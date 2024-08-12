import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { prismaClient } from '@app/web/prismaClient'
import MesBeneficiairesListeEmptyPage from '@app/web/app/coop/mes-beneficiaires/(liste)/MesBeneficiairesListeEmptyPage'
import { getBeneficiairesListPageData } from '@app/web/app/coop/mes-beneficiaires/(liste)/getBeneficiairesListPageData'
import MesBeneficiairesListePage from '@app/web/app/coop/mes-beneficiaires/(liste)/MesBeneficiairesListePage'
import { BeneficiairesDataTableSearchParams } from '@app/web/beneficiaire/BeneficiairesDataTable'

const MesBeneficiairesPage = async ({
  searchParams = {},
}: {
  searchParams?: BeneficiairesDataTableSearchParams
}) => {
  const user = await getAuthenticatedMediateur()

  const hasBeneficiaires = await prismaClient.beneficiaire.count({
    where: {
      mediateurId: user.mediateur.id,
      suppression: null,
    },
    take: 1,
  })

  if (hasBeneficiaires) {
    const data = await getBeneficiairesListPageData({
      mediateurId: user.mediateur.id,
      searchParams,
    })

    return <MesBeneficiairesListePage data={data} />
  }

  return <MesBeneficiairesListeEmptyPage />
}

export default MesBeneficiairesPage
