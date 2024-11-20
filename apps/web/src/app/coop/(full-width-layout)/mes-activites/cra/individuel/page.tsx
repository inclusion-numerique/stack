import type { DefaultValues } from 'react-hook-form'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import type { CraIndividuelData } from '@app/web/cra/CraIndividuelValidation'
import {
  decodeSerializableState,
  type EncodedState,
} from '@app/web/utils/encodeSerializableState'
import { banDefaultValueToAdresseBanData } from '@app/web/external-apis/ban/banDefaultValueToAdresseBanData'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { getInitialLieuxActiviteOptionsForSearch } from '@app/web/app/lieu-activite/getInitialLieuxActiviteOptionsForSearch'
import CraIndividuelPage from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/individuel/CraIndividuelPage'

const CreateCraIndividuelPage = async ({
  searchParams: { v, retour } = {},
}: {
  searchParams?: {
    v?: EncodedState<DefaultValues<CraIndividuelData>>
    retour?: string
  }
}) => {
  const user = await getAuthenticatedMediateur()

  const urlFormState = v ? decodeSerializableState(v, {}) : {}

  // delete sensitive data from urlFormState
  delete urlFormState.mediateurId

  const defaultValues: DefaultValues<CraIndividuelData> & {
    mediateurId: string
  } = {
    ...urlFormState,
    date: new Date().toISOString().slice(0, 10),
    mediateurId: user.mediateur.id,
    beneficiaire: {
      // Could be from another mediateur ? is it safe ? check will be backend ?
      mediateurId: user.mediateur.id,
      ...urlFormState.beneficiaire,
    },
    duree: urlFormState.duree ?? { dureePersonnaliseeType: 'minutes' },
    // If no value for domicile usager, then default to beneficiaire adresse
    lieuAccompagnementDomicileCommune:
      urlFormState.lieuAccompagnementDomicileCommune ??
      (urlFormState.beneficiaire?.communeResidence
        ? banDefaultValueToAdresseBanData(
            urlFormState.beneficiaire.communeResidence,
          )
        : null),
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
      mediateurId: user.mediateur.id,
    })

  return (
    <CraIndividuelPage
      lieuxActiviteOptions={lieuxActiviteOptions}
      initialBeneficiairesOptions={initialBeneficiairesOptions}
      mediateurId={user.mediateur.id}
      defaultValues={defaultValues}
      retour={retour}
    />
  )
}

export default CreateCraIndividuelPage
