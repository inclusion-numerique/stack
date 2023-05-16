import {
  BaseChanged,
  ChangeBaseCommand,
} from '@app/web/server/resources/feature/ChangeBase'
import {
  ResourceCommandHandler,
  ResourceCommandSecurityRule,
} from '@app/web/server/resources/feature/ResourceCommandHandler'
import { ResourceMutationEventApplier } from '@app/web/server/resources/feature/ResourceEventApplier'

export const handleChangeBase: ResourceCommandHandler<
  ChangeBaseCommand,
  BaseChanged
> = ({ payload: { resourceId: _, ...rest } }) => ({
  type: 'BaseChanged',
  timestamp: new Date(),
  data: {
    __version: 1,
    ...rest,
  },
})

export const changeBaseSecurityRules: ResourceCommandSecurityRule<
  ChangeBaseCommand
> = () => true

export const applyBaseChanged: ResourceMutationEventApplier<BaseChanged> = (
  event,
  resource,
) => ({
  ...resource,
  baseId: event.data.baseId,
  updated: event.timestamp,
})
