import RequiredFieldsDisclamer from '@app/ui/components/Form/RequiredFieldsDisclamer'
import Button from '@codegouvfr/react-dsfr/Button'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import IconInSquare from '@app/web/components/IconInSquare'
import CraIndividuelForm from '@app/web/app/coop/mon-activite/cra/individuel/CraIndividuelForm'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'

const CraIndividuelPage = async () => {
  const user = await getAuthenticatedMediateur()

  const defaultValues = {
    date: new Date().toISOString().slice(0, 10),
    mediateurId: user.mediateur.id,
    beneficiaire: {
      mediateurId: user.mediateur.id,
    },
  }

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
      <CraIndividuelForm defaultValues={defaultValues} />
    </CoopPageContainer>
  )
}

export default CraIndividuelPage
