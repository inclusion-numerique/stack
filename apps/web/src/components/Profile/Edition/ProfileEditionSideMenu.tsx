import React from 'react'
import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'

const gouvernanceFormSections = [
  { id: 'informations', title: 'Informations' },
  { id: 'contacts', title: 'Contacts' },
  { id: 'visibilite', title: 'Visibilité du profil' },
  { id: 'supprimer', title: 'Supprimer le profil' },
]

const ProfileEditionSideMenu = () => (
  <div className="fr-hidden fr-unhidden-lg fr-col-3">
    <div className="fr-width-full">
      <NavigationSideMenu
        items={gouvernanceFormSections.map(({ id, title }) => ({
          text: title,
          linkProps: { href: `#${id}` },
        }))}
        burgerMenuButtonText="Sections"
        contentId="gouvernance-form"
        sticky
      />
    </div>
  </div>
)

export default ProfileEditionSideMenu
