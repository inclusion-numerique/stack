'use client'

import { Popover } from '@app/web/components/Popover'
import { ProfilSlug, profilOptions, profilSlugOptions } from '@app/web/cra/cra'
import classNames from 'classnames'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FilterFooter } from './elements/FilterFooter'
import TriggerButton from './elements/TriggerButton'

export const ProfilFilter = ({
  defaultValue,
}: {
  defaultValue?: ProfilSlug
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const [isOpen, setIsOpen] = useState(false)

  const [profil, setProfil] = useState(defaultValue)

  useEffect(() => {
    setProfil(defaultValue)
  }, [defaultValue])

  const closePopover = (close: boolean = false) => {
    close && setIsOpen(false)
    router.replace(`?${params}`, { scroll: false })
  }

  const handleSubmit = (close: boolean = false) => {
    profil == null ? params.delete('profil') : params.set('profil', profil)
    closePopover(close)
  }

  const handleClearFilters = () => {
    setProfil(undefined)
    params.delete('profil')
    closePopover(true)
  }

  const handleSelectFilter = (option: ChangeEvent<HTMLInputElement>) => {
    option.target.checked
      ? setProfil(option.target.value as ProfilSlug)
      : setProfil(undefined)
  }

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      onInteractOutside={() => handleSubmit()}
      onEscapeKeyDown={() => handleSubmit()}
      trigger={
        <TriggerButton isOpen={isOpen} isFilled={profil != null}>
          Profil
          {profil && (
            <>
              &nbsp;·&nbsp;
              <span className="ri-check-line" aria-hidden="true" />
            </>
          )}
        </TriggerButton>
      }
    >
      <form style={{ width: 384 }} action={() => handleSubmit(true)}>
        <fieldset className="fr-fieldset fr-mb-0">
          <label className="fr-label fr-mb-2v fr-text--bold">
            Filtrer par&nbsp;:
          </label>
          {profilSlugOptions.map(({ label, value: optionValue }, index) => {
            const id = `activite-filter-radio-${optionValue}`

            return (
              <div
                className={classNames(
                  'fr-fieldset__element',
                  index === profilOptions.length - 1 && 'fr-mb-0',
                )}
                key={optionValue}
              >
                <div className="fr-radio-group">
                  <input
                    type="radio"
                    id={id}
                    name="profil"
                    value={optionValue}
                    defaultChecked={defaultValue === optionValue}
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
        <FilterFooter onClearFilters={handleClearFilters} />
      </form>
    </Popover>
  )
}
