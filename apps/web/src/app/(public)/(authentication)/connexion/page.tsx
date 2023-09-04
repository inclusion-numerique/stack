import { Route } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { signinErrorMessage } from '@app/web/app/(public)/(authentication)/authenticationErrorMessage'
import LinkCard from '@app/web/ui/LinkCard'
import MonCompteProSigninButton from '@app/web/app/(public)/(authentication)/connexion/MonCompteProSigninButton'
import { EmailSigninForm } from '@app/web/app/(public)/(authentication)/connexion/EmailSigninForm'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'

export const revalidate = 0

const SigninPage = async ({
  searchParams: { error, suivant, role } = {},
}: {
  searchParams?: {
    error?: string
    suivant?: Route
    role?: 'prefecture' | 'collectivite'
  }
}) => {
  const user = await getSessionUser()

  if (user) {
    if (role === 'prefecture') {
      if (
        user.role === 'PrefectureDepartement' ||
        user.role === 'PrefectureRegion'
      ) {
        redirect(suivant ?? '/tableau-de-bord')
        return null
      }
      redirect(suivant ?? '/profil')
      return null
    }

    if (role === 'collectivite') {
      redirect(suivant ?? '/formulaires-feuilles-de-routes-territoriales')
      return null
    }

    redirect(suivant ?? '/profil')
  }

  const callbackUrl =
    suivant ?? role === 'prefecture'
      ? '/tableau-de-bord'
      : role === 'collectivite'
      ? '/formulaires-feuilles-de-routes-territoriales'
      : '/profil'

  if (!role) {
    return (
      <>
        <Breadcrumbs currentPage="Connexion" />
        <div className="fr-container--narrow fr-mx-auto fr-my-20v">
          <Link href="/" className="fr-link">
            <span className="fr-icon-arrow-left-line fr-icon--sm" /> Retour à
            l’accueil
          </Link>
          {error ? (
            <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
              <p>{signinErrorMessage(error)}</p>
            </div>
          ) : null}
          <h2 className="fr-my-8v">
            Connexion à l’Espace France&nbsp;Numérique&nbsp;Ensemble
          </h2>
          <LinkCard
            title="Vous travaillez en préfecture"
            text="Accéder au tableau de bord des données de l’Inclusion Numérique."
            href="/connexion?role=prefecture"
          />
          <LinkCard
            title="Vous êtes une collectivité ou un acteur territorial"
            text="Accéder aux formulaires pour participer à l’élaboration des feuilles de routes territoriales. Je peux retrouver mon formulaire en cours en me connectant."
            href="/connexion?role=collectivite"
          />
        </div>
      </>
    )
  }
  if (role === 'prefecture') {
    return (
      <>
        <Breadcrumbs
          parents={[
            {
              label: 'Connexion',
              linkProps: { href: '/connexion' },
            },
          ]}
          currentPage="Préfecture"
        />
        <div className="fr-narrow">
          <Link href="/connexion" className="fr-link">
            <span className="fr-icon-arrow-left-line fr-icon--sm" /> Retour
          </Link>
        </div>
        <AuthCard className="fr-mt-12v">
          <h4>Pour accéder au tableau de bord des préfectures</h4>
          {error ? (
            <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
              <p>{signinErrorMessage(error)}</p>
            </div>
          ) : null}
          <h5>Se connecter avec MonComptePro</h5>
          <p className="fr-text--sm">
            Professionnel du privé ou du public&nbsp;: MonComptePro vous
            identifie et vous donne accès aux démarches et services de l’État.
          </p>
          <div className="fr-connect-group fr-mb-10v">
            <MonCompteProSigninButton callbackUrl={callbackUrl} />
          </div>
        </AuthCard>
      </>
    )
  }
  return (
    <>
      <Breadcrumbs
        parents={[
          {
            label: 'Connexion',
            linkProps: { href: '/connexion' },
          },
        ]}
        currentPage="Feuilles de routes territoriales"
      />
      <div className="fr-narrow">
        <Link href="/connexion" className="fr-link">
          <span className="fr-icon-arrow-left-line fr-icon--sm" /> Retour
        </Link>
      </div>
      <AuthCard className="fr-mt-12v">
        <h4>
          Pour accéder aux formulaires pour participer à l’élaboration des
          feuilles de routes territoriales
        </h4>
        {error ? (
          <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
            <p>{signinErrorMessage(error)}</p>
          </div>
        ) : null}
        <h5>Se connecter avec MonComptePro</h5>
        <p className="fr-text--sm">
          Professionnel du privé ou du public&nbsp;: MonComptePro vous identifie
          et vous donne accès aux démarches et services de l’État.
        </p>
        <div className="fr-connect-group fr-mb-10v">
          <MonCompteProSigninButton callbackUrl={callbackUrl} />
        </div>
        <p className="fr-hr-or fr-mt-6v">ou</p>
        <h5>Se connecter avec son email</h5>
        <EmailSigninForm callbackUrl={callbackUrl} />
        <hr className="fr-mt-6v" />
        <h5 className="fr-mt-4v">Vous n’avez pas de compte ?</h5>
        <ButtonsGroup
          buttons={[
            {
              children: 'Créer un compte',
              linkProps: {
                href: `/creer-un-compte?suivant=${callbackUrl}`,
              },
              priority: 'secondary',
            },
          ]}
        />
      </AuthCard>
    </>
  )
}

export default SigninPage
