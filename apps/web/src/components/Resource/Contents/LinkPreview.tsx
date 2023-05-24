import Link from 'next/link'
import React from 'react'
import { ResourceContent } from '@app/web/server/resources/getResource'
import styles from './LinkPreview.module.css'

const LinkPreview = ({
  content: { linkTitle, linkDescription, url },
}: {
  content: Pick<ResourceContent, 'linkTitle' | 'linkDescription' | 'url'>
}) =>
  url ? (
    <Link href={url} target="_blank" className={styles.link}>
      <div className={styles.preview} data-testid="link-preview">
        <p className="fr-mb-8px">{linkTitle}</p>
        <p className="fr-hint-text fr-mb-0">{linkDescription}</p>
        <p className="fr-text--sm fr-mb-0">
          <b>{url}</b>
        </p>
      </div>
    </Link>
  ) : null

export default LinkPreview
