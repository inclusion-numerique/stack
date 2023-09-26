import React from 'react'
import { ProfileListItem } from '@app/web/server/profiles/getProfilesList'
import ProfileCard from '../Profile/Card/Card'
import EmptyBox from '../EmptyBox'
import styles from './Content.module.css'

const Profiles = ({ profiles }: { profiles: ProfileListItem[] }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <p className="fr-text--lg fr-mb-0">
        <b>{profiles.length} Créateurs</b>
      </p>
      <div className={styles.select}>
        Trier par :
        <select>
          <option>Les plus récentes</option>
        </select>
      </div>
    </div>
    {profiles.length > 0 ? (
      profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))
    ) : (
      <EmptyBox title="Aucun résultat pour votre recherche">
        Veuillez réessayer avec différents mots-clés.
      </EmptyBox>
    )}
  </div>
)

export default Profiles