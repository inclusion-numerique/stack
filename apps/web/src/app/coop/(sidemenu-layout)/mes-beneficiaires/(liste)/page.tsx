import type { Metadata } from 'next'
import { prismaClient } from '@app/web/prismaClient'
import MesBeneficiairesListeEmptyPage from '@app/web/app/coop/(sidemenu-layout)/mes-beneficiaires/(liste)/MesBeneficiairesListeEmptyPage'
import { getBeneficiairesListPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-beneficiaires/(liste)/getBeneficiairesListPageData'
import MesBeneficiairesListePage from '@app/web/app/coop/(sidemenu-layout)/mes-beneficiaires/(liste)/MesBeneficiairesListePage'
import { BeneficiairesDataTableSearchParams } from '@app/web/beneficiaire/BeneficiairesDataTable'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateMediateur } from '@app/web/auth/authenticateUser'

export const metadata: Metadata = {
  title: metadataTitle('Mes bénéficiaires'),
}

const MesBeneficiairesPage = async ({
  searchParams = {},
}: {
  searchParams?: BeneficiairesDataTableSearchParams
}) => {
  const user = await authenticateMediateur()

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
