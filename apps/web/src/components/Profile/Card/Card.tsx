import React from 'react'
import Link from 'next/link'
import CopyLinkButton from '@app/web/components/CopyLinkButton'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { ProfileListItem } from '@app/web/server/profiles/getProfilesList'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { SessionUser } from '@app/web/auth/sessionUser'
import { FollowButton } from '@app/web/components/Follows/FollowButton'
import styles from './Card.module.css'

const ProfileCard = ({
  profile,
  user,
  canFollow = true,
}: {
  profile: ProfileListItem
  user: SessionUser | null
  canFollow?: boolean
}) => (
  <article className={styles.container} data-testid="profile-card">
    <Link className={styles.content} href={`/profils/${profile.id}`}>
      <RoundProfileImage size={48} user={profile} />
      {profile.name}
    </Link>
    <div className={styles.iconActions}>
      {canFollow && profile.id !== user?.id ? (
        <FollowButton profile={profile} user={user} />
      ) : null}
      <CopyLinkButton url={getServerUrl(`/profils/${profile.id}`, true)} />
    </div>
  </article>
)

export default ProfileCard
