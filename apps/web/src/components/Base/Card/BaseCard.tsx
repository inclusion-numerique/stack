import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import { getDepartmentName } from '@app/web/utils/departments'
import BaseMetadata from '@app/web/components/Base/BaseMetadata'
import { SessionUser } from '@app/web/auth/sessionUser'
import { FollowButton } from '@app/web/components/Follows/FollowButton'
import BaseImage from '@app/web/components/BaseImage'
import styles from './BaseCard.module.css'

// This is done in memory, not really performant but not a bottleneck for now.
// If it becomes a problem, store shortDescription and description in Base model
const baseDescriptionExcerpt = (description: string) => {
  // description is html, we only want the first 800 characters
  const descriptionText = description.replaceAll(/<[^>]*>?/gm, '')

  return descriptionText.slice(0, 340)
}

const BaseCard = ({
  base,
  user,
  compact = false,
}: {
  base: BaseListItem
  user: SessionUser | null
  compact?: boolean
}) => (
  <article className={styles.container} data-testid="base-card">
    <Link href={`/bases/${base.slug}`} className={styles.imageLink}>
      <BaseImage base={base} size={compact ? 48 : 96} />
    </Link>
    <div className={styles.content}>
      <Link href={`/bases/${base.slug}`}>
        <h6 className="fr-mb-0">{base.title}</h6>
      </Link>
      <div className={styles.midContent}>
        {!compact && !!base.description && (
          <Link
            href={`/bases/${base.slug}`}
            className={classNames(
              'fr-mb-0 fr-mt-3v fr-text--sm',
              styles.exerpt,
            )}
            dangerouslySetInnerHTML={{
              __html: baseDescriptionExcerpt(base.description),
            }}
          />
        )}
        {!compact && base.department && (
          <p className="fr-text--sm fr-text-mention--grey fr-mb-0 fr-mt-3v">
            <span
              className={classNames(
                styles.icon,
                'fr-icon-map-pin-2-line fr-icon--sm',
              )}
            />
            {getDepartmentName(base.department)}
          </p>
        )}
      </div>
      <BaseMetadata
        className={classNames(
          compact ? 'fr-mt-2v' : 'fr-mt-3v fr-mt-md-4v',
          'fr-text-mention--grey',
        )}
        base={base}
        withBadge={!base.isPublic}
        smallBadge
      />
    </div>
    <div>
      <FollowButton base={base} user={user} />
    </div>
  </article>
)

export default BaseCard
