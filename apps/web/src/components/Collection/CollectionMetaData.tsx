import React from 'react'
import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import Link from 'next/link'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { PrivacyTag } from '../PrivacyTags'
import CopyLinkButton from '../CopyLinkButton'
import styles from './CollectionMetaData.module.css'

const CollectionMetaData = ({
  collection,
  count,
  priority,
  isOwner,
  withButtons,
}: {
  collection: { isPublic: boolean; id: string }
  priority?: ButtonProps.Common['priority']
  count: number
  isOwner?: boolean
  withButtons?: boolean
}) => (
  <div className={styles.container}>
    <div className={styles.informations}>
      <span className="fr-icon-file-text-line fr-icon--sm" />
      <span>
        <b>{count}</b> Ressource{sPluriel(count)}
      </span>
      <span>•</span>
      <PrivacyTag
        isPublic={collection.isPublic}
        small
        label={collection.isPublic ? 'Publique' : 'Privée'}
      />
    </div>
    {withButtons && (
      <div className={styles.buttons}>
        {isOwner && (
          <Link
            href={`/collections/${collection.id}/modifier`}
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
        <Button
          title="Marquer comme favoris"
          size="small"
          iconId="ri-bookmark-3-line"
          priority={priority}
        />
        <CopyLinkButton
          url={getServerUrl(`/collections/${collection.id}`, true)}
          priority={priority}
        />
      </div>
    )}
  </div>
)

export default CollectionMetaData
