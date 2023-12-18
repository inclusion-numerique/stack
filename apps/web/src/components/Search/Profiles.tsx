import React from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { ProfileListItem } from '@app/web/server/profiles/getProfilesList'
import { SessionUser } from '@app/web/auth/sessionUser'
import ProfileCard from '../Profile/Card/Card'
import EmptyBox from '../EmptyBox'
import styles from './Content.module.css'

const Profiles = ({
  profiles,
  totalCount,
  user,
}: {
  profiles: ProfileListItem[]
  totalCount: number
  user: SessionUser | null
}) => (
  <>
    <div className={styles.header}>
      <p className="fr-text--lg fr-mb-0">
        <b>
          {totalCount} Profil{sPluriel(totalCount)}
        </b>
      </p>
      <div className={styles.select}>
        Trier par :
        <select>
          <option>Les plus pertinents</option>
        </select>
      </div>
    </div>
    {profiles.length > 0 ? (
      profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} user={user} />
      ))
    ) : (
      <EmptyBox title="Aucun résultat pour votre recherche">
        Veuillez réessayer avec différents mots-clés.
      </EmptyBox>
    )}
  </>
)

export default Profiles
