import {
  targetAudiencesUsages,
  themesUsages,
  UsageStatisticsResult,
} from './usageStatistics'

describe('Usage statistics', () => {
  it('should not get any themes when type is target_audiences', () => {
    const usageStatisticsResult: UsageStatisticsResult = [
      { type: 'target_audiences', key: 'personne_allophone', value: 2 },
    ]

    const usages = themesUsages(usageStatisticsResult)

    expect(usages).toStrictEqual([])
  })

  it('should get emploi_et_entrepreunariat themes', () => {
    const usageStatisticsResult: UsageStatisticsResult = [
      { type: 'themes', key: 'emploi_et_entrepreunariat', value: 5 },
    ]

    const usages = themesUsages(usageStatisticsResult)

    expect(usages).toStrictEqual([
      { label: 'Emploi & entrepreunariat', value: 5, progress: 100 },
    ])
  })

  it('should get multiple themes', () => {
    const usageStatisticsResult: UsageStatisticsResult = [
      { type: 'themes', key: 'emploi_et_entrepreunariat', value: 5 },
      { type: 'target_audiences', key: 'personne_allophone', value: 2 },
      { type: 'themes', key: 'intelligence_artificielle', value: 8 },
    ]

    const usages = themesUsages(usageStatisticsResult)

    expect(usages).toStrictEqual([
      { label: 'Emploi & entrepreunariat', value: 5, progress: 38 },
      { label: 'Intelligence artificielle', value: 8, progress: 62 },
    ])
  })

  it('should not get any target_audiences when type is themes', () => {
    const usageStatisticsResult: UsageStatisticsResult = [
      { type: 'themes', key: 'emploi_et_entrepreunariat', value: 1 },
    ]

    const usages = targetAudiencesUsages(usageStatisticsResult)

    expect(usages).toStrictEqual([])
  })

  it('should get personne_allophone target_audiences', () => {
    const usageStatisticsResult: UsageStatisticsResult = [
      { type: 'target_audiences', key: 'personne_allophone', value: 2 },
    ]

    const usages = targetAudiencesUsages(usageStatisticsResult)

    expect(usages).toStrictEqual([
      { label: 'Personne allophone', value: 2, progress: 100 },
    ])
  })

  it('should get multiple target_audiences', () => {
    const usageStatisticsResult: UsageStatisticsResult = [
      { type: 'target_audiences', key: 'personne_allophone', value: 2 },
      { type: 'themes', key: 'intelligence_artificielle', value: 8 },
      {
        type: 'target_audiences',
        key: 'personne_situation_handicap',
        value: 1,
      },
    ]

    const usages = targetAudiencesUsages(usageStatisticsResult)

    expect(usages).toStrictEqual([
      { label: 'Personne allophone', value: 2, progress: 67 },
      { label: 'Personne en situation de handicap', value: 1, progress: 33 },
    ])
  })
})
