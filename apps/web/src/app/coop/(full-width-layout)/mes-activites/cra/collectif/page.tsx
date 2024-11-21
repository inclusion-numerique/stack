import { DefaultValues } from 'react-hook-form'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import {
  decodeSerializableState,
  EncodedState,
} from '@app/web/utils/encodeSerializableState'
import { CraCollectifData } from '@app/web/cra/CraCollectifValidation'
import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'
import { AdressBanFormFieldOption } from '@app/web/components/form/AdresseBanFormField'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { getInitialLieuxActiviteOptionsForSearch } from '@app/web/app/lieu-activite/getInitialLieuxActiviteOptionsForSearch'
import CraCollectifPage from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/collectif/CraCollectifPage'

const CreateCraCollectifPage = async ({
  searchParams: { v, retour } = {},
}: {
  searchParams?: {
    v?: EncodedState<DefaultValues<CraCollectifData>>
    retour?: string
  }
}) => {
  const user = await getAuthenticatedMediateur()
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
    duree: urlFormState.duree ?? { dureePersonnaliseeType: 'minutes' },
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

  const { lieuxActiviteOptions, mostUsedLieuActivite } =
    await getInitialLieuxActiviteOptionsForSearch({
      mediateurIds: [user.mediateur.id],
    })

  if (!defaultValues.structureId) {
    defaultValues.structureId = mostUsedLieuActivite?.structure.id ?? undefined
  }

  const initialBeneficiairesOptions =
    await getInitialBeneficiairesOptionsForSearch({
      mediateurId,
    })

  // TODO: get most probable communes using the filter helper functions
  const initialCommunesOptions: AdressBanFormFieldOption[] = []

  return (
    <CraCollectifPage
      defaultValues={defaultValues}
      initialBeneficiairesOptions={initialBeneficiairesOptions}
      initialCommunesOptions={initialCommunesOptions}
      lieuxActiviteOptions={lieuxActiviteOptions}
      mediateurId={user.mediateur.id}
      retour={retour}
    />
  )
}

export default CreateCraCollectifPage
