export const ProfileFollowPermissions = {
  FollowProfile: 'FollowProfile',
  UnfollowProfile: 'UnfollowProfile',
} as const

export type ProfileFollowPermission =
  (typeof ProfileFollowPermissions)[keyof typeof ProfileFollowPermissions]
