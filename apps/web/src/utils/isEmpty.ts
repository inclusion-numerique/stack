import { onlyDefinedAndNotNull } from './onlyDefinedAndNotNull'

export const isEmpty = <T>(value: T | T[] | null | undefined): boolean =>
  Array.isArray(value)
    ? value.length === 0
    : !onlyDefinedAndNotNull(value) || value === ''
