import classNames from 'classnames'
import React, { ReactNode } from 'react'
import styles from './Options.module.css'

export type Option<T extends string> = {
  component?: ReactNode
  name: string
  value: T
  disabled?: boolean
}

const Options = <T extends string>({
  options,
  select,
  limit,
  noResultMessage,
}: {
  options: Option<T>[]
  select: (option: Option<T>) => void
  limit: number
  noResultMessage?: string
}) => {
  if (options.length === 0) {
    return (
      <option className={classNames(styles.option, styles.disabled)}>
        {noResultMessage || 'Aucun résultat'}
      </option>
    )
  }
  return (
    <>
      {options.slice(0, limit).map((option) => (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          key={option.value}
          defaultValue={option.value}
          className={classNames(styles.option, {
            [styles.disabled]: option.disabled,
          })}
          onMouseDown={() => {
            if (!option.disabled) {
              select(option)
            }
          }}
        >
          {option.component || option.name}
        </div>
      ))}
    </>
  )
}

export default Options
