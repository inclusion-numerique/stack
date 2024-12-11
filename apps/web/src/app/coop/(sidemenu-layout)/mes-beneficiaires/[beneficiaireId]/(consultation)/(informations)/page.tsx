import { notFound } from 'next/navigation'
import ViewBeneficiaireInformationsPage from '@app/web/app/coop/(sidemenu-layout)/mes-beneficiaires/[beneficiaireId]/(consultation)/(informations)/ViewBeneficiaireInformationsPage'
import { getBeneficiaireInformationsPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-beneficiaires/[beneficiaireId]/(consultation)/(informations)/getBeneficiaireInformationsPageData'
import { authenticateMediateur } from '@app/web/auth/authenticateUser'

const BeneficiaireInformationsPage = async ({
  params: { beneficiaireId },
}: {
  params: { beneficiaireId: string }
}) => {
  const user = await authenticateMediateur()

  const data = await getBeneficiaireInformationsPageData({
    beneficiaireId,
    mediateurId: user.mediateur.id,
  })

  if (!data) {
    notFound()
    return null
  }

  return <ViewBeneficiaireInformationsPage data={data} />
}

export default BeneficiaireInformationsPage
