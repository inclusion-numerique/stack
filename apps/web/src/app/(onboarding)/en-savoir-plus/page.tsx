import { Metadata } from 'next'
import Link from 'next/link'
import Button from '@codegouvfr/react-dsfr/Button'
import LogoCoop from '@app/web/components/LogoCoop'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import { CloseButton } from '../_components/CloseButton'

export const metadata: Metadata = {
  title: metadataTitle('En savoir plus'),
}

const Page = async () => {
  const user = await authenticateUser()

  const nextPageRoute = user.coordinateur
    ? '/en-savoir-plus/coordinateur/mes-statistiques'
    : '/en-savoir-plus/mes-activites'

  return (
    <div className="fr-layout fr-background-alt--blue-france">
      <div className="fr-layout__inner">
        <div className=" fr-container--narrow fr-m-auto">
          <div className="fr-background-default--grey fr-p-6w fr-border-radius--16 fr-mx-3w fr-text--center ">
            <LogoCoop className="fr-mb-6w" />
            <div className="fr-mb-6w">
              <h1 className="fr-h3 fr-mb-1w fr-text-title--blue-france">
                Bienvenue sur la Coop de la médiation numérique !
              </h1>
              <p className="fr-text--xl">
                Découvrez un aperçu des fonctionnalités principales de la
                plateforme.
              </p>
            </div>
            <Button
              className="fr-btn--responsive fr-mb-4w"
              size="large"
              iconId="fr-icon-arrow-right-line"
              iconPosition="right"
              title="Découvrir les fonctionnalités"
              linkProps={{ href: nextPageRoute }}
            >
              Découvrir
            </Button>
            <Link className="fr-link" href="/coop">
              Voir plus tard
            </Link>
          </div>
        </div>
        <CloseButton closeHref="/coop" />
      </div>
    </div>
  )
}

export default Page
