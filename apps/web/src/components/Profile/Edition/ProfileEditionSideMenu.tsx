import React from 'react'
import classNames from 'classnames'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'
import styles from './ProfileEditionSideMenu.module.css'

const ProfileEditionSideMenu = () => (
  <div className={classNames(styles.container, 'fr-hidden', 'fr-unhidden-lg')}>
    <SideMenu
      burgerMenuButtonText="Contenus"
      items={[
        {
          text: 'Informations personnelles',
          linkProps: {
            href: '#informations',
          },
        },
        {
          text: 'Contacts',
          linkProps: {
            href: '#contacts',
          },
        },
        {
          text: 'Visibilité du profil',
          linkProps: {
            href: '#visibilite',
          },
        },
        {
          text: 'Mot de passe',
          linkProps: {
            href: '#mot-de-passe',
          },
        },
        {
          text: 'Supprimer le profil',
          linkProps: {
            href: '#supprimer',
          },
        },
      ]}
    />
  </div>
)

export default ProfileEditionSideMenu
