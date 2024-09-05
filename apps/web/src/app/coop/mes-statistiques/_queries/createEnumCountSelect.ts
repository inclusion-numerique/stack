import { Prisma } from '@prisma/client'
import { snakeCase } from 'change-case'

export const createEnumCountSelect = <T extends string>({
  column,
  as,
  enumObj,
  defaultEnumValue,
}: {
  column: string
  as: string
  enumObj: { [key in T]: string }
  defaultEnumValue?: T
}): Prisma.Sql => {
  const sumStatements = Object.keys(enumObj).map((key) => {
    const snakeCaseValue = snakeCase(enumObj[key as T])

    // Add the IS NULL check only if this key is the default value
    const isNullSnippet =
      key === defaultEnumValue ? ` OR ${column} IS NULL` : ''

    return `SUM((${column} = '${snakeCaseValue}'${isNullSnippet})::int)::int AS ${as}_${snakeCaseValue}_count`
  })

  return Prisma.raw(sumStatements.join(',\n'))
}

export const createEnumArrayCountSelect = <T extends string>({
  column,
  as,
  enumObj,
}: {
  column: string
  as: string
  enumObj: { [key in T]: string }
}): Prisma.Sql => {
  const sumStatements = Object.keys(enumObj).map((key) => {
    const snakeCaseValue = snakeCase(enumObj[key as T])

    return `SUM(('${snakeCaseValue}' = ANY(${column}))::int)::int AS ${as}_${snakeCaseValue}_count`
  })

  return Prisma.raw(sumStatements.join(',\n'))
}

export const createIntArrayCountSelect = ({
  as,
  column,
  values,
}: {
  column: string
  as: string
  values: number[]
}): Prisma.Sql => {
  const sumStatements = values.map(
    (value) =>
      // SUM if the value is included in the column that is an array
      `SUM((${column} = ${value})::int)::int AS ${as}_${value.toString(10)}_count`,
  )

  return Prisma.raw(sumStatements.join(',\n'))
}
