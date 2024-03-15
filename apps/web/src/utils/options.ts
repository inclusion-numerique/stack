/**
 * @deprecated Import from @app/ui/components/Form/utils/options instead
 */
export type Option<T extends string = string> = {
  name: string
  value: T
  disabled?: boolean
}
/**
 * @deprecated Import from @app/ui/components/Form/utils/options instead
 */
export type Options<T extends string = string> = Option<T>[]

/**
 * @deprecated Import from @app/ui/components/Form/utils/options instead
 */
export const labelsToOptions = <T extends string>(
  object: Record<T, string>,
): Options<T> =>
  Object.entries(object).map(([value, name]) => ({ name, value }) as Option<T>)
