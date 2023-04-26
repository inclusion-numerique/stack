export type MigratedModel = { legacyId: number | null; id: string }

export type LegacyToNewIdHelper = (legacyId: number) => string

export const createLegacyToNewIdHelper = <T extends MigratedModel>(
  data: T[],
  createNotFoundErrorMessage?: (model: { legacyId: number }) => string,
): ((legacyId: number) => string) => {
  const idsMap = new Map(
    data
      .filter(
        (item): item is T & { legacyId: number } => item.legacyId !== null,
      )
      .map(({ legacyId, id }) => [legacyId, id]),
  )

  return (legacyId: number) => {
    const newId = idsMap.get(legacyId)
    if (!newId) {
      throw new Error(
        createNotFoundErrorMessage
          ? createNotFoundErrorMessage({ legacyId })
          : `Model with legacyId ${legacyId} not found`,
      )
    }
    return newId
  }
}
