import { createSlug } from '@app/web/utils/createSlug'

export type SlugToLegacyIdMap = Map<string, number | null>

export const computeSlugAndUpdateExistingSlugs = (
  { title, id }: { title: string; id: bigint },
  existingSlugs: SlugToLegacyIdMap,
) => {
  const baseSlug = createSlug(title)

  for (let iteration = 0; iteration <= existingSlugs.size + 1; iteration += 1) {
    const slug = iteration === 0 ? baseSlug : `${baseSlug}-${iteration}`
    const usedForItemId = existingSlugs.get(slug)

    // If the slug is not used, we can use it
    if (usedForItemId === undefined) {
      existingSlugs.set(slug, Number(id))
      return slug
    }

    // If the slug is used by the same item, we can use it
    if (usedForItemId === Number(id)) {
      return slug
    }

    // The slug is already used (another id or null (non migrated item)), we try another suffix
  }

  throw new Error('Could not generate slug')
}
