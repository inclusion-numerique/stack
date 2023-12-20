import React from 'react'
import classNames from 'classnames'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { BasePageData } from '@app/web/server/bases/getBase'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import { BasePrivacyTag } from '@app/web/components/PrivacyTags'
import { FilteredBase } from '@app/web/server/bases/authorization'
import styles from './ViewsAndMetadata.module.css'

const ViewsAndMetadata = ({
  base,
  className,
  withBadge,
}: {
  base: BasePageData | BaseListItem | FilteredBase
  className?: string
  withBadge?: boolean
}) => {
  // TODO clean count method from separated query ?
  const resourcesCount =
    'resources' in base
      ? base.resources.length
      : // eslint-disable-next-line no-underscore-dangle
        base._count.resources

  return (
    <div className={classNames(styles.container, 'fr-text--sm', className)}>
      <span className="fr-icon-file-text-line fr-icon--sm" />
      <div>
        <b>{resourcesCount}</b>
        <span className={styles.spanMdDisplay}>
          {' '}
          Ressource{sPluriel(resourcesCount)}
        </span>
      </div>
      <div>·</div>
      <span className="fr-icon-user-heart-line fr-icon--sm" />
      <div>
        <b>{base._count.followedBy}</b>
        <span className={styles.spanMdDisplay}>
          {' '}
          Suivi{sPluriel(base._count.followedBy)}
        </span>
      </div>
      {withBadge && !base.isPublic && (
        <>
          <div>·</div>
          <BasePrivacyTag isPublic={base.isPublic} />
        </>
      )}
    </div>
  )
}

export default ViewsAndMetadata
