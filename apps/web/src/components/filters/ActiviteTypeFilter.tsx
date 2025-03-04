'use client'

import { Popover } from '@app/web/components/Popover'
import {
  TypeActiviteSlug,
  typeActiviteOptions,
  typeActiviteSlugOptions,
} from '@app/web/cra/cra'
import classNames from 'classnames'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FilterFooter } from './elements/FilterFooter'
import TriggerButton from './elements/TriggerButton'

export const ActiviteTypeFilter = ({
  defaultValue = [],
}: {
  defaultValue?: TypeActiviteSlug[]
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const [isOpen, setIsOpen] = useState(false)

  const [activiteTypes, setActiviteTypes] = useState(defaultValue)

  useEffect(() => {
    setActiviteTypes(defaultValue)
  }, [defaultValue])

  const hasFilters = activiteTypes.length > 0

  const closePopover = (close: boolean = false) => {
    close && setIsOpen(false)
    router.replace(`?${params}`, { scroll: false })
  }

  const handleSubmit = (close: boolean = false) => {
    activiteTypes.length > 0
      ? params.set('types', activiteTypes.join(','))
      : params.delete('types')

    closePopover(close)
  }

  const handleClearFilters = () => {
    setActiviteTypes([])
    params.delete('types')
    closePopover(true)
  }

  const handleSelectFilter = (option: ChangeEvent<HTMLInputElement>) => {
    option.target.checked
      ? setActiviteTypes([
          ...activiteTypes,
          option.target.value as TypeActiviteSlug,
        ])
      : setActiviteTypes(
          activiteTypes.filter((type) => type !== option.target.value),
        )
  }

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      onInteractOutside={() => handleSubmit()}
      onEscapeKeyDown={() => handleSubmit()}
      trigger={
        <TriggerButton isOpen={isOpen} isFilled={hasFilters}>
          Type{hasFilters && ` · ${activiteTypes.length}`}
        </TriggerButton>
      }
    >
      <form style={{ width: 384 }} action={() => handleSubmit(true)}>
        <fieldset className="fr-fieldset fr-mb-0">
          <label className="fr-label fr-mb-2v fr-text--bold">
            Filtrer par&nbsp;:
          </label>
          {typeActiviteSlugOptions.map(
            ({ label, value: optionValue }, index) => {
              const id = `activite-filter-radio-${optionValue}`

              return (
                <div
                  className={classNames(
                    'fr-fieldset__element',
                    index === typeActiviteOptions.length - 1 && 'fr-mb-0',
                  )}
                  key={optionValue}
                >
                  <div className="fr-checkbox-group">
                    <input
                      type="checkbox"
                      id={id}
                      name="activite-type"
                      value={optionValue}
                      defaultChecked={defaultValue?.includes(optionValue)}
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
        <FilterFooter onClearFilters={handleClearFilters} />
      </form>
    </Popover>
  )
}
