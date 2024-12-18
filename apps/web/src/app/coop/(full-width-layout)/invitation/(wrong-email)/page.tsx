import React from 'react'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { authenticateUser } from '@app/web/auth/authenticateUser'

const Page = async () => {
  const user = await authenticateUser()

  return (
    <div
      className="fr-flex fr-direction-column fr-background-alt--blue-ecume"
      style={{ minHeight: '100%' }}
    >
      <div className="fr-container fr-container--slim fr-m-auto fr-background-default--grey fr-border-radius--16 fr-p-12v fr-text--center">
        <img
          src="/images/iconographie/visuel-erreur.svg"
          alt=""
          className="fr-mb-6v fr-mx-auto fr-display-block"
        />
        <h1 className="fr-h3 fr-text-title--blue-france fr-mb-0 fr-mx-md-12v">
          Problème d’identification sur votre adresse email
        </h1>
        <p className="fr-my-12v">
          Vous n’êtes pas connecté avec l’adresse email à laquelle vous avez été
          invité à rejoindre cette équipe.
        </p>
        <Notice
          className="fr-notice--warning fr-notice--flex"
          title={
            <span className="fr-text--left fr-text-default--grey fr-text--regular fr-ml-2v">
              Vous êtes actuellement connecté à La Coop de la médiation
              numérique via ce mail : <strong>{user.email}</strong>
            </span>
          }
        />
      </div>
    </div>
  )
}

export default Page
