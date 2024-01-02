import React from 'react'
import classNames from 'classnames'
import { BasePageData } from '@app/web/server/bases/getBase'
import BaseEditionSideMenu from '@app/web/components/Base/Edition/BaseEditionSideMenu'
import BaseEditionInformation from '@app/web/components/Base/Edition/BaseEditionInformation'
import BaseEditionContacts from '@app/web/components/Base/Edition/BaseEditionContacts'
import BaseVisibilityForm from '@app/web/components/Base/Edition/BaseVisibilityForm'
import BaseDeletion from '@app/web/components/Base/Edition/BaseDeletion'
import Card from '@app/web/components/Card'
import baseStyles from '../Create/CreateBase.module.css'
import styles from './BaseEdition.module.css'

const BaseEdition = ({
  base,
  isAdmin,
}: {
  base: BasePageData
  isAdmin: boolean
}) => (
  <div className={classNames('fr-container', styles.container)}>
    <BaseEditionSideMenu isAdmin={isAdmin} />
    <div className={baseStyles.cards}>
      <BaseEditionInformation base={base} />
      <BaseEditionContacts base={base} />
      <BaseVisibilityForm
        base={base}
        className={isAdmin ? 'fr-mt-3w' : 'fr-my-3w'}
      />
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
