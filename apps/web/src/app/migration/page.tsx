import type { Metadata } from 'next'
import Image from 'next/image'
import Button from '@codegouvfr/react-dsfr/Button'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import LogoCoop from '@app/web/components/LogoCoop'

export const metadata: Metadata = {
  title: metadataTitle('Migration vers la nouvelle version de la plateforme !'),
}

const MigrationPage = () => (
  <div className="fr-container">
    <SkipLinksPortal links={defaultSkipLinks} />
    <main id={contentId} className="fr-container fr-my-8w">
      <div className="fr-background-alt--brown-caramel fr-p-xl-24v fr-p-md-12v fr-p-8v fr-border-radius--32">
        <div className="fr-grid-row fr-grid-row--gutters fr-align-items-center">
          <div className="fr-col-lg-7 col-12">
            <h1 className="fr-text-title--blue-france fr-mb-2w">
              Migration vers la nouvelle version de la plateforme&nbsp;!
            </h1>
            <div className="fr-background-contrast--info fr-py-4v fr-px-6v fr-my-6v fr-border-radius--8 fr-flex fr-direction-md-row fr-direction-column fr-flex-gap-4v fr-align-items-center">
              <Image
                width={64}
                height={64}
                src="/images/services/conseillers-numerique-logo.svg"
                alt=""
              />
              <span>
                Les adresses e-mails professionnelles{' '}
                <span className="fr-text--bold fr-text--nowrap">
                  @conseiller-numerique.fr
                </span>{' '}
                ainsi que l’ancienne version de l’espace Coop ont été supprimés
                aujourd’hui.
              </span>
            </div>
            <p className="fr-text--xl fr-mb-10v">
              Nous vous invitons à créer votre compte sur la nouvelle version de
              la plateforme où vous pourrez retrouvez toutes vos données de
              l’ancienne version et découvrir de nouvelles fonctionnalités
              adaptées à la pratique de la médiation numérique.
            </p>
            <Button
              title="Accueil de la coop de la médiation numérique"
              size="large"
              linkProps={{ href: '/' }}
            >
              Voir le site
            </Button>
          </div>
          <div className="fr-col-lg-4 fr-col-offset-lg-1 fr-col-12 fr-unhidden-lg fr-hidden fr-direction-column">
            <div className="fr-flex fr-align-items-center fr-mb-10v">
              <LogoCoop
                width={78}
                height={78}
                backgroundColor="var(--blue-france-925-125)"
                className="fr-mr-3v"
              />
              <div className="fr-text--lg fr-text--medium fr-mb-0">
                La Coop de la médiation numérique
              </div>
            </div>
            <Image
              className="fr-border-radius--16"
              src="/images/illustrations/landing-page/hero/solution.webp"
              alt=""
              width={282}
              height={353}
            />
          </div>
        </div>
      </div>
    </main>
  </div>
)
export default MigrationPage
