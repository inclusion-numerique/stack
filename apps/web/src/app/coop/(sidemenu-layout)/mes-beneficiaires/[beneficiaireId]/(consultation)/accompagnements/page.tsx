import { notFound } from 'next/navigation'
import { getBeneficiaireAccompagnementsPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-beneficiaires/[beneficiaireId]/(consultation)/accompagnements/getBeneficiaireAccompagnementsPageData'
import ViewBeneficiaireAccompagnementsPage from '@app/web/app/coop/(sidemenu-layout)/mes-beneficiaires/[beneficiaireId]/(consultation)/accompagnements/ViewBeneficiaireAccompagnementsPage'
import { authenticateMediateur } from '@app/web/auth/authenticateUser'

const BeneficiaireAccompagnementsPage = async ({
  params: { beneficiaireId },
}: {
  params: { beneficiaireId: string }
}) => {
  const user = await authenticateMediateur()

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
