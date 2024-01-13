import React from 'react'
import ProfileCardSkeleton from '@app/web/components/Profile/Card/ProfileCardSkeleton'

const LoadingProfileSuivisPage = () => (
  <div data-testid="base-resources">
    <div className="fr-mb-6w fr-flex fr-justify-content-space-between">
      <h3 className="fr-mb-0">Mes suivi</h3>
    </div>
    {Array.from({ length: 8 }).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <ProfileCardSkeleton key={index} />
    ))}
  </div>
)

export default LoadingProfileSuivisPage
