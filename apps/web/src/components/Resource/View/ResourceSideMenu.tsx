import React from 'react'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'
import { ResourceContent } from '@app/web/server/resources/getResource'
import { getResourceSectionIdAttribute } from '@app/web/components/Resource/View/getResourceSectionIdAttribute'
import styles from './ResourceSideMenu.module.css'

const ResourceSideMenu = ({
  visibleRefIndex,
  contents,
}: {
  visibleRefIndex: number | null
  contents: ResourceContent[]
}) => {
  const sectionTitles = contents.filter(
    (content) => content.type === 'SectionTitle',
  )
  return (
    <SideMenu
      className={styles.sideMenu}
      burgerMenuButtonText="Contenus"
      items={[
        sectionTitles.length > 0
          ? {
              text: 'Ressource',
              isActive: visibleRefIndex !== null && visibleRefIndex >= 0,
              expandedByDefault: true,
              items: sectionTitles.map((section, index) => ({
                text: section.title,
                linkProps: {
                  href: `#${getResourceSectionIdAttribute(section, index)}`,
                },
                isActive: visibleRefIndex === index,
              })),
            }
          : {
              text: 'Ressource',
              isActive: visibleRefIndex !== null && visibleRefIndex >= 0,
              linkProps: {
                href: '#contenu',
              },
            },
        {
          text: 'Informations',
          isActive: visibleRefIndex === -1,
          linkProps: {
            href: '#informations',
          },
        },
      ]}
    />
  )
}

export default ResourceSideMenu
