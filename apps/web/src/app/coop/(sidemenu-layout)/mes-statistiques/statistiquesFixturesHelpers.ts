import { allocatePercentagesFromRecords } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/allocatePercentages'
import { QuantifiedShare } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/quantifiedShare'

export const emptyQuantifiedSharesFromEnum = <T extends Record<string, string>>(
  enumObject: T,
): { value: keyof T; label: T[keyof T]; count: number; proportion: number }[] =>
  Object.entries(enumObject).map(
    ([key, label]) =>
      ({
        value: key as keyof T,
        label: label as T[keyof T],
        count: 0,
        proportion: 0,
      }) satisfies QuantifiedShare & { value: keyof T },
  )

export const quantifiedSharesFromFixedValues = <
  T extends Record<string, string>,
>({
  enumObject,
  fixedValues,
}: {
  enumObject: T
  fixedValues: number[]
}) =>
  allocatePercentagesFromRecords(
    emptyQuantifiedSharesFromEnum(enumObject).map((item, index) => ({
      ...item,
      count: fixedValues[index] ?? 0,
    })),
    'count',
    'proportion',
  )
