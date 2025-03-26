'use client'

import { Popover } from '@app/web/components/Popover'
import { StatutSlug, statutSlugOptions } from '@app/web/user/list'
import classNames from 'classnames'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import TriggerButton from './elements/TriggerButton'

export const StatutFilter = ({
  defaultValue,
}: {
  defaultValue?: StatutSlug
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const [isOpen, setIsOpen] = useState(false)
  const [statut, setStatut] = useState(defaultValue)

  useEffect(() => {
    setStatut(defaultValue)
  }, [defaultValue])

  const closePopover = (close: boolean = false) => {
    close && setIsOpen(false)
    router.replace(`?${params}`, { scroll: false })
  }

  const handleSubmit = (close: boolean = false) => {
    statut == null ? params.delete('statut') : params.set('statut', statut)
    closePopover(close)
  }

  const handleClearFilters = () => {
    setStatut(undefined)
    params.delete('statut')
  }

  const handleSelectFilter = (option: ChangeEvent<HTMLInputElement>) => {
    option.target.checked
      ? setStatut(option.target?.value as StatutSlug)
      : setStatut(undefined)
  }

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      onInteractOutside={() => handleSubmit()}
      onEscapeKeyDown={() => handleSubmit()}
      trigger={
        <TriggerButton isOpen={isOpen} isFilled={statut != null}>
          Statut
          {statut && <>&nbsp;·&nbsp;1</>}
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
                name="statut"
                value="clear"
                defaultChecked={defaultValue == null}
                onChange={handleClearFilters}
              />
              <label
                className="fr-label fr-whitespace-nowrap"
                htmlFor="activite-filter-radio-clear"
              >
                Tous les statuts
              </label>
            </div>
          </div>
          {statutSlugOptions.map(({ label, value: optionValue }, index) => {
            const id = `activite-filter-radio-${optionValue}`

            return (
              <div
                className={classNames(
                  'fr-fieldset__element',
                  index === statutSlugOptions.length - 1 && 'fr-mb-0',
                )}
                key={optionValue}
              >
                <div className="fr-radio-group">
                  <input
                    type="radio"
                    id={id}
                    name="statut"
                    value={optionValue}
                    defaultChecked={defaultValue?.includes(optionValue)}
                    onChange={handleSelectFilter}
                  />
                  <label className="fr-label fr-whitespace-nowrap" htmlFor={id}>
                    {label}
                  </label>
                </div>
              </div>
            )
          })}
        </fieldset>
      </form>
    </Popover>
  )
}
