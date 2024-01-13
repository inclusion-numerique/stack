import React from 'react'
import ResourceCardSkeleton from '@app/web/components/Resource/ResourceCardSkeleton'

const LoadingProfilePage = () => (
  <div data-testid="base-resources">
    <div className="fr-mb-6w fr-flex fr-justify-content-space-between">
      <h3 className="fr-mb-0">Ressources</h3>
    </div>
    {Array.from({ length: 8 }).map((_, index) => (
      <ResourceCardSkeleton key={index} />
    ))}
  </div>
)

export default LoadingProfilePage
