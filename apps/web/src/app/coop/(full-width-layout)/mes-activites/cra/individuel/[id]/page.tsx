import CraIndividuelPage from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/individuel/CraIndividuelPage'
import { getCraIndividuelDataDefaultValuesFromExisting } from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/individuel/getCraIndividuelDataDefaultValuesFromExisting'
import { getLieuxActiviteOptions } from '@app/web/app/lieu-activite/getLieuxActiviteOptions'
import { authenticateMediateur } from '@app/web/auth/authenticateUser'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { getAdaptiveDureeOptions } from '@app/web/cra/getAdaptiveDureeOptions'
import { notFound } from 'next/navigation'

const UpdateCraIndividuelPage = async ({
  params: { id },
  searchParams: { retour } = {},
}: {
  params: {
    id: string
  }
  searchParams?: {
    retour?: string
  }
}) => {
  const user = await authenticateMediateur()

  const defaultValues = await getCraIndividuelDataDefaultValuesFromExisting({
    id,
    mediateurId: user.mediateur.id,
  })

  if (!defaultValues) {
    notFound()
    return null
  }

  const lieuxActiviteOptions = await getLieuxActiviteOptions({
    mediateurIds: [user.mediateur.id],
  })

  if (!defaultValues.structureId) {
    defaultValues.structureId = lieuxActiviteOptions.at(0)?.value ?? undefined
  }

  const initialBeneficiairesOptions =
    await getInitialBeneficiairesOptionsForSearch({
      mediateurId: user.mediateur.id,
      includeBeneficiaireIds: defaultValues.beneficiaire?.id
        ? [defaultValues.beneficiaire.id]
        : [],
    })

  const dureeOptions = await getAdaptiveDureeOptions({
    mediateurId: user.mediateur.id,
    include: defaultValues.duree?.duree,
  })

  return (
    <CraIndividuelPage
      defaultValues={defaultValues}
      mediateurId={user.mediateur.id}
      lieuxActiviteOptions={lieuxActiviteOptions}
      initialBeneficiairesOptions={initialBeneficiairesOptions}
      dureeOptions={dureeOptions}
      retour={retour}
    />
  )
}

export default UpdateCraIndividuelPage
