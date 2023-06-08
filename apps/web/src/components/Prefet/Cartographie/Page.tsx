import React from 'react'
import { SessionUser } from '@app/web/auth/sessionUser'
import styles from './Page.module.css'
import Legend from './Legend'
import Map from './Map'

const Cartographie = ({ user }: { user: SessionUser }) => {
  console.log(user)
  return (
    <div className={styles.container}>
      <Legend />
      <Map />
    </div>
  )
}

export default Cartographie
