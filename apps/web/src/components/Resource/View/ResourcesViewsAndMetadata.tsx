import classNames from 'classnames'
import React from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import styles from './ResourcesViewsAndMetadata.module.css'

const ResourcesViewsAndMetadata = ({
  className,
  resource,
}: {
  className?: string
  resource: ResourceListItem
}) => (
  <div className={classNames(styles.container, 'fr-text--sm', className)}>
    <span className="fr-icon-eye-line fr-icon--sm" />
    <div>
      <b className="wip">45</b>
      <span className={styles.spanMdDisplay}> Vue{sPluriel(45)}</span>
    </div>
    <div>·</div>
    <span className="fr-icon-bookmark-line fr-icon--sm" />
    <div className={styles.lastLeft}>
      <b>{resource._count.collections}</b>
      <span className={styles.spanMdDisplay}>
        {' '}
        Enregistrement{sPluriel(resource._count.collections)}
      </span>
    </div>
  </div>
)
export default ResourcesViewsAndMetadata
