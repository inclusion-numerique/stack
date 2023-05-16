import { prismaClient } from '@app/web/prismaClient'
import {
  CreateResourceCommand,
  ResourceCreated,
} from '@app/web/server/resources/feature/CreateResource'
import {
  ResourceCommandHandler,
  ResourceCommandSecurityRule,
} from '@app/web/server/resources/feature/ResourceCommandHandler'
import { ResourceCreationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'
import { ResourceEventSideEffect } from '@app/web/server/resources/feature/ResourceEventSideEffect'
import { createSlug } from '@app/web/utils/createSlug'

const createUniqueSlug = async (title: string) => {
  const slug = createSlug(title)
  const [existing, count] = await Promise.all([
    prismaClient.resource.findUnique({ where: { slug }, select: { id: true } }),
    prismaClient.resource.count(),
  ])
  return existing ? `${slug}-${count + 1}` : slug
}

export const handleCreateResource: ResourceCommandHandler<
  CreateResourceCommand,
  ResourceCreated
> = async ({ payload }, { user }) => {
  const slug = await createUniqueSlug(payload.title)
  const { resourceId, ...rest } = payload

  return {
    type: 'Created',
    timestamp: new Date(),
    data: {
      __version: 1,
      slug,
      id: resourceId,
      byId: user.id,
      ...rest,
    },
  }
}

export const createResourceSecurityRules: ResourceCommandSecurityRule<
  CreateResourceCommand
> = () => true

export const applyResourceCreated: ResourceCreationEventApplier<
  ResourceCreated
> = ({ timestamp, data: { id, slug, title, description, baseId, byId } }) => ({
  id,
  slug,
  title,
  description,
  baseId,
  created: timestamp,
  updated: timestamp,
  createdById: byId,
  imageId: null,
  isPublic: false,
  contents: [],
})

export const onCreated: ResourceEventSideEffect<ResourceCreated> = async (
  event,
  resource,
  { transaction },
) => {
  await transaction.resource.create({
    data: {
      id: event.data.id,
      slug: event.data.slug,
      titleDuplicationCheckSlug: createSlug(event.data.title),
      published: null,
      title: event.data.title,
      description: event.data.description,
      baseId: event.data.baseId,
      created: event.timestamp,
      updated: event.timestamp,
      createdById: event.data.byId,
      isPublic: false,
    },
  })
}
