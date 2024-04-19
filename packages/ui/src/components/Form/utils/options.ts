import { ReactNode } from 'react'

export type RadioOption<T extends string = string> = {
  name: string
  value: T
  hint?: string
  disabled?: boolean
}

export type SelectOption<T extends string = string> = {
  name: string
  value: T
  disabled?: boolean
  hidden?: boolean
}

export type SelectOptionGroup<T extends string = string> = {
  name: string
  options: SelectOption<T>[]
  disabled?: boolean
  hidden?: boolean
}

export type SelectInputOption<T extends string = string> =
  | SelectOption<T>
  | SelectOptionGroup<T>

export type RichRadioOption<T extends string = string> = {
  name: string
  image?: string | ReactNode
  imageAlt?: string
  value: T
  hint?: string
  disabled?: boolean
}
