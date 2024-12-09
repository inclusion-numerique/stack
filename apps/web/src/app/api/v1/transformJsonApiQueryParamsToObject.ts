import { set } from 'lodash-es'

/**
 * Json:api query params are given as string in brackets, e.g. "page[size]"
 * So the NextUrl SearchParams looks like { 'page[size]': '10' }
 * This function transforms them to object, e.g. { page: { size: 10 } }
 * To be able to be passed later to zod validation.
 *
 * A parameter with multiple values is given as a comma separated string, e.g. "sort=age,city"
 * and is transformed to an array, e.g. { sort: ['age', 'city'] }
 *
 * See https://jsonapi.org/format/#query-parameters-families
 */

export const transformJsonApiQueryParamsToObject = (
  params: URLSearchParams,
): Record<string, unknown> => {
  const result: Record<string, unknown> = {}

  for (const [rawKey, rawValue] of params.entries()) {
    // split rawKey into nested keys: e.g. "page[size]" -> ["page", "size"]
    const keys = rawKey.match(/[^[\]]+/g) || []

    // handle multiple values by splitting on comma
    const values = rawValue.includes(',') ? rawValue.split(',') : [rawValue]

    const finalValue = values.length === 1 ? values[0] : values

    set(result, keys, finalValue)
  }

  return result
}
