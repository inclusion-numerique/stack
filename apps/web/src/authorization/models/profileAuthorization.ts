export const ProfileRoles = {
  ProfileOwner: 'ProfileOwner',
  ProfileVisitor: 'ProfileVisitor',
} as const

export type ProfileRole = (typeof ProfileRoles)[keyof typeof ProfileRoles]

export const ProfilePermissions = {
  CreateProfile: 'CreateProfile',
  ReadGeneralProfileInformation: 'ReadGeneralProfileInformation',
  WriteProfile: 'WriteProfile',
  DeleteProfile: 'DeleteProfile',
  ReadProfileEmail: 'ReadProfileEmail',
  ReadProfileData: 'ReadProfileData',
} as const

export const profilePermissions = Object.values(ProfilePermissions)

export type ProfilePermission =
  (typeof ProfilePermissions)[keyof typeof ProfilePermissions]
