import { notFound } from 'next/navigation'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { getInitialLieuxActiviteOptionsForSearch } from '@app/web/app/lieu-activite/getInitialLieuxActiviteOptionsForSearch'
import CraDemarcheAdministrativePage from '@app/web/app/coop/mes-activites/cra/administratif/CraDemarcheAdministrativePage'
import { getCraDemarcheAdministrativeDataDefaultValuesFromExisting } from '@app/web/app/coop/mes-activites/cra/administratif/getCraDemarcheAdministrativeDataDefaultValuesFromExisting'

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
  const user = await getAuthenticatedMediateur()

  const defaultValues =
    await getCraDemarcheAdministrativeDataDefaultValuesFromExisting({
      id,
      mediateurId: user.mediateur.id,
    })

  if (!defaultValues) {
    notFound()
    return null
  }

  const { lieuxActiviteOptions, mostUsedLieuActivite } =
    await getInitialLieuxActiviteOptionsForSearch({
      mediateurId: user.mediateur.id,
      withMost: 'demarche',
    })

  if (!defaultValues.lieuActiviteId) {
    defaultValues.lieuActiviteId =
      mostUsedLieuActivite?.structure.id ?? undefined
  }

  const initialBeneficiairesOptions =
    await getInitialBeneficiairesOptionsForSearch({
      mediateurId: user.mediateur.id,
      includeBeneficiaireId: defaultValues.beneficiaire?.id ?? undefined,
    })

  return (
    <CraDemarcheAdministrativePage
      defaultValues={defaultValues}
      mediateurId={user.mediateur.id}
      lieuxActiviteOptions={lieuxActiviteOptions}
      initialBeneficiairesOptions={initialBeneficiairesOptions}
      retour={retour}
    />
  )
}

export default UpdateCraDemarcheAdministrativePage
