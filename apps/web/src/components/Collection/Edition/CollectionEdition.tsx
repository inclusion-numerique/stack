import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { CollectionPageData } from '@app/web/server/collections/getCollection'
import CustomCard from '@app/web/components/CustomCard'
import CollectionImageEdition from './CollectionImageEdition'
import CollectionInformationsEdition from './CollectionInformationsEdition'
import CollectionSideMenu from './CollectionSideMenu'
import CollectionVisibilityEdition from './CollectionVisibilityEdition'

const CollectionEdition = ({
  collection, // base,
}: {
  collection: CollectionPageData
  // base: { id: string; isPublic: boolean } | null
}) => (
  <div className="fr-grid-row">
    <CollectionSideMenu />
    <div className="fr-col-12 fr-col-lg-6">
      <h1 className="fr-mb-6w">{collection.title}</h1>
      <div className="fr-grid-row fr-grid-row--gutters fr-mb-1w">
        <div className="fr-col-12">
          <CollectionInformationsEdition collection={collection} />
        </div>
        <div className="fr-col-12">
          <CollectionImageEdition collection={collection} />
        </div>
        <div className="fr-col-12">
          <CollectionVisibilityEdition collection={collection} />
        </div>
        <div className="fr-col-12">
          <CustomCard id="supprimer" title="Supprimer la collection">
            <p>
              Cette action est irréversible et entraîne la suppression
              définitive de la collection. Utilisez cette fonction avec
              précaution.
            </p>
            <Button className="fr-btn--danger">Supprimer la collection</Button>
          </CustomCard>
        </div>
      </div>
    </div>
  </div>
)

export default CollectionEdition
