import React from 'react'
import classNames from 'classnames'
import { BasePageData } from '@app/web/server/bases/getBase'
import Card from '../../Card'
import baseStyles from '../Create/CreateBase.module.css'
import SideMenu from './SideMenu'
import BaseDeletion from './BaseDeletion'
import Informations from './Informations'
import Visibility from './Visibility'
import Contacts from './Contacts'
import styles from './BaseEdition.module.css'

const BaseEdition = ({
  base,
  isAdmin,
}: {
  base: BasePageData
  isAdmin: boolean
}) => (
  <div className={classNames('fr-container', styles.container)}>
    <SideMenu isAdmin={isAdmin} />
    <div className={baseStyles.cards}>
      <Informations base={base} />
      <Contacts base={base} />
      <Visibility base={base} className={isAdmin ? 'fr-mt-3w' : 'fr-my-3w'} />
      {isAdmin && (
        <Card
          className="fr-my-3w"
          id="supprimer"
          title="Supprimer la base"
          description="Cette action est irréversible et entraîne la suppression définitive de toutes les ressources de la Base. Utilisez cette fonction avec précaution."
        >
          <BaseDeletion base={base} />
        </Card>
      )}
    </div>
  </div>
)

export default BaseEdition
