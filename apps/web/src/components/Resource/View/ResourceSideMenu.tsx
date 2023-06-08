'use client'

import React from 'react'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'
import { ResourceContent } from '@app/web/server/resources/getResource'
import { useResourceNavigation } from '@app/web/components/Resource/View/resourceSideMenu.hooks'
import styles from './ResourceSideMenu.module.css'

const ResourceSideMenu = ({ contents }: { contents: ResourceContent[] }) => {
  const { navigationContents, active } = useResourceNavigation(contents)

  return (
    <SideMenu
      className={styles.sideMenu}
      burgerMenuButtonText="Contenus"
      items={[
        navigationContents.length === 0
          ? {
              // Only display one level item if there is no section title in resource contents
              text: 'Ressource',
              // Resource content is active by default
              isActive: active === 'contenu' || !active,
              linkProps: {
                href: '#contenu',
              },
            }
          : {
              text: 'Ressource',
              isActive: active !== 'informations',
              expandedByDefault: true,
              items: navigationContents.map((content, index) => ({
                text: content.title,
                linkProps: {
                  href: `#${content.navigation.id}`,
                },
                isActive:
                  // First resource content is active by default
                  (index === 0 && !active) || active === content.navigation.id,
              })),
            },
        {
          text: 'Informations',
          isActive: active === 'informations',
          linkProps: {
            href: '#informations',
          },
        },
      ]}
    />
  )
}

export default ResourceSideMenu
