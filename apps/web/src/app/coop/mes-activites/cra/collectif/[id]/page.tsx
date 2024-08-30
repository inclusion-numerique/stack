import { notFound } from 'next/navigation'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { getInitialLieuxActiviteOptionsForSearch } from '@app/web/app/lieu-activite/getInitialLieuxActiviteOptionsForSearch'
import CraCollectifPage from '@app/web/app/coop/mes-activites/cra/collectif/CraCollectifPage'
import { getCraCollectifDataDefaultValuesFromExisting } from '@app/web/app/coop/mes-activites/cra/collectif/getCraCollectifDataDefaultValuesFromExisting'
import type { AdressBanFormFieldOption } from '@app/web/components/form/AdresseBanFormField'

const UpdateCraCollectifPage = async ({
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

  const defaultValues = await getCraCollectifDataDefaultValuesFromExisting({
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
    })

  // TODO: get most probable communes using the filter helper functions
  const initialCommunesOptions: AdressBanFormFieldOption[] = []

  return (
    <CraCollectifPage
      defaultValues={defaultValues}
      mediateurId={user.mediateur.id}
      lieuxActiviteOptions={lieuxActiviteOptions}
      initialBeneficiairesOptions={initialBeneficiairesOptions}
      initialCommunesOptions={initialCommunesOptions}
      retour={retour}
    />
  )
}

export default UpdateCraCollectifPage
