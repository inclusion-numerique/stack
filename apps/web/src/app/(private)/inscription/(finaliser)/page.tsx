import Link from 'next/link'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'

export const metadata = {
  title: metadataTitle('Finaliser son inscription'),
}

const Page = async () => {
  const user = await getAuthenticatedSessionUser()

  return (
    <div className="fr-container fr-container--narrow fr-pt-12v fr-pb-40v">
      <h1 className="fr-h2 fr-text-title--blue-france fr-mb-8v">
        Finaliser son inscription
      </h1>
      <div className="fr-width-full fr-flex fr-align-items-center fr-flex-gap-12v fr-border-radius--16 fr-background-alt--blue-france fr-py-6v fr-px-12v">
        <div>
          <img src="/images/logo-data-inclusion.svg" />
        </div>
        <div>
          <h2 className="fr-h6 fr-mb-1v">Dites-le-nous une fois&nbsp;!</h2>
          <p className="fr-mb-1v">
            Nous vérifions les informations que vous renseignez afin de garantir
            une fiabilité des données et la rendre disponibles pour tous.
          </p>
          <Link
            href="https://fr.wikipedia.org/wiki/Chèvre#Origine_et_domestication"
            className="wip"
          >
            En savoir plus{' '}
            <span className="fr-icon-arrow-right-line fr-icon--sm" />
          </Link>
        </div>
      </div>

      <div className="fr-mt-6v">
        <h5>Todo Sections inscription</h5>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  )
}

export default Page
