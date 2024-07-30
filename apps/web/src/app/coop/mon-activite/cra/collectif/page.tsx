import RequiredFieldsDisclamer from '@app/ui/components/Form/RequiredFieldsDisclamer'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import { DefaultValues } from 'react-hook-form'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { prismaClient } from '@app/web/prismaClient'
import {
  decodeSerializableState,
  EncodedState,
} from '@app/web/utils/encodeSerializableState'
import {
  beneficiairesListWhere,
  searchBeneficiaireSelect,
} from '@app/web/beneficiaire/searchBeneficiaire'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'
import { prismaBeneficiaireToBeneficiaireData } from '@app/web/beneficiaire/prismaBeneficiaireToBeneficiaireData'
import { BeneficiaireData } from '@app/web/beneficiaire/BeneficiaireValidation'
import { CraCollectifData } from '@app/web/cra/CraCollectifValidation'
import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'
import CraCollectifForm from '@app/web/app/coop/mon-activite/cra/collectif/CraCollectifForm'
import { AdressBanFormFieldOption } from '@app/web/components/form/AdresseBanFormField'

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

  /**
   * Récupération des lieux d'activité de l'utilisateur
   * et sélection du lieu d'activité le plus utilisé pour ce type de CRA
   */
  const lieuxActivite = await prismaClient.mediateurEnActivite.findMany({
    where: {
      mediateurId,
      suppression: null,
    },
    select: {
      id: true,
      structure: {
        select: {
          nom: true,
          id: true,
          _count: {
            select: {
              crasCollectifs: {
                where: {
                  creeParMediateurId: mediateurId,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      structure: {
        nom: 'asc',
      },
    },
  })

  // TODO : handle case where there is no lieuxActivite
  if (lieuxActivite.length === 0) {
    throw new Error('No lieux activite found')
  }

  const mostUsedLieuActivite = lieuxActivite.reduce((accumulator, lieu) => {
    if (
      lieu.structure._count.crasCollectifs >
      accumulator.structure._count.crasCollectifs
    ) {
      return lieu
    }
    return accumulator
  }, lieuxActivite[0])

  const lieuxActiviteOptions = lieuxActivite.map(
    ({ structure: { id, nom } }) =>
      ({
        value: id,
        label: nom,
      }) satisfies SelectOption,
  )

  defaultValues.lieuActiviteId = mostUsedLieuActivite.structure.id

  // Initial list of beneficiaires for pre-populating selected beneficiary or quick select search
  const whereBeneficiaire = beneficiairesListWhere({
    mediateurId,
  })
  const beneficiariesForSelect = await prismaClient.beneficiaire.findMany({
    where: whereBeneficiaire,
    select: searchBeneficiaireSelect,
    orderBy: [
      { participationsAteliersCollectifs: { _count: 'desc' } },
      {
        nom: 'asc',
      },
      {
        prenom: 'asc',
      },
    ],
    take: 20,
  })

  const totalCountBeneficiaires = await prismaClient.beneficiaire.count({
    where: whereBeneficiaire,
  })

  const initialBeneficiariesOptions: SelectOption<BeneficiaireData | null>[] =
    beneficiariesForSelect.map((beneficiaire) => ({
      label: getBeneficiaireDisplayName({
        nom: beneficiaire.nom,
        prenom: beneficiaire.prenom,
      }),
      value: prismaBeneficiaireToBeneficiaireData(beneficiaire),
    }))

  const beneficiairesNotDisplayed =
    totalCountBeneficiaires - initialBeneficiariesOptions.length
  if (beneficiairesNotDisplayed > 0) {
    initialBeneficiariesOptions.push({
      label: `Veuillez préciser votre recherche - ${
        beneficiairesNotDisplayed
      } bénéficiaire${beneficiairesNotDisplayed === 1 ? ' n’est pas affiché' : 's ne sont pas affichés'}`,
      value: null,
    })
  }

  /**
   * Récupération des communes les plus probables pour les options par défault de la commune du lieu de l'atelier
   * ( là ou il y a déjà eu des cras collectifs ou là ou il y a les lieux d’activité )
   */

  const crasCollectifsForCommune = await prismaClient.craCollectif.groupBy({
    where: {
      creeParMediateurId: mediateurId,
    },
    by: ['lieuAccompagnementAutreCodeInsee'],
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: 'desc',
      },
    },
    take: 20,
  })

  console.log('CRAS COLLECTIFS FOR COMMUNE', crasCollectifsForCommune)
  // TODO Check this and populate options

  const initialCommunesOptions: AdressBanFormFieldOption[] = []

  console.log('DEFAULT VALUES FROM PAGE', defaultValues)

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
        initialBeneficiariesOptions={initialBeneficiariesOptions}
        initialCommunesOptions={initialCommunesOptions}
      />
    </CoopPageContainer>
  )
}

export default CreateCraCollectifPage
