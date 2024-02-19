'use client'

import React, { ChangeEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { OptionTuples } from '@app/web/utils/options'

const DepartementSwitcher = ({
  departementOptions,
  currentCodeDepartement,
  target,
}: {
  departementOptions: OptionTuples
  currentCodeDepartement?: string
  target: 'donnees' | 'gouvernances'
}) => {
  const id = `select-departement-switcher`

  const router = useRouter()

  const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const codeDepartement = event.currentTarget.value
    if (!codeDepartement) {
      return
    }

    if (codeDepartement === 'national') {
      return router.push(`/${target}/national`)
    }

    router.push(`/${target}/departements/${codeDepartement}`)
  }

  return (
    <div className="fr-background-default--grey fr-border-radius--8 fr-p-8v">
      <div className="fr-select-group fr-mb-0">
        <label className="fr-label fr-text--medium" htmlFor={id}>
          <span className="fr-icon-france-fill fr-text-label--blue-france" />{' '}
          Département sélectionné
          <select
            className="fr-select fr-mt-2v"
            id={id}
            onChange={onChange}
            defaultValue={currentCodeDepartement}
            data-testid="departement-switcher"
          >
            <option value="national">National</option>
            {departementOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}

export default DepartementSwitcher
