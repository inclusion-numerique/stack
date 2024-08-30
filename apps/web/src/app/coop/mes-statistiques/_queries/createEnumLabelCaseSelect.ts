import { Prisma } from '@prisma/client'
import { snakeCase } from 'change-case'

export const createEnumLabelCaseSelect = <T extends string>({
  column,
  enumObj,
  labels,
  defaultLabel = 'Non communiqué',
}: {
  column: string
  enumObj: { [key in T]: string }
  labels: { [key in T]: string }
  defaultLabel?: string
}): Prisma.Sql => {
  const cases = Object.keys(enumObj).map((key) => {
    const snakeCaseValue = snakeCase(enumObj[key as T])
    const label = labels[key as T]
    return `WHEN ${column} = '${snakeCaseValue}' THEN '${label}'`
  })

  const caseStatement = `CASE
    ${cases.join('\n    ')}
  ELSE '${defaultLabel}'
END `

  return Prisma.raw(caseStatement)
}
