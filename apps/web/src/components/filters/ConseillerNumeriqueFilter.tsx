'use client'

import { Popover } from '@app/web/components/Popover'
import classNames from 'classnames'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import TriggerButton from './elements/TriggerButton'

const conseillerNumeriqueOptions = [
  { label: 'Conseillers numériques', value: '1' },
  { label: 'Médiateurs numériques', value: '0' },
]

export const ConseillerNumeriqueFilter = ({
  defaultValue,
}: {
  defaultValue?: '0' | '1'
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const [isOpen, setIsOpen] = useState(false)

  const [isConseillerNumerique, setIsConseillerNumerique] =
    useState(defaultValue)

  useEffect(() => {
    setIsConseillerNumerique(defaultValue)
  }, [defaultValue])

  const closePopover = (close: boolean = false) => {
    close && setIsOpen(false)
    router.replace(`?${params}`, { scroll: false })
  }

  const handleSubmit = (close: boolean = false) => {
    isConseillerNumerique == null
      ? params.delete('conseiller_numerique')
      : params.set('conseiller_numerique', isConseillerNumerique)
    closePopover(close)
  }

  const handleClearFilters = () => {
    setIsConseillerNumerique(undefined)
    params.delete('conseiller_numerique')
  }

  const handleSelectFilter = (option: ChangeEvent<HTMLInputElement>) => {
    option.target.checked
      ? setIsConseillerNumerique(option.target?.value as '0' | '1')
      : setIsConseillerNumerique(undefined)
  }

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      onInteractOutside={() => handleSubmit()}
      onEscapeKeyDown={() => handleSubmit()}
      trigger={
        <TriggerButton isOpen={isOpen} isFilled={isConseillerNumerique != null}>
          Rôle
          {isConseillerNumerique && <>&nbsp;·&nbsp;1</>}
        </TriggerButton>
      }
    >
      <form style={{ width: 384 }}>
        <fieldset className="fr-fieldset fr-mb-0">
          <label className="fr-label fr-mb-2v fr-text--bold">
            Filtrer par&nbsp;:
          </label>
          <div className="fr-fieldset__element">
            <div className="fr-radio-group">
              <input
                type="radio"
                id="activite-filter-radio-clear"
                name="conseiller-numerique"
                value="clear"
                defaultChecked={defaultValue == null}
                onChange={handleClearFilters}
              />
              <label
                className="fr-label fr-whitespace-nowrap"
                htmlFor="activite-filter-radio-clear"
              >
                Tous les rôles
              </label>
            </div>
          </div>
          {conseillerNumeriqueOptions.map(
            ({ label, value: optionValue }, index) => {
              const id = `activite-filter-radio-${optionValue}`

              return (
                <div
                  className={classNames(
                    'fr-fieldset__element',
                    index === conseillerNumeriqueOptions.length - 1 &&
                      'fr-mb-0',
                  )}
                  key={optionValue}
                >
                  <div className="fr-radio-group">
                    <input
                      type="radio"
                      id={id}
                      name="conseiller-numerique"
                      value={optionValue}
                      defaultChecked={defaultValue === optionValue}
                      onChange={handleSelectFilter}
                    />
                    <label
                      className="fr-label fr-whitespace-nowrap"
                      htmlFor={id}
                    >
                      {label}
                    </label>
                  </div>
                </div>
              )
            },
          )}
        </fieldset>
      </form>
    </Popover>
  )
}
