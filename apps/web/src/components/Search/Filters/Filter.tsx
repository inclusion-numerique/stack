import React, { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import Button from '@codegouvfr/react-dsfr/Button'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import classNames from 'classnames'
import FilterOption from './FilterOption'
import styles from './Filter.module.css'

// Synced with SearchParams
export type FilterKey =
  | 'themes'
  | 'supportTypes'
  | 'targetAudiences'
  | 'departements'

export type Category =
  | { multiple: false; id: FilterKey; label: string; options: SelectOption[] }
  | {
      multiple: true
      id: FilterKey
      label: string
      options: { [key in string]: SelectOption[] }
    }

const Filter = ({
  category,
  onSelect,
  onUnselect,
  selected,
}: {
  category: Category
  onSelect: (option: SelectOption, category: FilterKey) => void
  onUnselect: (option: SelectOption, category: FilterKey) => void
  selected: Set<string>
}) => {
  const [open, setOpen] = useState(false)
  const [openedCategory, setOpenedCategory] = useState('')
  const optionsRef = useRef(null)
  useOnClickOutside(optionsRef, () => setOpen(false))

  const onClick = (option: SelectOption) => {
    if (selected.has(option.value)) {
      onUnselect(option, category.id)
      return
    }
    onSelect(option, category.id)
  }

  return (
    <div className={styles.filterContainer} ref={optionsRef}>
      <Button
        className={classNames(styles.button, open && styles.buttonOpen)}
        priority="tertiary"
        iconId={`fr-icon-arrow-${open ? 'up' : 'down'}-s-line`}
        iconPosition="right"
        onClick={() => setOpen(!open)}
      >
        {category.label}
        {selected.size > 0 && (
          <span className={styles.buttonCount}>{selected.size}</span>
        )}
      </Button>
      {open && (
        <div className={styles.options}>
          {category.multiple
            ? Object.keys(category.options).map((key) => {
                const options = category.options[key]
                const currentCategory = openedCategory === key
                return (
                  <>
                    <button
                      key={key}
                      className={styles.optionCategory}
                      type="button"
                      onClick={() =>
                        setOpenedCategory(currentCategory ? '' : key)
                      }
                    >
                      <div>{key}</div>
                      <span
                        className={`fr-icon--sm fr-icon-arrow-${
                          currentCategory ? 'up' : 'down'
                        }-s-line`}
                      />
                    </button>
                    <hr key={`${key}_separator`} className={styles.separator} />
                    {currentCategory &&
                      options.map((option) => (
                        <FilterOption
                          key={option.value}
                          option={option}
                          selected={selected.has(option.value)}
                          onSelect={(o) => {
                            onClick(o)
                            setOpen(false)
                          }}
                        />
                      ))}
                  </>
                )
              })
            : category.options.map((option) => (
                <FilterOption
                  key={option.value}
                  option={option}
                  selected={selected.has(option.value)}
                  onSelect={(o) => {
                    onClick(o)
                    setOpen(false)
                  }}
                />
              ))}
        </div>
      )}
    </div>
  )
}

export default Filter
