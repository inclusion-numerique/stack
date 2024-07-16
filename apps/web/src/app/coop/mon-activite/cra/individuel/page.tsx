import RequiredFieldsDisclamer from '@app/ui/components/Form/RequiredFieldsDisclamer'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import { DefaultValues } from 'react-hook-form'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import CraIndividuelForm from '@app/web/app/coop/mon-activite/cra/individuel/CraIndividuelForm'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { prismaClient } from '@app/web/prismaClient'
import { CraIndividuelData } from '@app/web/cra/CraIndividuelValidation'
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
import { banDefaultValueToAdresseBanData } from '@app/web/external-apis/ban/banDefaultValueToAdresseBanData'

const CreateCraIndividuelPage = async ({
  searchParams: { v } = {},
}: {
  searchParams?: { v?: EncodedState<DefaultValues<CraIndividuelData>> }
}) => {
  const user = await getAuthenticatedMediateur()

  const urlFormState = v ? decodeSerializableState(v, {}) : {}

  // delete sensitive data from urlFormState
  delete urlFormState.id
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
    // If no value for domicile usager, then default to beneficiaire adresse
    lieuAccompagnementDomicileCommune:
      urlFormState.lieuAccompagnementDomicileCommune ??
      (urlFormState.beneficiaire?.communeResidence
        ? banDefaultValueToAdresseBanData(
            urlFormState.beneficiaire.communeResidence,
          )
        : null),
  }

  // TODO if beneficiaire.id passed from url (or beneficiaire commune) then create
  //  option for beneficiaire domicile so that it is selected in the custom
  //  select from lieuAccompagnement ?

  const lieuxActivite = await prismaClient.mediateurEnActivite.findMany({
    where: {
      mediateurId: user.mediateur.id,
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
              crasIndividuels: {
                where: {
                  creeParMediateurId: user.mediateur.id,
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
      lieu.structure._count.crasIndividuels >
      accumulator.structure._count.crasIndividuels
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
    mediateurId: user.mediateur.id,
  })
  const beneficiariesForSelect = await prismaClient.beneficiaire.findMany({
    where: whereBeneficiaire,
    select: searchBeneficiaireSelect,
    orderBy: [
      { crasIndividuels: { _count: 'desc' } },
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

  return (
    <CoopPageContainer size={794} className="fr-pt-8v">
      <CoopBreadcrumbs currentPage="Enregistrer un accompagnement individuel" />
      <h1 className="fr-text-title--blue-france fr-mb-2v">
        Accompagnement individuel
      </h1>
      <RequiredFieldsDisclamer />

      <CraIndividuelForm
        defaultValues={defaultValues}
        lieuActiviteOptions={lieuxActiviteOptions}
        initialBeneficiariesOptions={initialBeneficiariesOptions}
      />
    </CoopPageContainer>
  )
}

export default CreateCraIndividuelPage
