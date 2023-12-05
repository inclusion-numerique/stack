import {
  ResourcePermissionGrantee,
  ResourcePermissions,
  ResourcePermissionTarget,
} from '@app/web/security/ResourcePermissions'

const createGrantee = (id: string): ResourcePermissionGrantee => ({ id })

describe('ResourcePermissions', () => {
  const mockResource: ResourcePermissionTarget = {
    createdById: 'creatorId',
    deleted: null,
    isPublic: false,
    published: null,
    base: {
      deleted: null,
      isPublic: false,
      ownerId: 'baseOwnerId',
      members: [
        { memberId: 'acceptedMemberId', accepted: new Date(), isAdmin: false },
        { memberId: 'notAcceptedMemberId', accepted: null, isAdmin: false },
        { memberId: 'adminMemberId', accepted: new Date(), isAdmin: true },
        { memberId: 'notAcceptedAdminMemberId', accepted: null, isAdmin: true },
      ],
    },
    contributors: [{ contributorId: 'contributorId' }],
  }

  describe('granteeRoles', () => {
    it('should correctly identify the roles of the grantee', () => {
      const grantee = createGrantee('creatorId')
      const permissions = ResourcePermissions(mockResource, grantee)
      expect(permissions.granteeRoles).toEqual({
        isCreator: true,
        isContributor: false,
        isBaseMember: false,
        isBaseAdmin: false,
      })
    })

    // Additional tests for different scenarios of grantee roles can be added here
  })

  describe('canDelete', () => {
    it('should allow deletion for the resource creator', () => {
      const grantee = createGrantee('creatorId')
      const permissions = ResourcePermissions(mockResource, grantee)
      expect(permissions.canDelete).toBe(true)
    })

    it('should not allow deletion if resource is already deleted', () => {
      const grantee = createGrantee('creatorId')
      const permissions = ResourcePermissions(
        { ...mockResource, deleted: new Date() },
        grantee,
      )
      expect(permissions.canDelete).toBe(false)
    })

    // Additional tests for different scenarios of canDelete can be added here
  })

  describe('canEdit', () => {
    it('should allow editing for the resource creator', () => {
      const grantee = createGrantee('creatorId')
      const permissions = ResourcePermissions(mockResource, grantee)
      expect(permissions.canEdit).toBe(true)
    })

    // Additional tests for different scenarios of canEdit can be added here
  })

  describe('canViewSummary', () => {
    it('should allow viewing summary for the resource creator', () => {
      const grantee = createGrantee('creatorId')
      const permissions = ResourcePermissions(mockResource, grantee)
      expect(permissions.canViewSummary).toBe(true)
    })

    // Additional tests for different scenarios of canViewSummary can be added here
  })

  describe('canViewContents', () => {
    it('should allow viewing contents for the resource creator', () => {
      const grantee = createGrantee('creatorId')
      const permissions = ResourcePermissions(mockResource, grantee)
      expect(permissions.canViewContents).toBe(true)
    })

    // Additional tests for different scenarios of canViewContents can be added here
  })
})
