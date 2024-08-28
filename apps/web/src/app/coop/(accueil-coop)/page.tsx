import Button from '@codegouvfr/react-dsfr/Button'
import React from 'react'
import Link from 'next/link'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import Card from '../../../components/Card'
import { CreateCraModalDefinition } from '../mes-activites/CreateCraModalDefinition'

const Page = async () => {
  const user = await getAuthenticatedSessionUser()

  return (
    <CoopPageContainer size={794}>
      <SkipLinksPortal links={defaultSkipLinks} />
      <main id={contentId}>
        <h1 className="fr-text-title--blue-france fr-mt-10v">
          👋 Bonjour {user.firstName || user.name || user.email}
        </h1>
        <section className="fr-my-6w">
          <h2 className="fr-h5 fr-text-mention--grey">
            <span className="ri-apps-line fr-mr-1w" aria-hidden />
            Mes actions rapides
          </h2>
        </section>
        <section className="fr-my-6w">
          <h2 className="fr-h5 fr-text-mention--grey">
            <span className="ri-chat-poll-line fr-mr-1w" aria-hidden />
            Mes statistiques
          </h2>
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-lg-6 fr-col-md-12 fr-col-sm-6 fr-col-12">
              <div className="fr-p-3w fr-border-radius--16 fr-background-alt--brown-caramel fr-height-full">
                <span
                  className="ri-user-heart-line ri-2x fr-text-label--brown-caramel"
                  aria-hidden
                />
                <div className="fr-text--bold fr-my-1w fr-text--xl">
                  {0} Bénéficiaires accompagnés
                </div>
                <ul className="fr-text-mention--grey fr-text--sm fr-mb-0 fr-list-group">
                  <li>{0} bénéficiaires suivis</li>
                  <li>{0} bénéficiaires anonymes</li>
                </ul>
              </div>
            </div>
            <div className="fr-col-lg-6 fr-col-md-12 fr-col-sm-6 fr-col-12">
              <div className="fr-p-3w fr-border-radius--16 fr-background-alt--brown-caramel fr-height-full">
                <span
                  className="ri-service-line ri-2x fr-text-label--brown-caramel"
                  aria-hidden
                />
                <div className="fr-text--bold fr-my-1w fr-text--xl">
                  {0} Accompagnements
                </div>
                <ul className="fr-text-mention--grey fr-text--sm fr-mb-0 fr-list-group">
                  <li>{0} accompagnements individuels</li>
                  <li>{0} participants lors de 0 ateliers</li>
                  <li>{0} aides aux démarches administratives</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="fr-my-6w">
          <h2 className="fr-h5 fr-text-mention--grey">
            <span className="ri-service-line fr-mr-1w" aria-hidden />
            Mes 3 dernières activités enregistrés
          </h2>
          <div className="fr-text--center fr-background-alt--blue-france fr-p-6w fr-border-radius--16">
            <p className="fr-text--bold fr-text--lg fr-mb-1w">
              Vous n’avez pas encore enregistré d’activité
            </p>
            <p className="fr-mb-4w">
              Vous pouvez enregistrer votre première activité en cliquant sur
              ‘Enregistrer une activité’.
            </p>
            <Button
              type="button"
              {...CreateCraModalDefinition.buttonProps}
              iconId="fr-icon-add-line"
            >
              Enregistrer une activité
            </Button>
          </div>
        </section>
        <hr className="fr-separator-1px" />
        <section className="fr-my-6w">
          <h2 className="fr-h5 fr-text-mention--grey">
            <span className="ri-information-line fr-mr-1w" aria-hidden />
            Plus d’informations sur la Coop
          </h2>
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col fr-col-md-6">
              <Card
                noBorder
                className="fr-enlarge-link fr-border fr-border-radius--16"
                title={<span>Le Centre d’aide</span>}
                description="Nous vous guidons dans la prise en main des différentes fonctionnalités de la Coop de la médiation numérique."
                href="#"
              />
            </div>
            <div className="fr-col fr-col-md-6">
              <Card
                noBorder
                className="fr-enlarge-link fr-border fr-border-radius--16"
                title={<span>Prochaines évolutions</span>}
                description="Retrouvez ici les prochaines évolutions de la plateforme et comment contribuer à son amélioration."
                href="#"
              />
            </div>
          </div>
        </section>
        <section className="fr-flex-xl fr-flex-gap-4v fr-background-alt--blue-france fr-p-4w fr-border-radius--16">
          <div>
            <h2 className="fr-mb-1w fr-text--xs fr-text--uppercase fr-flex fr-flex-gap-3v fr-align-items-center">
              <span
                className="ri-video-chat-line ri-xl fr-text--light"
                aria-hidden
              />
              Participez au prochain webinaire
            </h2>
            <p className="fr-text--sm fr-my-2w">
              Nous organisons régulièrement des présentations de l’outil & des
              prochaines évolutions.
            </p>
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              title="Accéder à l'inscription au prochain webinaire - nouvelle fenêtre"
              className="fr-btn fr-btn--sm wip-outline"
            >
              S’inscrire au prochain webinaire
            </Link>
          </div>
          <div className="fr-border-right fr-border--blue-france fr-mx-md-5w" />
          <div className="fr-border-bottom fr-border--blue-france fr-my-3w fr-hidden-xl" />
          <div>
            <h2 className="fr-mb-1w fr-text--xs fr-text--uppercase fr-flex fr-flex-gap-3v fr-align-items-center">
              <span
                className="ri-questionnaire-line ri-xl fr-text--light"
                aria-hidden
              />
              Contactez le support
            </h2>
            <p className="fr-text--sm fr-my-2w">
              En cas de problèmes rencontrés sur la plateforme, n’hésitez pas à
              nous contacter à l’adresse suivante&nbsp;:
            </p>
            <div className="fr-text--lg fr-text-label--blue-france fr-flex fr-flex-gap-3v fr-align-items-center fr-mb-0">
              <span
                className="ri-mail-line ri-lg fr-text--light"
                aria-hidden="true"
              />
              <Link href="mailto:manon.galle@anct.gouv.fr">
                manon.galle@anct.gouv.fr
              </Link>
            </div>
          </div>
        </section>
      </main>
    </CoopPageContainer>
  )
}

export default Page
