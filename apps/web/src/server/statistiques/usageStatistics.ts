import { TargetAudience, Theme } from '@prisma/client'
import { pascalCase } from 'change-case'
import { targetAudienceLabels } from '@app/web/themes/targetAudiences'
import { themeLabels } from '@app/web/themes/themes'
import { proportionOf, sum } from './statistics'

export type UsageStatisticsResult = {
  type: 'target_audiences' | 'themes'
  key: string
  value: number
}[]

const onlyThemes = ({ type }: { type: 'target_audiences' | 'themes' }) =>
  type === 'themes'

const onlyTargetAudiences = ({
  type,
}: {
  type: 'target_audiences' | 'themes'
}) => type === 'target_audiences'

const toValue = ({ value }: { value: number }) => value

const getProgress = (
  result: { value: number },
  targetAudiences: { value: number }[],
) => proportionOf(result.value, targetAudiences.map(toValue).reduce(sum))

export const themesUsages = (usageStatisticsResult: UsageStatisticsResult) => {
  const usageStatistics = usageStatisticsResult.filter(onlyThemes)
  return usageStatistics.map((result) => ({
    label: themeLabels[pascalCase(result.key) as Theme],
    value: result.value,
    progress: getProgress(result, usageStatistics),
  }))
}

export const targetAudiencesUsages = (
  usageStatisticsResult: UsageStatisticsResult,
) => {
  const targetAudiences = usageStatisticsResult.filter(onlyTargetAudiences)
  return targetAudiences.map((result) => ({
    label: targetAudienceLabels[pascalCase(result.key) as TargetAudience],
    value: result.value,
    progress: getProgress(result, targetAudiences),
  }))
}
