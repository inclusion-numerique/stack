import { notFound } from 'next/navigation'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { getLieuxActiviteOptions } from '@app/web/app/lieu-activite/getLieuxActiviteOptions'
import CraDemarcheAdministrativePage from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/administratif/CraDemarcheAdministrativePage'
import { getCraDemarcheAdministrativeDataDefaultValuesFromExisting } from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/administratif/getCraDemarcheAdministrativeDataDefaultValuesFromExisting'
import { getAdaptiveDureeOptions } from '@app/web/cra/getAdaptiveDureeOptions'
import { authenticateMediateur } from '@app/web/auth/authenticateUser'

const UpdateCraDemarcheAdministrativePage = async ({
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

  const defaultValues =
    await getCraDemarcheAdministrativeDataDefaultValuesFromExisting({
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
      includeBeneficiaireId: defaultValues.beneficiaire?.id ?? undefined,
    })

  const dureeOptions = await getAdaptiveDureeOptions({
    mediateurId: user.mediateur.id,
    include: defaultValues.duree?.duree,
  })

  return (
    <CraDemarcheAdministrativePage
      defaultValues={defaultValues}
      mediateurId={user.mediateur.id}
      lieuxActiviteOptions={lieuxActiviteOptions}
      initialBeneficiairesOptions={initialBeneficiairesOptions}
      dureeOptions={dureeOptions}
      retour={retour}
    />
  )
}

export default UpdateCraDemarcheAdministrativePage
