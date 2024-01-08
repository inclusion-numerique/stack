import { z } from 'zod'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import {
  UpdateProfileContactsCommandValidation,
  UpdateProfileImageCommandValidation,
  UpdateProfileInformationsCommandValidation,
  UpdateProfileVisibilityCommandValidation,
} from '@app/web/server/profiles/updateProfile'
import { searchMember } from '@app/web/server/profiles/searchMember'
import { invalidError } from '@app/web/server/rpc/trpcErrors'
import { createSlug } from '@app/web/utils/createSlug'
import { findFirstAvailableSlug } from '@app/web/server/slug/findFirstAvailableSlug'
import { handleResourceMutationCommand } from '../../resources/feature/handleResourceMutationCommand'

export const profileRouter = router({
  searchProfileForMember: protectedProcedure
    .input(
      z.object({
        query: z.string(),
        notInBaseId: z.string().optional(),
        notInResourceId: z.string().optional(),
      }),
    )
    .query(async ({ input: { query, notInBaseId, notInResourceId } }) =>
      query.length > 1
        ? searchMember({
            query,
            notInBaseId,
            notInResourceId,
          })
        : [],
    ),
  updateVisibility: protectedProcedure
    .input(UpdateProfileVisibilityCommandValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      if (input.isPublic === false) {
        // All public resources not in a base must be made private
        const resources = await prismaClient.resource.findMany({
          select: { id: true },
          where: { createdById: user.id, baseId: null, isPublic: true },
        })

        // All public collections not in a base must be made private
        const collections = await prismaClient.collection.findMany({
          select: { id: true },
          where: { ownerId: user.id, baseId: null, isPublic: true },
        })

        return prismaClient.$transaction(async (transaction) => {
          await Promise.all(
            resources.map((resource) =>
              handleResourceMutationCommand(
                {
                  name: 'ChangeVisibility',
                  payload: { resourceId: resource.id, isPublic: false },
                },
                { user },
                transaction,
              ),
            ),
          )

          await Promise.all(
            collections.map((collection) =>
              transaction.collection.update({
                where: { id: collection.id },
                data: { isPublic: false },
              }),
            ),
          )

          return transaction.user.update({
            where: { id: user.id },
            data: input,
          })
        })
      }
      return prismaClient.user.update({ where: { id: user.id }, data: input })
    }),
  updateInformations: protectedProcedure
    .input(UpdateProfileInformationsCommandValidation)
    .mutation(async ({ input: informations, ctx: { user } }) => {
      // TODO security check
      const profile = await prismaClient.user.findUnique({
        where: { id: user.id, deleted: null },
        select: { slug: true },
      })

      if (!profile) {
        throw invalidError('User not found')
      }

      const firstName = informations.firstName?.trim() || null
      const lastName = informations.lastName?.trim() || null
      const name = `${firstName ?? ''} ${lastName ?? ''}`.trim() || null
      const slugTitle = name || 'utilisateur'

      const afterSlug = createSlug(slugTitle)

      // Get new slug if it has changed
      const slug =
        user.slug === afterSlug
          ? undefined
          : await findFirstAvailableSlug(afterSlug, 'users')

      return prismaClient.user.update({
        where: { id: user.id },
        data: {
          ...informations,
          firstName,
          lastName,
          name,
          slug,
        },
      })
    }),
  updateContacts: protectedProcedure
    .input(UpdateProfileContactsCommandValidation)
    .mutation(async ({ input: contacts, ctx: { user } }) =>
      prismaClient.user.update({
        where: { id: user.id },
        data: {
          website: contacts.website === '' ? null : contacts.website,
          facebook: contacts.facebook === '' ? null : contacts.facebook,
          twitter: contacts.twitter === '' ? null : contacts.twitter,
          linkedin: contacts.linkedin === '' ? null : contacts.linkedin,
        },
      }),
    ),
  updateImage: protectedProcedure
    .input(UpdateProfileImageCommandValidation)
    .mutation(async ({ input, ctx: { user } }) =>
      prismaClient.user.update({
        where: { id: user.id },
        data: { imageId: input.imageId },
      }),
    ),
})
