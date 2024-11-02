import { notFound } from 'next/navigation'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { getBeneficiaireAccompagnementsPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-beneficiaires/[beneficiaireId]/(consultation)/accompagnements/getBeneficiaireAccompagnementsPageData'
import ViewBeneficiaireAccompagnementsPage from '@app/web/app/coop/(sidemenu-layout)/mes-beneficiaires/[beneficiaireId]/(consultation)/accompagnements/ViewBeneficiaireAccompagnementsPage'

const BeneficiaireAccompagnementsPage = async ({
  params: { beneficiaireId },
}: {
  params: { beneficiaireId: string }
}) => {
  const user = await getAuthenticatedMediateur()

  const data = await getBeneficiaireAccompagnementsPageData({
    beneficiaireId,
    mediateurId: user.mediateur.id,
  })

  if (!data) {
    notFound()
    return null
  }

  return <ViewBeneficiaireAccompagnementsPage data={data} />
}

export default BeneficiaireAccompagnementsPage
