import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import React from 'react'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import BackButton from '@app/web/components/BackButton'
import Notice from '@codegouvfr/react-dsfr/Notice'
import ContactSupportLink from '@app/web/components/ContactSupportLink'
import Button from '@codegouvfr/react-dsfr/Button'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Add a search param "message" for the error message
const ImportErreurPage = ({
  searchParams: { message },
}: {
  searchParams: { message?: string }
}) => {
  const displayMessage =
    message ?? 'Une erreur est survenue, veuillez réessayer'

  return (
    <CoopPageContainer size={794} className="fr-pt-8v">
      <CoopBreadcrumbs
        parents={[
          {
            label: `Mes bénéficiaires`,
            linkProps: { href: '/coop/mes-beneficiaires' },
          },
          {
            label: `Importer des bénéficiaires`,
            linkProps: { href: '/coop/mes-beneficiaires/importer' },
          },
        ]}
        currentPage="Erreur"
      />
      <BackButton href="/coop/mes-beneficiaires/importer">
        Retour à l’import
      </BackButton>

      <div className="fr-mb-12v fr-border fr-border-radius--8 fr-p-12v">
        <img
          src="/images/iconographie/visuel-erreur.svg"
          alt=""
          className="fr-mb-6v fr-mx-auto fr-display-block"
        />
        <h1 className="fr-h3 fr-mb-12v fr-text-title--blue-france fr-text--center">
          Erreur lors de l’analyse du fichier
        </h1>
        <Notice
          className="fr-notice--warning"
          title="Nous n’avons pas pu analyser le fichier que vous souhaitez importer."
        />
        <p className="fr-mt-12v fr-mb-6v">
          L’erreur lors de l’analyse de votre fichier pour avoir des causes
          différentes&nbsp;:
        </p>
        <ul>
          <li>
            <strong>Le fichier ne correspond pas au modèle&nbsp;:</strong>{' '}
            générez un nouveau fichier avec le modèle à télécharger lors de la
            première étape
          </li>
          <li>
            <strong>Mauvais format de fichier&nbsp;:</strong> il faut un fichier
            au format .xlsx
          </li>
          <li>
            <strong>Erreurs dans le nommage des colonnes&nbsp;:</strong> les
            colonnes sont introuvables ou ont été modifiées, essayez de les
            renommer en correspondance avec le modèle
          </li>
        </ul>
        <div className="fr-btns-group fr-mt-12v">
          <Button
            priority="primary"
            linkProps={{
              href: '/coop/mes-beneficiaires/importer',
            }}
          >
            Importer un autre fichier
          </Button>
          <Button
            priority="tertiary"
            linkProps={{
              href: '/coop/mes-beneficiaires',
            }}
          >
            Quitter l’import
          </Button>
        </div>
        <div className="fr-flex fr-align-items-center fr-justify-content-center">
          <ContactSupportLink className="fr-text--center fr-mx-auto fr-display-inline-block">
            Besoin d’aide&nbsp;? Contactez le support
          </ContactSupportLink>
        </div>
      </div>
    </CoopPageContainer>
  )
}

export default ImportErreurPage
