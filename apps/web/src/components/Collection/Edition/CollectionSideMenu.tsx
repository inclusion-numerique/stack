import React from 'react'
import { SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu'
import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'

const gouvernanceFormSections = [
  { id: 'informations', title: 'Informations de la collection' },
  { id: 'apercu', title: 'Aperçu de la collection' },
  { id: 'visibilite', title: 'Visibilité de la collection' },
  { id: 'supprimer', title: 'Supprimer la collection' },
]

const gouvernanceFormSectionSideMenuItems: SideMenuProps.Item[] =
  gouvernanceFormSections.map(({ id, title }) => ({
    text: title,
    linkProps: { href: `#${id}` },
  }))

const CollectionSideMenu = () => (
  <div className="fr-hidden fr-unhidden-lg fr-mt-12w">
    <div>
      <NavigationSideMenu
        items={gouvernanceFormSectionSideMenuItems}
        burgerMenuButtonText="Sections"
        contentId="gouvernance-form"
        sticky
      />
    </div>
  </div>
)

export default CollectionSideMenu
