import { proportionOf, sum } from './statistics'

export type CreationStatisticsResult = {
  period: string
  private_resources: number
  public_resources: number
  draft_resources: number
  public_users: number
  private_users: number
  public_bases: number
  private_bases: number
}[]

export type CreationStatistics = {
  draftResources: number
  publicResources: number
  privateResources: number
  publicUsers: number
  privateUsers: number
  publicBases: number
  privateBases: number
}

export const EMPTY_PROPORTIONS: CreationStatistics = {
  draftResources: 0,
  publicResources: 0,
  privateResources: 0,
  publicUsers: 0,
  privateUsers: 0,
  publicBases: 0,
  privateBases: 0,
}

const getTotalResources = (total: CreationStatistics) =>
  [total.draftResources, total.publicResources, total.privateResources].reduce(
    sum,
  )

const getTotalUsers = (total: CreationStatistics) =>
  [total.publicUsers, total.privateUsers].reduce(sum, 0)

const getTotalBases = (total: CreationStatistics) =>
  [total.publicBases, total.privateBases].reduce(sum, 0)

const resourcesProportions = (total: CreationStatistics) => {
  const totalResources = getTotalResources(total)
  return {
    draftResources: proportionOf(total.draftResources, totalResources),
    publicResources: proportionOf(total.publicResources, totalResources),
    privateResources: proportionOf(total.privateResources, totalResources),
  }
}

const usersProportions = (total: CreationStatistics) => {
  const totalUsers = getTotalUsers(total)
  return {
    publicUsers: proportionOf(total.publicUsers, totalUsers),
    privateUsers: proportionOf(total.privateUsers, totalUsers),
  }
}

const basesProportions = (total: CreationStatistics) => {
  const totalBases = getTotalBases(total)
  return {
    publicBases: proportionOf(total.publicBases, totalBases),
    privateBases: proportionOf(total.privateBases, totalBases),
  }
}

export const computeCreationProportions = (
  creationStatisticsResult: CreationStatisticsResult,
): CreationStatistics => {
  const total: CreationStatistics = creationStatisticsResult.reduce(
    (mergedResults: CreationStatistics, result) => ({
      draftResources: mergedResults.draftResources + result.draft_resources,
      publicResources: mergedResults.publicResources + result.public_resources,
      privateResources:
        mergedResults.privateResources + result.private_resources,
      publicUsers: mergedResults.publicUsers + result.public_users,
      privateUsers: mergedResults.privateUsers + result.private_users,
      publicBases: mergedResults.publicBases + result.public_bases,
      privateBases: mergedResults.privateBases + result.private_bases,
    }),
    EMPTY_PROPORTIONS,
  )

  return {
    ...resourcesProportions(total),
    ...usersProportions(total),
    ...basesProportions(total),
  }
}
