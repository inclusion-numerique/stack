export const BaseRoles = {
  BaseOwner: 'BaseOwner',
  BaseAdmin: 'BaseAdmin',
  BaseMember: 'BaseMember',
  BaseVisitor: 'BaseVisitor',
} as const

export type BaseRole = (typeof BaseRoles)[keyof typeof BaseRoles]

export const BasePermissions = {
  ReadGeneralBaseInformation: 'ReadGeneralBaseInformation',
  WriteBase: 'WriteBase',
  DeleteBase: 'DeleteBase',
  ReadBaseData: 'ReadBaseData',
  ChangeBaseMemberRole: 'ChangeBaseMemberRole',
  RemoveBaseMember: 'RemoveBaseMember',
} as const

export const basePermissions = Object.values(BasePermissions)

export type BasePermission =
  (typeof BasePermissions)[keyof typeof BasePermissions]

export const BaseMemberPermissions = {
  AddBaseMember: 'AddBaseMember',
  AddBaseAdmin: 'AddBaseAdmin',
  ChangeBaseMemberRole: 'ChangeBaseMemberRole',
  RemoveBaseMember: 'RemoveBaseMember',
} as const

export const baseMemberPermissions = Object.values(BaseMemberPermissions)

export type BaseMemberPermission =
  (typeof BaseMemberPermissions)[keyof typeof BaseMemberPermissions]
