import React from 'react'
import { Resource } from '@app/web/server/resources/getResource'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import {
  BasePrivacyTag,
  ProfilePrivacyTag,
} from '@app/web/components/PrivacyTags'
import { SessionUser } from '@app/web/auth/sessionUser'
import ProfileInitials from '@app/web/components/ProfileInitials'
import RoundImage from '@app/web/components/RoundImage'
import styles from './PublicationView.module.css'

const PublicationView = ({
  resource,
  user,
}: {
  resource: ResourceProjectionWithContext | Resource
  user: SessionUser
}) =>
  resource.base ? (
    <div className={styles.baseInfo}>
      <div className={styles.baseName}>
        <RoundImage className="fr-mr-1w" image={resource.base.image} />
        <span>{resource.base.title}</span>
      </div>
      <BasePrivacyTag isPublic={resource.base.isPublic} />
    </div>
  ) : (
    resource.createdBy && (
      <div className={styles.baseInfo}>
        <div className={styles.baseName}>
          <RoundImage
            className="fr-mr-1w"
            image={resource.createdBy.image}
            fallback={
              <ProfileInitials
                size={12}
                lastName={resource.createdBy.lastName}
                firstName={resource.createdBy.firstName}
              />
            }
          />
          <span>Publié par {resource.createdBy.name}</span>
        </div>
        <ProfilePrivacyTag isPublic={user.isPublic} />
      </div>
    )
  )

export default PublicationView
