import React from 'react'
import Link from 'next/link'
import { SessionUser } from '@app/web/auth/sessionUser'
import styles from './Page.module.css'
import Bloc from './StatisticsBloc'
import SimpleMap from './SimpleMap'
import { data } from './data'

const PrefetPage = ({ user }: { user: SessionUser }) => {
  console.log(user)
  return (
    <>
      <div className={styles.header}>
        <h2>Déploiement de l&lsquo;inclusion Numérique sur votre territoire</h2>
        <span className="fr-text--xs">
          Source : <Link href="#">Données & territoires</Link>
        </span>
      </div>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-5">
          {data[0].blocs.map((bloc, index, array) => (
            <Bloc
              key={bloc.id}
              className={index === array.length - 1 ? '' : 'fr-mb-3w'}
              {...bloc}
            />
          ))}
        </div>
        <div className="fr-col-7">
          <SimpleMap />
        </div>
      </div>
      {data.slice(1).map((values) => (
        <div key={values.id} className="fr-mt-10w">
          <h2>{values.label}</h2>
          {values.blocs.map((bloc) => (
            <Bloc key={bloc.id} {...bloc} />
          ))}
        </div>
      ))}
    </>
  )
}

export default PrefetPage