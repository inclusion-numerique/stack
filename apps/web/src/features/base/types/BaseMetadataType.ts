import { BaseFollowedBy } from '@app/web/server/bases/getBase'

export type BaseMetadataData = {
  _count: {
    followedBy: number
    resources: number
    resourcesViews: number
  }
  followedBy: BaseFollowedBy
  isPublic: boolean
  department: string | null
}
