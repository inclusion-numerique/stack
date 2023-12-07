import { v4 } from 'uuid'
import { testSessionUser } from '@app/web/test/testSessionUser'
import { profileRouter } from '@app/web/server/rpc/profile/profileRouter'
import { createTestContext } from '@app/web/test/createTestContext'
import { UpdateProfileVisibilityCommand } from '@app/web/server/profiles/updateProfile'
import { prismaClient } from '@app/web/prismaClient'
import { handleResourceCreationCommand } from '@app/web/server/resources/feature/handleResourceCreationCommand'
import { handleResourceMutationCommand } from '@app/web/server/resources/feature/handleResourceMutationCommand'
import { createTestIdTitleAndSlug } from '@app/web/test/createTestIdTitleAndSlug'

describe('profileRouter', () => {
  // Helper function to easily test procedures

  const givenUserId = v4()
  const givenUserEmail = `test+${givenUserId}@inclusion-numerique.anct.gouv.fr`
  const givenUser = {
    ...testSessionUser,
    id: givenUserId,
    email: givenUserEmail,
  }

  const basesToDelete: string[] = []
  const collectionsToDelete: string[] = []
  const resourcesToDelete: string[] = []

  beforeAll(async () => {
    await prismaClient.user.create({
      data: {
        id: givenUserId,
        email: givenUserEmail,
      },
    })
  })

  afterAll(async () => {
    await prismaClient.collection.deleteMany({
      where: {
        id: {
          in: collectionsToDelete,
        },
      },
    })
    await prismaClient.resourceEvent.deleteMany({
      where: {
        resourceId: {
          in: resourcesToDelete,
        },
      },
    })
    await prismaClient.resource.deleteMany({
      where: {
        id: {
          in: resourcesToDelete,
        },
      },
    })
    await prismaClient.base.deleteMany({
      where: {
        id: {
          in: basesToDelete,
        },
      },
    })
    await prismaClient.user.delete({
      where: {
        id: givenUserId,
      },
    })
  })

  describe('mutate', () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const executeMutateProcedure = (input: UpdateProfileVisibilityCommand) =>
      profileRouter
        .createCaller(createTestContext({ user: givenUser }))
        .mutate(input)

    it('should change visibility to private for owned resource and collections that are not in a base without touching models in a base', async () => {
      // Given a public profile with public and private collections and resources
      // TODO helper for integration profile tests
      const givenBase = createTestIdTitleAndSlug('Test')
      const givenPublicCollectionInBase = createTestIdTitleAndSlug(
        'Public collection in base',
      )
      const givenPublicCollection =
        createTestIdTitleAndSlug('Public collection')
      const givenPrivateCollection =
        createTestIdTitleAndSlug('Private collection')

      const givenPublicResourceInBase = createTestIdTitleAndSlug(
        'Public resource in base',
      )
      const givenPublicResource = createTestIdTitleAndSlug('Public resource')
      const givenPrivateResource = createTestIdTitleAndSlug('Private resource')
      const givenDraftResource = createTestIdTitleAndSlug('Draft resource')

      basesToDelete.push(givenBase.id)
      collectionsToDelete.push(
        givenPublicCollectionInBase.id,
        givenPublicCollection.id,
        givenPrivateCollection.id,
      )
      resourcesToDelete.push(
        givenPublicResourceInBase.id,
        givenPublicResource.id,
        givenPrivateResource.id,
        givenDraftResource.id,
      )

      await prismaClient.base.create({
        data: {
          ...givenBase,
          isPublic: true,
          ownerId: givenUserId,
          email: givenUserEmail,
          collections: {
            createMany: {
              data: [
                {
                  id: givenPublicCollectionInBase.id,
                  title: givenPublicCollectionInBase.title,
                  ownerId: givenUserId,
                  isPublic: true,
                },
              ],
            },
          },
        },
      })

      await prismaClient.collection.createMany({
        data: [
          {
            id: givenPublicCollection.id,
            title: givenPublicCollection.title,
            ownerId: givenUserId,
            isPublic: true,
          },
          {
            id: givenPrivateCollection.id,
            title: givenPrivateCollection.title,
            ownerId: givenUserId,
            isPublic: false,
          },
        ],
      })

      await handleResourceCreationCommand(
        {
          name: 'CreateResource',
          payload: {
            resourceId: givenPublicResourceInBase.id,
            title: givenPublicResourceInBase.title,
            description: '',
            baseId: givenBase.id,
          },
        },
        { user: givenUser },
      )
      await handleResourceMutationCommand(
        {
          name: 'ChangeVisibility',
          payload: {
            resourceId: givenPublicResourceInBase.id,
            isPublic: true,
          },
        },
        {
          user: givenUser,
        },
      )

      await handleResourceCreationCommand(
        {
          name: 'CreateResource',
          payload: {
            resourceId: givenPublicResource.id,
            title: givenPublicResource.title,
            description: '',
            baseId: null,
          },
        },
        { user: givenUser },
      )
      await handleResourceMutationCommand(
        {
          name: 'ChangeVisibility',
          payload: {
            resourceId: givenPublicResource.id,
            isPublic: true,
          },
        },
        {
          user: givenUser,
        },
      )
      await handleResourceCreationCommand(
        {
          name: 'CreateResource',
          payload: {
            resourceId: givenPrivateResource.id,
            title: givenPrivateResource.title,
            description: '',
            baseId: null,
          },
        },
        { user: givenUser },
      )
      await handleResourceMutationCommand(
        {
          name: 'ChangeVisibility',
          payload: {
            resourceId: givenPrivateResource.id,
            isPublic: false,
          },
        },
        {
          user: givenUser,
        },
      )
      await handleResourceCreationCommand(
        {
          name: 'CreateResource',
          payload: {
            resourceId: givenDraftResource.id,
            title: givenDraftResource.title,
            description: '',
            baseId: null,
          },
        },
        { user: givenUser },
      )

      const profile = await executeMutateProcedure({
        isPublic: false,
      })

      const [
        base,
        publicCollectionInBase,
        publicCollection,
        privateCollection,
        publicResourceInBase,
        publicResource,
        privateResource,
        draftResource,
      ] = await Promise.all([
        prismaClient.base.findUniqueOrThrow({
          where: { id: givenBase.id },
          select: { isPublic: true },
        }),
        prismaClient.collection.findUniqueOrThrow({
          where: { id: givenPublicCollectionInBase.id },
          select: { isPublic: true },
        }),
        prismaClient.collection.findUniqueOrThrow({
          where: { id: givenPublicCollection.id },
          select: { isPublic: true },
        }),
        prismaClient.collection.findUniqueOrThrow({
          where: { id: givenPrivateCollection.id },
          select: { isPublic: true },
        }),
        prismaClient.resource.findUniqueOrThrow({
          where: { id: givenPublicResourceInBase.id },
          select: { isPublic: true },
        }),
        prismaClient.resource.findUniqueOrThrow({
          where: { id: givenPublicResource.id },
          select: { isPublic: true },
        }),
        prismaClient.resource.findUniqueOrThrow({
          where: { id: givenPrivateResource.id },
          select: { isPublic: true },
        }),
        prismaClient.resource.findUniqueOrThrow({
          where: { id: givenDraftResource.id },
          select: { isPublic: true },
        }),
      ])

      expect(profile.isPublic).toBeFalse()
      expect(base.isPublic).toBeTrue()
      expect(publicCollectionInBase.isPublic).toBeTrue()
      expect(publicCollection.isPublic).toBeFalse()
      expect(privateCollection.isPublic).toBeFalse()
      expect(publicResourceInBase.isPublic).toBeTrue()
      expect(publicResource.isPublic).toBeFalse()
      expect(privateResource.isPublic).toBeFalse()
      expect(draftResource.isPublic).toBeNull()
    })
  })
})
