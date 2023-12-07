'use client'

import React from 'react'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'
import useHash from '@app/ui/hooks/hash'
import { sideMenuHashItem } from '@app/ui/utils/sideMenuHashItem'

const collectionMenuItems = (hash?: string) => [
  sideMenuHashItem(hash)('Informations de la collection', 'informations', true),
  sideMenuHashItem(hash)('Aperçu de la collection', 'apercu'),
  sideMenuHashItem(hash)('Visibilité de la collection', 'visibilite'),
  sideMenuHashItem(hash)('Supprimer la collection', 'supprimer'),
]

const CollectionSideMenu = () => {
  const hash = useHash()
  return (
    <div className="fr-hidden fr-unhidden-lg">
      <div>
        <SideMenu
          burgerMenuButtonText="Contenus"
          sticky
          items={collectionMenuItems(hash)}
        />
      </div>
    </div>
  )
}

export default CollectionSideMenu
