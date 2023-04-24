import { createSlug } from '@app/web/utils/createSlug'

export const computeSlugAndUpdateExistingSlugs = (
  { title, id, created }: { title: string; id: bigint; created: Date },
  existingSlugs: Set<string>,
) => {
  const slug = createSlug(title)
  if (!existingSlugs.has(slug)) {
    existingSlugs.add(slug)
    return slug
  }

  const slugWithId = `${slug}-${id.toString(10)}`
  if (!existingSlugs.has(slugWithId)) {
    existingSlugs.add(slugWithId)
    return slugWithId
  }

  const slugWithTimestamp = `${slug}-${created.getHours()}${created.getMinutes()}${created.getSeconds()}${created.getMilliseconds()}`
  if (!existingSlugs.has(slugWithTimestamp)) {
    existingSlugs.add(slugWithTimestamp)
    return slugWithTimestamp
  }

  throw new Error(
    `Could not find a slug strategy without duplication for "${title}" "${slug}"`,
  )
}
