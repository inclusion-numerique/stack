'use client'

import React, { ChangeEventHandler } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import type { DepartementDashboardRegionOption } from '@app/web/components/Prefet/DepartementDashboard'

const DepartementSwitcher = ({
  regionOptions,
  currentCodeDepartement,
}: {
  regionOptions: DepartementDashboardRegionOption
  currentCodeDepartement: string
}) => {
  const id = `select-departement-switcher`

  const router = useRouter()

  const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const codeDepartement = event.currentTarget.value
    if (codeDepartement) {
      router.push(`/tableau-de-bord/departement/${codeDepartement}`)
    }
  }

  return (
    <div className={classNames('fr-select-group')}>
      <label className="fr-label fr-text--bold" htmlFor={id}>
        Les&nbsp;départements&nbsp;de&nbsp;votre&nbsp;région
        <select
          className={classNames('fr-select fr-mt-2v')}
          id={id}
          onChange={onChange}
          defaultValue={currentCodeDepartement}
          data-testid="departement-switcher"
        >
          {regionOptions.departements.map(({ code, nom }) => (
            <option key={code} value={code}>
              {nom}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default DepartementSwitcher
