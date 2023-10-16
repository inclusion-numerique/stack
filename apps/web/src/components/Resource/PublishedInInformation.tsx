import Link from 'next/link'
import React from 'react'
import { Resource } from '@app/web/server/resources/getResource'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import { FilteredResource } from '@app/web/server/resources/authorization'
import RoundImage from '@app/web/components/RoundImage'
import RoundProfileImage from '@app/web/components/RoundProfileImage'

const PublishedInInformation = ({
  resource: { createdBy, base },
}: {
  resource: Pick<
    ResourceListItem | Resource | FilteredResource,
    'createdBy' | 'base'
  >
}) => {
  const image = base ? base.image : createdBy.image

  return (
    <div className="fr-grid-row fr-grid-row--middle">
      {base ? (
        <>
          <RoundImage className="fr-mr-1w" image={image} />
          <span className="fr-text--xs fr-mb-0">
            Dans la base{' '}
            <Link href={`/bases/${base.slug}`} className="fr-link fr-text--xs">
              {base.title}
            </Link>
          </span>
        </>
      ) : (
        <>
          <RoundProfileImage className="fr-mr-1w" user={createdBy} />
          <span className="fr-text--xs fr-mb-0">
            Publié par {createdBy.name}
          </span>
        </>
      )}
    </div>
  )
}

export default PublishedInInformation
