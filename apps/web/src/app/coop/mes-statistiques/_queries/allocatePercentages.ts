/**
 * Allocate percentages to an array of values, keeping the same order
 */
export const allocatePercentages = <T extends (number | null | undefined)[]>(
  values: T,
): number[] => {
  const total = values.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0

  return values.map((value) => (total === 0 ? 0 : 100 * ((value ?? 0) / total)))
}

/**
 * Allocate percentages to an array of objects, keeping the same order
 */
export const allocatePercentagesFromRecords = <
  CountKey extends string,
  T extends { [K in CountKey]: number | null | undefined } & Record<
    string,
    unknown
  >,
  ProportionKey extends string,
>(
  values: T[],
  countKey: CountKey,
  proportionKey: ProportionKey,
): (T & { [K in ProportionKey]: number })[] => {
  const proportions = allocatePercentages(
    values.map(({ [countKey]: count }) => count),
  )

  return values.map((value, index) => ({
    ...value,
    [proportionKey]: proportions[index],
  }))
}