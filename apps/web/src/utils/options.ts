export type Option<T extends string = string> = {
  name: string
  value: T
  disabled?: boolean
}
export type Options<T extends string = string> = Option<T>[]

export const labelsToOptions = <T extends string>(
  object: Record<T, string>,
): Options<T> =>
  Object.entries(object).map(([value, name]) => ({ name, value } as Option<T>))
