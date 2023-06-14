import React from 'react'
import Link from 'next/link'
import { SessionUser } from '@app/web/auth/sessionUser'
import styles from './Page.module.css'
import Box from './Box/Box'
import DepartmentMap from './DepartmentMap'
import { data } from './data'

const PrefetPage = ({ user }: { user: SessionUser }) => {
  console.log(user)
  return (
    <>
      <div className={styles.header}>
        <h2>Déploiement de l&lsquo;inclusion Numérique sur votre territoire</h2>
        <span className="fr-text--xs">
          Source : <Link href="/">Données & territoires</Link>
        </span>
      </div>
      <div className="fr-grid-row fr-grid-row--gutters fr-mb-10w">
        <div className="fr-col-5">
          {data[0].boxes.map((box, index, array) => (
            <Box
              key={box.id}
              className={index === array.length - 1 ? '' : 'fr-mb-3w'}
              {...box}
            />
          ))}
        </div>
        <div className="fr-col-7">
          <DepartmentMap />
        </div>
      </div>
      {data.slice(1).map((values) => (
        <div key={values.id} className="fr-mb-10w">
          <h2>{values.label}</h2>
          <div className="fr-grid-row fr-grid-row--gutters">
            {values.boxes.map((box) => (
              <div key={box.id} className="fr-col-4">
                <Box fullHeight {...box} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default PrefetPage
