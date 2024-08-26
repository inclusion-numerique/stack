import RequiredFieldsDisclamer from '@app/ui/components/Form/RequiredFieldsDisclamer'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import { DefaultValues } from 'react-hook-form'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { prismaClient } from '@app/web/prismaClient'
import { CraDemarcheAdministrativeData } from '@app/web/cra/CraDemarcheAdministrativeValidation'
import {
  decodeSerializableState,
  EncodedState,
} from '@app/web/utils/encodeSerializableState'
import { banDefaultValueToAdresseBanData } from '@app/web/external-apis/ban/banDefaultValueToAdresseBanData'
import CraDemarcheAdministrativeForm from '@app/web/app/coop/mes-activites/cra/administratif/CraDemarcheAdministrativeForm'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'

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
              crasDemarchesAdministratives: {
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
      lieu.structure._count.crasDemarchesAdministratives >
      accumulator.structure._count.crasDemarchesAdministratives
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
