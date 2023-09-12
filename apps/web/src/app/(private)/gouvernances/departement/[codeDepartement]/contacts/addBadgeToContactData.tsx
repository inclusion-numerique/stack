import React from 'react'
import {
  badgeColors,
  badgeStrings,
  Columns,
} from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/contacts/gouvernanceContactsTable'
import classNames from 'classnames'

// Replace column n°3 (see headers documentation) with a badge
export const addBadgeToContactData = (data: Columns) =>
  data.map((row, index) => {
    if (index === 3) {
      const colorClass =
        row === badgeStrings.suggere
          ? badgeColors.suggere
          : row === badgeStrings.porteur
          ? badgeColors.porteur
          : row === badgeStrings.participant
          ? badgeColors.participant
          : null
      return (
        <div className={classNames('fr-badge fr-badge--sm', colorClass)}>
          {row}
        </div>
      )
    }
    return row
  })
