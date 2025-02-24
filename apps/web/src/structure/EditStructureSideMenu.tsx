import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'
import React from 'react'

const structureSections = [
  { id: 'infos-generales', title: 'Informations générales' },
  { id: 'presentation', title: 'Présentation du lieu' },
  { id: 'infos-pratiques', title: 'Informations pratiques' },
  { id: 'horaires', title: 'Horaires d’ouverture' },
  { id: 'supprimer', title: 'Supprimer le lieu' },
]

const StructureEditionSideMenu = () => (
  <div className="fr-hidden fr-unhidden-lg fr-col-3">
    <div className="fr-width-full">
      <NavigationSideMenu
        items={structureSections.map(({ id, title }) => ({
          text: title,
          linkProps: { href: `#${id}` },
        }))}
        burgerMenuButtonText="Menu"
        contentId="structure-edition-content"
        sticky
      />
    </div>
  </div>
)

export default StructureEditionSideMenu
