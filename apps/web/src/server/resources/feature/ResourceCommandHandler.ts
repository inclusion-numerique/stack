import { SessionUser } from '@app/web/auth/sessionUser'
import { ApplierResourceEvent } from '@app/web/server/resources/feature/ResourceEventApplier'

export type HandlerResourceCommand<
  Name extends string = string,
  Payload = unknown,
> = {
  name: Name
  payload: Payload
}

export type ResourceCommandHandlerContext = {
  user: SessionUser
}
export type ResourceCommandHandler<
  Command extends HandlerResourceCommand = HandlerResourceCommand,
  Event extends ApplierResourceEvent = ApplierResourceEvent,
> = (
  command: Command,
  context: ResourceCommandHandlerContext,
) => Event | Event[] | Promise<Event | Event[]>

export type ResourceCommandSecurityRuleContext = {
  user: SessionUser
}

export type ResourceCommandSecurityRule<
  Command extends HandlerResourceCommand = HandlerResourceCommand,
> = (
  command: Command,
  context: ResourceCommandSecurityRuleContext,
) => Promise<boolean> | boolean
