import z from 'zod'

/**
 * Add an existing collection to the profile saved collection
 * or to the base saved collections
 */
export const SaveCollectionValidation = z.object({
  collectionId: z.string().uuid(),
  savedById: z.string().uuid(),
  baseId: z.string().uuid().nullish(),
})

export type SaveCollection = z.infer<typeof SaveCollectionValidation>
