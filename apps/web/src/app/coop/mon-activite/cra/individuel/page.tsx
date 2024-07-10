import RequiredFieldsDisclamer from '@app/ui/components/Form/RequiredFieldsDisclamer'
import Button from '@codegouvfr/react-dsfr/Button'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import { DefaultValues } from 'react-hook-form'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import IconInSquare from '@app/web/components/IconInSquare'
import CraIndividuelForm from '@app/web/app/coop/mon-activite/cra/individuel/CraIndividuelForm'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { prismaClient } from '@app/web/prismaClient'
import { CraIndividuelData } from '@app/web/cra/CraIndividuelValidation'
import {
  decodeSerializableState,
  EncodedState,
} from '@app/web/utils/encodeSerializableState'

const CreateCraIndividuelPage = async ({
  searchParams: { v } = {},
}: {
  searchParams?: { v?: EncodedState<DefaultValues<CraIndividuelData>> }
}) => {
  const user = await getAuthenticatedMediateur()

  const urlFormState = v ? decodeSerializableState(v) : {}

  // delete sensitive data from urlFormState
  delete urlFormState.id
  delete urlFormState.mediateurId

  const defaultValues: DefaultValues<CraIndividuelData> = {
    ...urlFormState,
    date: new Date().toISOString().slice(0, 10),
    mediateurId: user.mediateur.id,
    beneficiaire: {
      // Could be from another mediateur ? is it safe ? check will be backend ?
      mediateurId: user.mediateur.id,
      ...urlFormState.beneficiaire,
    },
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

  return (
    <CoopPageContainer size={794} className="fr-pt-8v">
      <CoopBreadcrumbs currentPage="Enregistrer un accompagnement individuel" />
      <h1 className="fr-text-title--blue-france fr-mb-2v">
        Accompagnement individuel
      </h1>
      <RequiredFieldsDisclamer />
      <div className="fr-background-alt--blue-france fr-px-8v fr-py-6v fr-border-radius--8 fr-my-12v fr-flex fr-flex-gap-8v fr-align-items-center wip-outline">
        <IconInSquare
          iconId="fr-icon-user-heart-line"
          size="large"
          background="fr-background-default--grey"
        />
        <div>
          <p className="fr-text--bold fr-mb-1v">Lier à un bénéficiaire</p>
          <p className="fr-text--sm fr-mb-0 fr-flex-grow-1">
            Si vous ne liez pas cette activité à un bénéficiaire, alors il
            restera anonyme.
          </p>
        </div>
        <Button type="button" priority="secondary" iconId="fr-icon-add-line">
          Lier&nbsp;à&nbsp;un&nbsp;bénéficiaire
        </Button>
      </div>
      <CraIndividuelForm
        defaultValues={defaultValues}
        lieuActiviteOptions={lieuxActiviteOptions}
      />
    </CoopPageContainer>
  )
}

export default CreateCraIndividuelPage
