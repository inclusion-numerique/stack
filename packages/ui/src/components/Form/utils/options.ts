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
