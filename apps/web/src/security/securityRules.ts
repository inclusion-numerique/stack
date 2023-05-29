import { Base } from '@prisma/client'
import { SessionUser } from '@app/web/auth/sessionUser'
import { Resource } from '@app/web/server/resources/getResource'

export const canViewResource = (
  user: Pick<SessionUser, 'id'>,
  resource: Pick<Resource, 'isPublic' | 'createdById'> & {
    base: Pick<Base, 'isPublic'> | null
  },
) => {
  if (resource.isPublic && resource.base?.isPublic) {
    return true
  }

  return resource.createdById === user.id
}
