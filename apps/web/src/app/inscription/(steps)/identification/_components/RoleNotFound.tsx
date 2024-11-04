import Notice from '@codegouvfr/react-dsfr/Notice'
import Link from 'next/link'
import React from 'react'
import SignoutButton from '@app/web/app/(public)/(authentication)/deconnexion/SignoutButton'
import { SessionUser } from '@app/web/auth/sessionUser'
import { getProconnectIdToken } from '@app/web/security/getProconnectIdToken'
import {
  type InscriptionRole,
  inscriptionRolesErrorTitles,
  inscriptionRolesToText,
} from './inscriptionRole'

export const RoleNotFound = async ({
  roleNotFound,
  user,
}: {
  roleNotFound: InscriptionRole
  user: Pick<SessionUser, 'email' | 'id' | 'usurper'>
}) => {
  const proConnectIdTokenHint = await getProconnectIdToken(user)

  return (
    <div className="fr-flex fr-direction-column fr-flex-gap-10v">
      <h1 className="fr-h3 fr-mb-0 fr-text-title--blue-france fr-text--center">
        {inscriptionRolesErrorTitles[roleNotFound]}
      </h1>
      <Notice
        className="fr-notice--warning"
        title={
          <span className="fr-text--regular fr-text-default--grey">
            <span className="fr-mb-2w">
              <span>
                Nous n’avons pas trouvé de profil de{' '}
                <span className="fr-text--bold">
                  {inscriptionRolesToText[roleNotFound]}
                </span>{' '}
                correspondant à l’adresse email {user.email}
              </span>
              <br />
              <span className="fr-text--sm fr-text-mention--grey">
                Source :{' '}
                <Link
                  href="https://conseiller-numerique.gouv.fr"
                  target="_blank"
                  rel="noreferrer"
                >
                  conseiller-numerique.gouv.fr
                </Link>
              </span>
            </span>
            <br />
            <br />
            <Link href="mailto:coop-numerique@anct.gouv.fr">
              <span role="img" className="ri-mail-line fr-mr-1w" aria-hidden />
              Veuillez contacter le support
            </Link>
          </span>
        }
      />
      <p className="fr-mb-0">
        Vous pouvez également essayer de retrouver votre profil en renseignant
        une autre adresse email.{' '}
        <Link
          href="https://incubateurdesterritoires.notion.site/Cr-er-son-compte-se-connecter-cceb0f6bfb394b039c61c9251d8d7a6a?pvs=74"
          className="fr-link"
        >
          En savoir plus
        </Link>
      </p>
      <SignoutButton
        proConnectIdTokenHint={proConnectIdTokenHint}
        size="large"
        className="fr-width-full fr-display-block"
        callbackUrl="/connexion"
      >
        Essayer une autre adresse email
      </SignoutButton>
    </div>
  )
}
