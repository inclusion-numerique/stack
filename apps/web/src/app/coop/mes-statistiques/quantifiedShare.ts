export type LabelAndCount<TLabel = string> = {
  label: TLabel
  count: number
}

export type QuantifiedShareToProcess<
  TCategoryType = string,
  TLabel = string,
> = LabelAndCount<TLabel> & {
  category_type: TCategoryType
}

export type QuantifiedShare<TLabel = string> = LabelAndCount<TLabel> & {
  proportion: number
}

export type AccompagnementLabel =
  | 'Accompagnements individuels'
  | 'Ateliers collectifs'
  | 'Aide aux démarches administratives'

export type MaterielLabel =
  | 'Ordinateur'
  | 'Téléphone'
  | 'Tablette'
  | 'Autre matériel'
  | 'Pas de matériel'

export const toTotalCount = (total: number, { count }: { count: number }) =>
  total + count

const isNewCategoryEntryFor =
  <T extends string>(quantifiedShare: Record<T, QuantifiedShare[]>) =>
  ({ category_type }: { category_type: T }) =>
    !quantifiedShare[category_type]

const onlyMatchingLabel =
  <T>(quantifiedShareToProcess: QuantifiedShareToProcess<T>) =>
  ({ label }: { label: string }) =>
    label === quantifiedShareToProcess.label

const updateEntryInCategory =
  <T extends string>(quantifiedShares: Record<T, QuantifiedShare[]>) =>
  ({ category_type, label, count }: QuantifiedShareToProcess<T>) => ({
    ...quantifiedShares,
    [category_type]: quantifiedShares[category_type].map((quantifiedShare) =>
      quantifiedShare.label === label
        ? { label, count: quantifiedShare.count + count, proportion: 0 }
        : quantifiedShare,
    ),
  })

const newEntryInCategory =
  <T extends string>(quantifiedShare: Record<T, QuantifiedShare[]>) =>
  ({ category_type, label, count }: QuantifiedShareToProcess<T>) => ({
    ...quantifiedShare,
    [category_type]: [
      ...quantifiedShare[category_type],
      { label, count, proportion: 0 },
    ],
  })

const appendCategoryEntry =
  <T extends string>(quantifiedShare: Record<T, QuantifiedShare[]>) =>
  (quantifiedShareToProcess: QuantifiedShareToProcess<T>) => {
    const existingEntry = quantifiedShare[
      quantifiedShareToProcess.category_type
    ].find(onlyMatchingLabel(quantifiedShareToProcess))

    return existingEntry
      ? updateEntryInCategory(quantifiedShare)(quantifiedShareToProcess)
      : newEntryInCategory(quantifiedShare)(quantifiedShareToProcess)
  }

const newCategoryEntryFor =
  <T extends string>(quantifiedShare: Record<T, QuantifiedShare[]>) =>
  ({ category_type, count, label }: QuantifiedShareToProcess<T>) => ({
    ...quantifiedShare,
    [category_type]: [{ label, count, proportion: 0 }],
  })

const toCompute =
  (total: number) =>
  <T extends QuantifiedShare>(item: T) => ({
    ...item,
    proportion: total > 0 ? Math.round((item.count * 100) / total) : 0,
  })

const computeProportion =
  <T extends string>(quantifiedShare: Record<T, QuantifiedShare[]>) =>
  (
    category: T,
    mergedQuantifiedShares: Record<T, QuantifiedShare[]>,
    total: number,
  ) => ({
    ...quantifiedShare,
    [category]: mergedQuantifiedShares[category].map(toCompute(total)),
  })

const updateCategories = <T extends string>(
  quantifiedShare: Record<T, QuantifiedShare[]>,
  quantifiedShareToProcess: QuantifiedShareToProcess<T>,
) =>
  isNewCategoryEntryFor(quantifiedShare)(quantifiedShareToProcess)
    ? newCategoryEntryFor(quantifiedShare)(quantifiedShareToProcess)
    : appendCategoryEntry(quantifiedShare)(quantifiedShareToProcess)

export const mergeQuantifiedShare = <T extends string>(
  defaultValue: Record<T, QuantifiedShare[]>,
  ...quantifiedShares: QuantifiedShareToProcess<T>[][]
) => {
  const mergedQuantifiedShares = quantifiedShares
    .flat()
    .reduce(updateCategories, defaultValue)

  return (Object.keys(mergedQuantifiedShares) as T[]).reduce(
    (quantifiedShare: Record<T, QuantifiedShare[]>, category: T) =>
      computeProportion(quantifiedShare)(
        category,
        mergedQuantifiedShares,
        mergedQuantifiedShares[category].reduce(toTotalCount, 0),
      ),
    {} as Record<T, QuantifiedShare[]>,
  )
}

export const withProportions = <T extends QuantifiedShare>(
  quantifiedShare: T[],
): T[] =>
  quantifiedShare.map(toCompute(quantifiedShare.reduce(toTotalCount, 0)))
