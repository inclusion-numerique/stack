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
        navigationContents.length > 0
          ? {
              text: 'Ressource',
              isActive: active !== 'informations',
              expandedByDefault: true,
              items: navigationContents.map((content) => ({
                text: content.title,
                linkProps: {
                  href: `#${content.navigation.id}`,
                },
                isActive: active === content.navigation.id,
              })),
            }
          : {
              text: 'Ressource',
              isActive: active === 'contenu',
              linkProps: {
                href: '#contenu',
              },
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
