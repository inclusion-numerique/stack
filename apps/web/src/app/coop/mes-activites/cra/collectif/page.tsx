import RequiredFieldsDisclamer from '@app/ui/components/Form/RequiredFieldsDisclamer'
import { DefaultValues } from 'react-hook-form'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import {
  decodeSerializableState,
  EncodedState,
} from '@app/web/utils/encodeSerializableState'
import { CraCollectifData } from '@app/web/cra/CraCollectifValidation'
import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'
import CraCollectifForm from '@app/web/app/coop/mes-activites/cra/collectif/CraCollectifForm'
import { AdressBanFormFieldOption } from '@app/web/components/form/AdresseBanFormField'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { getInitialLieuxActiviteOptionsForSearch } from '@app/web/app/lieu-activite/getInitialLieuxActiviteOptionsForSearch'

const CreateCraCollectifPage = async ({
  searchParams: { v } = {},
}: {
  searchParams?: { v?: EncodedState<DefaultValues<CraCollectifData>> }
}) => {
  const user = await getAuthenticatedMediateur()
  const mediateurId = user.mediateur.id

  const urlFormState = v ? decodeSerializableState(v, {}) : {}

  // delete sensitive data from urlFormState
  delete urlFormState.id
  delete urlFormState.mediateurId

  const defaultValues: DefaultValues<CraCollectifData> & {
    mediateurId: string
  } = {
    ...urlFormState,
    date: new Date().toISOString().slice(0, 10),
    mediateurId,
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
      mediateurId: user.mediateur.id,
      withMost: 'collectif',
    })

  defaultValues.lieuActiviteId = mostUsedLieuActivite?.structure.id ?? undefined

  const initialBeneficiairesOptions =
    await getInitialBeneficiairesOptionsForSearch({
      mediateurId,
    })
  /**
   * Récupération des communes les plus probables pour les options par défault de la commune du lieu de l'atelier
   * ( là ou il y a déjà eu des cras collectifs ou là ou il y a les lieux d’activité )
   */

  // const crasCollectifsForCommune = await prismaClient.craCollectif.groupBy({
  //   where: {
  //     creeParMediateurId: mediateurId,
  //   },
  //   by: ['lieuAccompagnementAutreCodeInsee'],
  //   _count: {
  //     id: true,
  //   },
  //   orderBy: {
  //     _count: {
  //       id: 'desc',
  //     },
  //   },
  //   take: 20,
  // })

  const initialCommunesOptions: AdressBanFormFieldOption[] = []

  return (
    <CoopPageContainer size={794} className="fr-pt-8v">
      <CoopBreadcrumbs currentPage="Enregistrer un accompagnement collectif" />
      <h1 className="fr-text-title--blue-france fr-mb-2v">
        Accompagnement collectif
      </h1>
      <RequiredFieldsDisclamer />

      <CraCollectifForm
        defaultValues={defaultValues}
        lieuActiviteOptions={lieuxActiviteOptions}
        initialBeneficiairesOptions={initialBeneficiairesOptions}
        initialCommunesOptions={initialCommunesOptions}
      />
    </CoopPageContainer>
  )
}

export default CreateCraCollectifPage
