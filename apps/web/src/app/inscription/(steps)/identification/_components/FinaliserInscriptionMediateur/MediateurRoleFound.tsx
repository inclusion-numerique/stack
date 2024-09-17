import Link from 'next/link'

export const MediateurRoleFound = () => (
  <div className="fr-flex fr-direction-column fr-flex-gap-12v">
    <h1 className="fr-h3 fr-mb-0 fr-text-title--blue-france fr-text--center">
      Finaliser votre inscription pour accéder à votre espace
    </h1>
    <div>
      <p>
        La Coop de la médiation numérique s’adresse aux médiateurs numériques
        professionnels.
      </p>
      <p className="fr-mb-0">
        Afin de finaliser votre inscription, nous allons vous demander de{' '}
        <strong>
          renseigner votre structure employeuse ainsi que vos lieux d’activités.
        </strong>
      </p>
    </div>
    <div className="fr-text--center">
      <Link
        className="fr-width-full fr-display-block fr-mb-3w fr-btn fr-btn--lg"
        href="/inscription/mediateur/structure-employeuse"
      >
        Continuer
      </Link>
      <Link href="/" className="fr-link ">
        Revenir plus tard
      </Link>
    </div>
  </div>
)
