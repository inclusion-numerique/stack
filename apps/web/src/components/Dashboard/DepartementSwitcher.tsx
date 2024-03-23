'use client'

import React, { ChangeEventHandler, CSSProperties } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { OptionTuples } from '@app/web/utils/options'

const DepartementSwitcher = ({
  departementOptions,
  currentCodeDepartement,
  target,
  className,
  label: labelProperty = 'Département sélectionné',
  style,
  noPadding,
}: {
  departementOptions: OptionTuples
  currentCodeDepartement?: string
  target: 'donnees' | 'gouvernances' | 'administration'
  className?: string
  style?: CSSProperties
  label?: string
  noPadding?: boolean
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
    <div
      className={classNames(
        'fr-background-default--grey fr-border-radius--8',
        !noPadding && 'fr-p-8v',
        className,
      )}
      style={style}
    >
      <div className="fr-select-group fr-mb-0">
        <label className="fr-label fr-text--medium" htmlFor={id}>
          <span className="fr-icon-france-fill fr-text-label--blue-france" />{' '}
          {labelProperty}
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
