import RequiredFieldsDisclamer from '@app/ui/components/Form/RequiredFieldsDisclamer'
import { DefaultValues } from 'react-hook-form'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { CraDemarcheAdministrativeData } from '@app/web/cra/CraDemarcheAdministrativeValidation'
import {
  decodeSerializableState,
  EncodedState,
} from '@app/web/utils/encodeSerializableState'
import { banDefaultValueToAdresseBanData } from '@app/web/external-apis/ban/banDefaultValueToAdresseBanData'
import CraDemarcheAdministrativeForm from '@app/web/app/coop/mes-activites/cra/administratif/CraDemarcheAdministrativeForm'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { getInitialLieuxActiviteOptionsForSearch } from '@app/web/app/lieu-activite/getInitialLieuxActiviteOptionsForSearch'

const CreateCraDemarcheAdministrativePage = async ({
  searchParams: { v } = {},
}: {
  searchParams?: {
    v?: EncodedState<DefaultValues<CraDemarcheAdministrativeData>>
  }
}) => {
  const user = await getAuthenticatedMediateur()

  const urlFormState = v ? decodeSerializableState(v, {}) : {}

  // delete sensitive data from urlFormState
  delete urlFormState.id
  delete urlFormState.mediateurId

  const defaultValues: DefaultValues<CraDemarcheAdministrativeData> & {
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
      mediateurId: user.mediateur.id,
      withMost: 'demarche',
    })

  defaultValues.lieuActiviteId = mostUsedLieuActivite?.structure.id ?? undefined

  const initialBeneficiairesOptions =
    await getInitialBeneficiairesOptionsForSearch({
      mediateurId: user.mediateur.id,
    })

  return (
    <CoopPageContainer size={794} className="fr-pt-8v">
      <CoopBreadcrumbs currentPage="Enregistrer une aide aux démarches administratives" />
      <h1 className="fr-text-title--blue-france fr-mb-2v">
        Aide aux démarches administratives
      </h1>
      <RequiredFieldsDisclamer />

      <CraDemarcheAdministrativeForm
        defaultValues={defaultValues}
        lieuActiviteOptions={lieuxActiviteOptions}
        initialBeneficiairesOptions={initialBeneficiairesOptions}
      />
    </CoopPageContainer>
  )
}

export default CreateCraDemarcheAdministrativePage
