import type { Resource } from '@prisma/client'
import { Grantee } from '@app/web/authorization/grantee'

export const ResourceRoles = {
  ResourceCreator: 'ResourceCreator',
  ResourceContributor: 'ResourceContributor',
  ResourceVisitor: 'ResourceVisitor',
} as const

export type ResourceRole = (typeof ResourceRoles)[keyof typeof ResourceRoles]

export const ResourcePermissions = {
  ReadGeneralResourceInformation: 'ReadGeneralResourceInformation',
  WriteResource: 'WriteResource',
  DeleteResource: 'DeleteResource',
  ReadResourceContent: 'ReadResourceContent',
} as const

export const resourcePermissions = Object.values(ResourcePermissions)

export type ResourcePermission =
  (typeof ResourcePermissions)[keyof typeof ResourcePermissions]

export const ResourceContributorPermissions = {
  AddResourceContributor: 'AddResourceContributor',
  RemoveResourceContributor: 'RemoveResourceContributor',
} as const

export const resourceContributorPermissions = Object.values(
  ResourceContributorPermissions,
)

export type ResourceContributorPermission =
  (typeof ResourceContributorPermissions)[keyof typeof ResourceContributorPermissions]

export type ResourceAuthorizationTarget = Pick<
  Resource,
  'published' | 'isPublic' | 'createdById' | 'baseId' | 'deleted'
>

export const getResourceRoles = (
  resource: ResourceAuthorizationTarget,
  user: Grantee,
): ResourceRole[] => {
  if (resource.deleted) {
    return []
  }

  if (!user) {
    return [ResourceRoles.ResourceVisitor]
  }

  if (resource.createdById === user.id) {
    return [ResourceRoles.ResourceCreator, ResourceRoles.ResourceContributor]
  }

  if (
    user.resources.some() &&
    (user?.role === 'Admin' || user?.role === 'Support')
  ) {
    return Object.values(ResourceRoles)
  }

  if (user?.id === resource.createdById) {
    return [ResourceRoles.ResourceCreator]
  }

  return [ResourceRoles.ResourceVisitor]
}

export const getResourcePermissions = (
  resource: ResourceAuthorizationTarget,
  user: Grantee,
  roles: ResourceRole[],
): ResourcePermission[] => {
  if (resource.deleted) {
    return []
  }

  if (user?.role === 'Admin' || user?.role === 'Support') {
    return resourcePermissions
  }

  // Draft resources
  if (!resource.published && !user) {
    return []
  }

  return []
}
