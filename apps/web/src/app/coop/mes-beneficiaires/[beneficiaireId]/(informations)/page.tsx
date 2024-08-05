import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { notFound } from 'next/navigation'
import ViewBeneficiaireInformationsPage from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(informations)/ViewBeneficiaireInformationsPage'
import { getBeneficiaireInformationsData } from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(informations)/getBeneficiaireInformationsData'

const BeneficiaireInformationsPage = async ({
  params: { beneficiaireId },
}: {
  params: { beneficiaireId: string }
}) => {
  const user = await getAuthenticatedMediateur()

  const data = await getBeneficiaireInformationsData({
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
