import React from 'react'
import CollectionCardSkeleton from '@app/web/components/Collection/CollectionCardSkeleton'

const LoadingProfileCollectionsPage = () => (
  <div data-testid="base-resources">
    <div className="fr-mb-6w fr-flex fr-justify-content-space-between">
      <h3 className="fr-mb-0">Collections</h3>
    </div>
    <div className="fr-grid-row fr-grid-row--gutters">
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="fr-col-md-6 fr-col-12" key={index}>
          <CollectionCardSkeleton />
        </div>
      ))}
    </div>
  </div>
)

export default LoadingProfileCollectionsPage
