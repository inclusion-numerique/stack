export const BaseFollowPermissions = {
  FollowBase: 'FollowBase',
  UnfollowBase: 'UnfollowBase',
} as const

export const baseFollowPermissions = Object.values(BaseFollowPermissions)

export type BaseFollowPermission =
  (typeof BaseFollowPermissions)[keyof typeof BaseFollowPermissions]
