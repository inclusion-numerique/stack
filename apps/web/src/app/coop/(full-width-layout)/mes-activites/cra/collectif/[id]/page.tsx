import { notFound } from 'next/navigation'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { getLieuxActiviteOptions } from '@app/web/app/lieu-activite/getLieuxActiviteOptions'
import CraCollectifPage from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/collectif/CraCollectifPage'
import { getCraCollectifDataDefaultValuesFromExisting } from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/collectif/getCraCollectifDataDefaultValuesFromExisting'
import type { AdressBanFormFieldOption } from '@app/web/components/form/AdresseBanFormField'
import { getAdaptiveDureeOptions } from '@app/web/cra/getAdaptiveDureeOptions'

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

  const lieuxActiviteOptions = await getLieuxActiviteOptions({
    mediateurIds: [user.mediateur.id],
  })

  if (!defaultValues.structureId) {
    defaultValues.structureId = lieuxActiviteOptions.at(0)?.value ?? undefined
  }

  const initialBeneficiairesOptions =
    await getInitialBeneficiairesOptionsForSearch({
      mediateurId: user.mediateur.id,
    })

  // TODO: get most probable communes using the filter helper functions
  const initialCommunesOptions: AdressBanFormFieldOption[] = []

  const dureeOptions = await getAdaptiveDureeOptions({
    mediateurId: user.mediateur.id,
    include: defaultValues.duree?.duree,
  })

  return (
    <CraCollectifPage
      defaultValues={defaultValues}
      mediateurId={user.mediateur.id}
      lieuxActiviteOptions={lieuxActiviteOptions}
      initialBeneficiairesOptions={initialBeneficiairesOptions}
      initialCommunesOptions={initialCommunesOptions}
      dureeOptions={dureeOptions}
      retour={retour}
    />
  )
}

export default UpdateCraCollectifPage
