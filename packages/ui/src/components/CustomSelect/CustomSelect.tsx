/* eslint react/destructuring-assignment: 0 */

import React, { ReactNode } from 'react'
import type { GroupBase, ThemeConfig } from 'react-select'
import Select from 'react-select'
import type { AsyncProps } from 'react-select/async'
import AsyncSelect from 'react-select/async'
import { Spinner } from '@app/web/ui/Spinner'
import styles from './CustomSelect.module.css'

export type CustomSelectProps<
  Option = { label: string; value: string },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Exclude<AsyncProps<Option, IsMulti, Group>, 'classNames' | 'theme'> & {
  inputId?: string
}

// TODO The custom theme is not sufficient for DSFR implementation, we should replace components and/or override classes
// See https://react-select.com/styles
const customTheme: ThemeConfig = {
  borderRadius: 4,
  spacing: {
    baseUnit: 6,
    menuGutter: 6,
    controlHeight: 38,
  },
  colors: {
    primary: '#000091', // Selected option (text is white...)
    primary75: '#c1c1c1', // ?
    primary50: '#eee', // Active option
    primary25: '#F6F6F6', // Hover option
    danger: '#c9191e',
    dangerLight: '#fcbfbf',
    neutral0: '#fff',
    neutral5: '#e5e5e5',
    neutral10: '#d2d2d2',
    neutral20: '#c1c1c1',
    neutral30: '#929292',
    neutral40: '#777', // Button Color
    neutral50: '#666', // Placeholder
    neutral60: '#494949',
    neutral70: '#3a3a3a',
    neutral80: '#161616', // Value text
    neutral90: '#101010',
  },
}

const loadingMessage = (): ReactNode => (
  <div className={styles.loadingSpinnerContainer}>
    <Spinner />
  </div>
)

const noOptionsMessage = (): ReactNode => (
  <div className={styles.noOptionsContainer}>Aucun résultat</div>
)

/**
 * TODO: Implement DSFR styles / custom components
 * See https://react-select.com/advanced#replacing-builtins
 */
const CustomSelect = <
  Option = { label: string; value: string },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: CustomSelectProps<Option, IsMulti, Group> & {
    // We require instanceId to avoid SSR id mismatch in react hydration
    instanceId: number | string
  },
) => {
  const classNames: CustomSelectProps<Option, IsMulti, Group>['classNames'] = {
    container: () => styles.container,
    control: () => styles.control,
  }

  // eslint-disable-next-line react/destructuring-assignment
  if (props.loadOptions) {
    return (
      <AsyncSelect
        {...props}
        loadingMessage={props.loadingMessage ?? loadingMessage}
        noOptionsMessage={props.noOptionsMessage ?? noOptionsMessage}
        theme={customTheme}
        classNames={classNames}
      />
    )
  }

  return (
    <Select
      {...props}
      loadingMessage={props.loadingMessage ?? loadingMessage}
      noOptionsMessage={props.noOptionsMessage ?? noOptionsMessage}
      theme={customTheme}
      classNames={classNames}
    />
  )
}

export default CustomSelect
