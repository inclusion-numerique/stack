import Link from 'next/link'
import React from 'react'
import classNames from 'classnames'
import { externalImageLoader } from '@app/web/utils/externalImageLoader'
import styles from './LinkPreview.module.css'

const LinkPreview = ({
  title,
  description,
  url,
  imageUrl,
}: {
  title?: string | null
  description?: string | null
  url: string
  imageUrl?: string | null
}) => (
  <Link href={url} target="_blank" className={styles.linkPreview}>
    <div className={styles.contents} data-testid="link-preview">
      {(!!title || !!description) && (
        <div className={styles.titleAndDescription}>
          {!!title && <p className="fr-text--bold">{title}</p>}
          {!!description && (
            <p className="fr-hint-text fr-mt-2v">{description}</p>
          )}
        </div>
      )}
      <div className={classNames('fr-mt-2v', styles.urlContainer)}>
        <span
          className={classNames(
            'fr-icon--sm fr-icon-link fr-mr-1w',
            styles.icon,
          )}
        />
        <p className={classNames('fr-mb-0', styles.url)}>{url}</p>
      </div>
    </div>
    {!!imageUrl && (
      <picture>
        <img
          src={externalImageLoader({ src: imageUrl, width: 200 })}
          className={styles.image}
          alt={title ?? ''}
        />
      </picture>
    )}
  </Link>
)

export default LinkPreview
