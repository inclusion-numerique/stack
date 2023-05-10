import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { createResourceValidation } from '@app/web/server/rpc/resource/createResource'
import { createSlug } from '@app/web/utils/createSlug'
import { getResourceSelect } from '../../resources'
import { notFoundError } from '../trpcErrors'
import {
  editResourceBaseValidation,
  editResourceTitleValidation,
} from './editResource'

const createUniqueSlug = async (title: string) => {
  const slug = createSlug(title)
  const [existing, count] = await Promise.all([
    prismaClient.resource.findUnique({ where: { slug }, select: { id: true } }),
    prismaClient.resource.count(),
  ])
  return existing ? `${slug}-${count + 1}` : slug
}

export const resourceRouter = router({
  create: protectedProcedure
    .input(createResourceValidation)
    .mutation(
      async ({ input: { baseId, title, description }, ctx: { user } }) => {
        const slug = await createUniqueSlug(title)

        return prismaClient.resource.create({
          data: {
            id: v4(),
            slug,
            title,
            titleDuplicationCheckSlug: createSlug(title),
            description,
            createdById: user.id,
            baseId,
          },
          select: {
            id: true,
            slug: true,
          },
        })
      },
    ),
  editTitle: protectedProcedure
    .input(editResourceTitleValidation)
    .mutation(async ({ input: { title, description, id } }) => {
      const existingResource = await prismaClient.resource.findFirst({
        where: { id },
        select: {
          createdById: true,
        },
      })

      // TODO manage createdById
      if (!existingResource) {
        throw notFoundError()
      }

      return prismaClient.resource.update({
        data: {
          title,
          description,
        },
        where: {
          id,
        },
        select: getResourceSelect,
      })
    }),
  editBase: protectedProcedure
    .input(editResourceBaseValidation)
    .mutation(async ({ input: { baseId, id } }) => {
      const existingResource = await prismaClient.resource.findFirst({
        where: { id },
        select: {
          createdById: true,
        },
      })

      // TODO manage createdById
      if (!existingResource) {
        throw notFoundError()
      }

      return prismaClient.resource.update({
        data: {
          baseId,
        },
        where: {
          id,
        },
        select: getResourceSelect,
      })
    }),
})
