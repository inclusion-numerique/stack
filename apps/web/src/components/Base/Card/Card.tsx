import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import { getDepartmentName } from '@app/web/utils/departments'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { BasePrivacyTag } from '@app/web/components/PrivacyTags'
import ViewsAndMetadata from '@app/web/components/Base/ViewsAndMetadata'
import CopyLinkButton from '@app/web/components/CopyLinkButton'
import { SessionUser } from '@app/web/auth/sessionUser'
import { FollowButton } from '@app/web/components/Follows/FollowButton'
import BaseImage from '@app/web/components/BaseImage'
import styles from './Card.module.css'

const BaseCard = ({
  base,
  user,
}: {
  base: BaseListItem
  user: SessionUser | null
}) => (
  <div className={styles.container} data-testid="base-card">
    <BaseImage base={base} size={96} />
    <div className={styles.content}>
      <Link href={`/bases/${base.slug}`}>
        <div className={styles.header}>
          {base.department && (
            <p className="fr-text--sm fr-mb-0">
              <span
                className={classNames(styles.icon, 'fr-icon-map-pin-2-line')}
              />
              {getDepartmentName(base.department)}
            </p>
          )}
          {!base.isPublic && (
            <div className={styles.badge}>
              <BasePrivacyTag small isPublic={base.isPublic} />
            </div>
          )}
        </div>
        <h6 className="fr-my-2w">{base.title}</h6>
      </Link>
      <div className={styles.footer}>
        <ViewsAndMetadata base={base} />
        <div className={styles.icons}>
          <FollowButton base={base} user={user} />
          <CopyLinkButton url={getServerUrl(`/bases/${base.slug}`, true)} />
        </div>
      </div>
    </div>
  </div>
)

export default BaseCard
