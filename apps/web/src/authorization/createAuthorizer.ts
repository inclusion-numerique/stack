import { Grantee } from '@app/web/authorization/grantee'
import { UserSecurityRole } from '@app/web/authorization/userSecurityRole'

/**
 * Higher order function that creates an authorizer function
 * that can take one target and grantee
 * and return a function that can check a permission and returns a boolean
 */
export const createAuthorizer =
  <Target, TargetRole, TargetPermission>(
    getRoles: (target: Target, user: Grantee) => TargetRole[],
    getPermissions: (
      target: Target,
      roles: (TargetRole | UserSecurityRole)[],
    ) => TargetPermission[],
  ) =>
  /**
   * Authorizer function that can check a permission for a target and grantee
   * Computes the roles and permissions only once and returns a "check" function
   */
  (target: Target, user: Grantee) => {
    const roles = getRoles(target, user)
    const userRoles = user ? [user.role] : []
    const permissions = getPermissions(target, [...userRoles, ...roles])

    return (permission: TargetPermission) => permissions.includes(permission)
  }
