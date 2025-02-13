import React from 'react'
import { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import Link from 'next/link'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { getServerUrl } from '@app/web/utils/baseUrl'
import SaveCollectionButton from '@app/web/components/Collection/SaveCollectionButton'
import { SessionUser } from '@app/web/auth/sessionUser'
import { CollectionMoreActionsDropdown } from '@app/web/components/Collection/CollectionMoreActionsDropdown'
import { PrivacyTag } from '../PrivacyTags'
import CopyLinkButton from '../CopyLinkButton'

const CollectionMetaData = ({
  user,
  collection,
  count,
  priority,
  isOwner,
  canWrite,
  context,
  hideRessourceLabelOnSmallDevices = false,
}: {
  user: SessionUser | null
  isOwner: boolean
  collection: {
    isPublic: boolean
    isFavorites: boolean
    id: string
    slug: string
    title: string
  }
  priority?: ButtonProps.Common['priority']
  count: number
  canWrite?: boolean
  context: 'card' | 'view' | 'collectionModal'
  hideRessourceLabelOnSmallDevices?: boolean
}) => {
  const withButtons = context === 'card' || context === 'view'
  return (
    <div className="fr-flex fr-justify-content-space-between fr-align-items-center fr-my-2v">
      <div className="fr-flex fr-flex-gap-2v fr-text--sm fr-mb-0 fr-text-mention--grey">
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
          {canWrite && !collection.isFavorites && (
            <Link
              href={`./${collection.slug}/modifier`}
              className={classNames(
                'fr-btn',
                'fr-btn--sm',
                `fr-btn--${
                  priority ? priority.replace(' ', '-') : 'tertiary-no-outline'
                }`,
                'fr-icon-edit-line',
                'fr-btn--icon-right',
              )}
            >
              Modifier
            </Link>
          )}

          {!collection.isFavorites && (
            <>
              {isOwner ? (
                <CollectionMoreActionsDropdown collection={collection} />
              ) : (
                <SaveCollectionButton
                  priority={
                    context === 'view' ? 'tertiary' : 'tertiary no outline'
                  }
                  user={user}
                  collection={collection}
                  context={context}
                />
              )}
              <CopyLinkButton
                size="small"
                className="fr-hidden fr-unhidden-md"
                priority={
                  context === 'view' ? 'tertiary' : 'tertiary no outline'
                }
                url={getServerUrl(`/collections/${collection.slug}`, {
                  absolutePath: true,
                })}
              />
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default CollectionMetaData
