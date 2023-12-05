import {
  Base,
  BaseMembers,
  Resource,
  ResourceContributors,
} from '@prisma/client'
import { SessionUser } from '@app/web/auth/sessionUser'

export type ResourcePermissionTarget = Pick<
  Resource,
  'createdById' | 'deleted' | 'isPublic' | 'published'
> & {
  base: Pick<Base, 'deleted' | 'isPublic' | 'ownerId'> & {
    members: Pick<BaseMembers, 'accepted' | 'memberId' | 'isAdmin'>[]
  }
  contributors: Pick<ResourceContributors, 'contributorId'>[]
}
export type ResourcePermissionGrantee = Pick<SessionUser, 'id'>

export const ResourceSecurityRoles = (
  { contributors, base, createdById }: ResourcePermissionTarget,
  grantee?: ResourcePermissionGrantee,
) => {
  const isCreator = !!grantee && createdById === grantee.id
  const isContributor =
    !!grantee &&
    contributors.some((contributor) => contributor.contributorId === grantee.id)
  const baseMember =
    !!grantee &&
    !!base &&
    base.members.find(
      (member) => member.accepted !== null && member.memberId === grantee.id,
    )

  const isBaseMember = !!baseMember
  const isBaseAdmin = !!baseMember && baseMember.isAdmin

  return {
    isCreator,
    isContributor,
    isBaseMember,
    isBaseAdmin,
  }
}

export const ResourcePermissions = (
  resource: ResourcePermissionTarget,
  grantee?: ResourcePermissionGrantee,
) => {
  const granteeRoles = ResourceSecurityRoles(resource, grantee)

  const { isBaseMember, isContributor, isCreator } = granteeRoles

  const { deleted, isPublic, published } = resource

  const canDelete = !deleted && isCreator
  const canEdit = !deleted && (isCreator || isContributor || isBaseMember)
  const canViewSummary =
    !deleted &&
    (!!published || isPublic || isCreator || isBaseMember || isContributor)
  const canViewContents =
    !deleted && (isPublic || isCreator || isBaseMember || isContributor)

  return {
    granteeRoles,
    canDelete,
    canEdit,
    canViewSummary,
    canViewContents,
  }
}
