import { handleResourceCreationCommand } from '@app/web/server/resources/feature/handleResourceCreationCommand'
import { handleResourceMutationCommand } from '@app/web/server/resources/feature/handleResourceMutationCommand'
import {
  Serialized,
  deserialize,
  serialize,
} from '@app/web/utils/serialization'
import { SessionUser } from '@app/web/auth/sessionUser'
import {
  ResourceCreationCommand,
  ResourceMutationCommand,
} from '@app/web/server/resources/feature/features'

export type SendResourceCommandsInput = {
  user: Pick<SessionUser, 'id'>
  commands: [ResourceCreationCommand, ...ResourceMutationCommand[]]
}

export const sendResourceCommands = async (
  input: Serialized<SendResourceCommandsInput>,
) => {
  const {
    user,
    commands: [createCommand, ...mutateCommands],
  } = deserialize(input)
  const { resource } = await handleResourceCreationCommand(createCommand, {
    user,
  })

  if (mutateCommands.length === 0) {
    return serialize(resource)
  }

  let mutatedResource = resource
  for (const command of mutateCommands) {
    // eslint-disable-next-line no-await-in-loop
    const result = await handleResourceMutationCommand(command, { user })
    mutatedResource = result.resource
  }

  return serialize(mutatedResource)
}
