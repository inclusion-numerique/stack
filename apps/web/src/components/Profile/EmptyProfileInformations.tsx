import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { CreateResourceButton } from '../Resource/CreateResourceModal'
import EmptyBox from '../EmptyBox'

const EmptyProfileInformations = ({
  isConnectedUser,
}: {
  isConnectedUser: boolean
}) => (
  <EmptyBox
    title={
      isConnectedUser
        ? 'Vous n’avez pas encore partagé vos d’informations sur votre profil'
        : 'Ce profil ne partage pas d’informations'
    }
  >
    {isConnectedUser ? (
      <>
        <div>Présentez-vous et partagez vos informations de contact.</div>
        <Link
          data-testid="empty-profile-edition-button"
          className="fr-mt-4w fr-btn fr-icon-edit-line fr-btn--icon-left"
          href="./modifier"
        >
          Modifier le profil
        </Link>
      </>
    ) : (
      'Revenez plus tard ou suivez ce profil afin d’être tenu informé de ses prochaines publications.'
    )}
  </EmptyBox>
)

export default EmptyProfileInformations
