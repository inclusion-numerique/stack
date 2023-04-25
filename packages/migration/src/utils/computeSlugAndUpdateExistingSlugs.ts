import { createSlug } from '@app/web/utils/createSlug'

export type SlugToLegacyIdMap = Map<string, number | null>

export const computeSlugAndUpdateExistingSlugs = (
  { title, id, created }: { title: string; id: bigint; created: Date },
  existingSlugs: SlugToLegacyIdMap,
) => {
  const baseSlug = createSlug(title)

  const possibleSlugs = [
    baseSlug,
    `${baseSlug}-${id.toString(10)}`,
    `${baseSlug}-${created.getHours()}${created.getMinutes()}${created.getSeconds()}${created.getMilliseconds()}`,
  ]

  for (const slug of possibleSlugs) {
    const existing = existingSlugs.get(slug)
    if (existing === null) {
      // This slug is already used by another non migrated item
      continue
    }
    const numberId = Number(id)

    // There is no item with this slug
    if (existing === undefined) {
      existingSlugs.set(slug, numberId)
      return slug
    }

    if (existing === numberId) {
      // This slug is already used by the current item, we can use it
      return slug
    }

    // This slug is already used by another item, we cannot use it
  }

  throw new Error(
    `Could not find a slug generation strategy without duplicates for "${title}": ${possibleSlugs.join(
      ', ',
    )}`,
  )
}
