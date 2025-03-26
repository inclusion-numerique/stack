import CraCollectifPage from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/collectif/CraCollectifPage'
import { getMediateursLieuxActiviteOptions } from '@app/web/app/lieu-activite/getMediateursLieuxActiviteOptions'
import { authenticateMediateur } from '@app/web/auth/authenticateUser'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { AdressBanFormFieldOption } from '@app/web/components/form/AdresseBanFormField'
import { CraCollectifData } from '@app/web/cra/CraCollectifValidation'
import { getAdaptiveDureeOptions } from '@app/web/cra/getAdaptiveDureeOptions'
import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'
import {
  EncodedState,
  decodeSerializableState,
} from '@app/web/utils/encodeSerializableState'
import { DefaultValues } from 'react-hook-form'

const CreateCraCollectifPage = async ({
  searchParams: { v, retour } = {},
}: {
  searchParams?: {
    v?: EncodedState<DefaultValues<CraCollectifData>>
    retour?: string
  }
}) => {
  const user = await authenticateMediateur()
  const mediateurId = user.mediateur.id

  const urlFormState = v ? decodeSerializableState(v, {}) : {}

  // delete sensitive data from urlFormState
  delete urlFormState.mediateurId

  const defaultValues: DefaultValues<CraCollectifData> & {
    mediateurId: string
  } = {
    ...urlFormState,
    date: new Date().toISOString().slice(0, 10),
    mediateurId,
    duree: urlFormState.duree ?? {},
    participantsAnonymes: {
      ...participantsAnonymesDefault,
      ...urlFormState.participantsAnonymes,
    },
    // Filter participants to only show the ones that are linked to the current mediator (e.g. in case of url copy/paste)
    participants:
      urlFormState.participants?.filter(
        (participant) =>
          !!participant?.id && participant.mediateurId === mediateurId,
      ) ?? [],
  }

  const lieuxActiviteOptions = await getMediateursLieuxActiviteOptions({
    mediateurIds: [user.mediateur.id],
  })

  if (!defaultValues.structureId) {
    defaultValues.structureId = lieuxActiviteOptions.at(0)?.value ?? undefined
  }

  const initialBeneficiairesOptions =
    await getInitialBeneficiairesOptionsForSearch({
      mediateurId,
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
      initialBeneficiairesOptions={initialBeneficiairesOptions}
      initialCommunesOptions={initialCommunesOptions}
      lieuxActiviteOptions={lieuxActiviteOptions}
      dureeOptions={dureeOptions}
      mediateurId={user.mediateur.id}
      retour={retour}
    />
  )
}

export default CreateCraCollectifPage
