import React from 'react'
import CompactNavigationSideMenu from '@app/ui/components/CompactNavigationSideMenu'

const CreerStructureSideMenu = () => (
  <CompactNavigationSideMenu
    items={[
      {
        text: 'Informations',
        linkProps: { href: `#informations` },
      },
      {
        text: 'Lieu accueillant du public',
        linkProps: { href: `#accueil-public` },
        items: [
          {
            text: 'Description de l’activité du lieu',
            linkProps: { href: `#description` },
          },
          {
            text: 'Informations pratiques',
            linkProps: { href: `#informations-pratiques` },
          },
        ],
      },
      {
        text: 'Services d’inclusion numérique',
        linkProps: { href: `#services` },
        items: [
          {
            text: 'Services & types d’accompagnement',
            linkProps: { href: `#services` },
          },
          {
            text: 'Modalités d’accès au service',
            linkProps: { href: `#acces` },
          },
          {
            text: 'Types de publics accueillis',
            linkProps: { href: `#publics` },
          },
        ],
      },
    ]}
    burgerMenuButtonText="Sections"
    contentId="form"
    sticky
    fullHeight
  />
)

export default CreerStructureSideMenu
