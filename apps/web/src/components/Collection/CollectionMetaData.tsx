import React from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { getServerUrl } from '@app/web/utils/baseUrl'
import SaveCollectionButton from '@app/web/components/Collection/SaveCollectionButton'
import { SessionUser } from '@app/web/auth/sessionUser'
import { PrivacyTag } from '../PrivacyTags'
import CopyLinkButton from '../CopyLinkButton'

const CollectionMetaData = ({
  user,
  collection,
  count,
  context,
  hideRessourceLabelOnSmallDevices = false,
}: {
  user: SessionUser | null
  collection: { isPublic: boolean; id: string; slug: string }
  count: number
  context: 'card' | 'view' | 'collectionModal'
  hideRessourceLabelOnSmallDevices?: boolean
}) => {
  const withButtons = context === 'card' || context === 'view'
  return (
    <div className="fr-flex fr-justify-content-space-between fr-align-items-center fr-my-2v">
      <div className="fr-flex fr-flex-gap-2v fr-text--sm fr-mb-0">
        <span className="fr-icon-file-text-line fr-icon--sm" />
        <b>{count}</b>
        <span
          className={
            hideRessourceLabelOnSmallDevices ? 'fr-hidden fr-unhidden-sm' : ''
          }
        >
          Ressource{sPluriel(count)}
        </span>
        <span>•</span>
        <PrivacyTag
          isPublic={collection.isPublic}
          small
          label={collection.isPublic ? 'Publique' : 'Privée'}
        />
      </div>
      {withButtons && (
        <div className="fr-flex fr-flex-gap-2v">
          <SaveCollectionButton
            priority="tertiary no outline"
            user={user}
            collection={collection}
            context={context}
          />
          <CopyLinkButton
            size="small"
            className="fr-hidden fr-unhidden-md"
            priority="tertiary no outline"
            url={getServerUrl(`/collections/${collection.slug}`, true)}
          />
        </div>
      )}
    </div>
  )
}

export default CollectionMetaData
