import {
  ContentRemoved,
  RemoveContentCommand,
} from '@app/web/server/resources/feature/RemoveContent'
import {
  ResourceCommandHandler,
  ResourceCommandSecurityRule,
} from '@app/web/server/resources/feature/ResourceCommandHandler'
import { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'

export const handleRemoveContent: ResourceCommandHandler<
  RemoveContentCommand,
  ContentRemoved
> = ({ payload: { resourceId: _, ...rest } }) => ({
  type: 'ContentRemoved',
  timestamp: new Date(),
  data: {
    __version: 1,
    ...rest,
  },
})

export const removeContentSecurityRules: ResourceCommandSecurityRule<
  RemoveContentCommand
> = () => true

export const applyContentRemoved: ResourceMutationEventApplier<
  ContentRemoved
> = ({ timestamp, data: { id } }, resource) => ({
  ...resource,
  contents: resource.contents.filter((content) => id !== content.id),
  updated: timestamp,
})
