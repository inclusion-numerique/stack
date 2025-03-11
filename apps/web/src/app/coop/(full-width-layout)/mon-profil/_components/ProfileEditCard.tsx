'use client'

import Card from '@app/web/components/Card'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { signOut } from 'next-auth/react'
import React from 'react'
import { ProfileView } from './ProfileView'

const {
  Component: UpdateProfileWithProConnectModal,
  close: closeUpdateProfileWithProConnectModal,
  buttonProps: updateProfileWithProConnectModalNativeButtonProps,
} = createModal({
  id: 'update-profile-with-pro-connect-modal',
  isOpenedByDefault: false,
})

const handleGoToProConnect = async () => {
  await signOut({ redirect: true, callbackUrl: '/connexion' })
  window
    .open('https://identite.proconnect.gouv.fr/personal-information', '_blank')
    ?.focus()
}

const ProfileEditCard = (profileData: {
  email: string
  name?: string | null
  phone?: string | null
}) => (
  <>
    <Card
      noBorder
      contentSeparator
      className="fr-border fr-border-radius--8"
      id="description"
      title={
        <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
          <span className="fr-flex fr-flex-gap-3v fr-align-items-center fr-h6 fr-mb-0">
            <span className="fr-flex fr-background-alt--blue-france fr-pl-2v fr-pr-1v fr-pt-1v fr-border-radius--8">
              <img
                width="36px"
                height="30px"
                src="/images/services/pro-connect-logo.svg"
                alt=""
              />
            </span>
            <span className="fr-text-title--blue-france">
              Vos informations personnelles
            </span>
          </span>
          <Button
            data-testid="edit-card-button"
            size="small"
            priority="tertiary no outline"
            iconId="fr-icon-edit-line"
            title="Modifier"
            {...updateProfileWithProConnectModalNativeButtonProps}
          >
            Modifier
          </Button>
        </div>
      }
    >
      <ProfileView {...profileData} />
    </Card>
    <UpdateProfileWithProConnectModal
      title={
        <div className="fr-flex fr-flex-gap-2v">
          <span className="ri-arrow-right-line" aria-hidden={true} /> Modifier
          informations ProConnect
        </div>
      }
      buttons={[
        {
          type: 'button',
          children: 'Annuler',
          onClick: closeUpdateProfileWithProConnectModal,
        },
        {
          type: 'button',
          children: 'Continuer',
          onClick: handleGoToProConnect,
        },
      ]}
    >
      Vous allez être redirigé vers ProConnect pour modifier vos informations
      personnelles. Vous devrez ensuite vous reconnecter à La Coop de la
      médiation numérique pour que les informations soient mises à jour.
    </UpdateProfileWithProConnectModal>
  </>
)

export default withTrpc(ProfileEditCard)
