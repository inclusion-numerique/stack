import React from 'react'
import Link from 'next/link'
import IconLink from '@app/web/components/Icon/IconLink'
import CopyLinkButton from '@app/web/components/CopyLinkButton'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { ProfileListItem } from '@app/web/server/profiles/getProfilesList'
import RoundImage from '@app/web/components/RoundImage'
import ProfileInitials from '@app/web/components/ProfileInitials'
import styles from './Card.module.css'

const ProfileCard = ({ profile }: { profile: ProfileListItem }) => (
  <div className={styles.container} data-testid="profile-card">
    <Link className={styles.content} href={`/profils/${profile.id}`}>
      <RoundImage
        image={profile.image}
        size={48}
        fallback={
          <ProfileInitials
            firstName={profile.firstName}
            lastName={profile.lastName}
            size={18}
          />
        }
      />
      {profile.name}
    </Link>
    <div className={styles.iconActions}>
      <IconLink title="Suivre" href="/" icon="fr-icon-user-heart-line" small />
      <CopyLinkButton url={getServerUrl(`/profils/${profile.id}`, true)} />
    </div>
  </div>
)

export default ProfileCard
