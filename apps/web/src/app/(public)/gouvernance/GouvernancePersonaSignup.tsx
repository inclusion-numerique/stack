import Link from 'next/link'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { GouvernancePersona } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import GouvernanceSignupForm from '@app/web/app/(public)/gouvernance/GouvernanceSignupForm'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { asyncComponent } from '@app/web/utils/asyncComponent'
import styles from './GouvernancePersonaSignup.module.css'

const GouvernancePersonaSignup = async ({
  gouvernance: { title, description, blocs, id },
}: {
  gouvernance: GouvernancePersona
}) => {
  const user = await getSessionUser()
  return (
    <>
      <div className="fr-container">
        <Breadcrumbs
          currentPage={title}
          parents={[
            {
              label: 'Formulaires feuilles de routes territoriales',
              linkProps: {
                href: '/gouvernance',
              },
            },
          ]}
        />
      </div>
      <div className={styles.contentContainer}>
        <Link href="/gouvernance" className="fr-link">
          <span className="fr-icon-arrow-left-line fr-icon--sm" /> Retour
        </Link>
        <div className={styles.card}>
          <h1>{title}</h1>
          <p
            className="fr-text--lg"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <hr />
          {blocs.map(({ title: blocTitle, items }) => (
            <div className={styles.bloc} key={blocTitle}>
              <h2>{blocTitle}</h2>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <hr />
            </div>
          ))}
          <h2>Inscription au formulaire</h2>
          <Notice
            className="fr-my-4v"
            title="Les formulaires à remplir sont en cours de construction. En renseignant votre mail, vous serez informé dès qu’ils seront disponibles."
          />
          <GouvernanceSignupForm gouvernancePersonaId={id} user={user} />
        </div>
      </div>
    </>
  )
}
export default asyncComponent(GouvernancePersonaSignup)
