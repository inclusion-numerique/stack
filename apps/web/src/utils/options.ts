export type Option<T extends string = string> = {
  name: string
  value: T
  disabled?: boolean
}
export type Options<T extends string = string> = Option<T>[]

export const labelsToOptions = <T extends string>(
  object: Record<T, string>,
): Options<T> =>
  Object.entries(object).map(([value, name]) => ({ name, value }) as Option<T>)

// For optimized data transfer
// Tuple [value, label]
export type OptionTuple<T extends string = string> = [T, string]
export type OptionTuples<T extends string = string> = OptionTuple<T>[]

export const optionTupleToOption = <T extends string = string>([
  value,
  name,
]: OptionTuple<T>): Option<T> => ({
  value,
  name,
})

export const optionTuplesToOptions = <T extends string = string>(
  optionTuples: OptionTuples<T>,
) => optionTuples.map(optionTupleToOption)

export const emptyOptionTuple: OptionTuple = ['', '']
