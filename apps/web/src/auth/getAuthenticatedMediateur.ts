import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { SessionUser } from '@app/web/auth/sessionUser'

export type AuthenticatedMediateur = SessionUser & {
  mediateur: Exclude<SessionUser['mediateur'], null>
}

export const getAuthenticatedMediateur = () =>
  getAuthenticatedSessionUser().then((user): AuthenticatedMediateur => {
    if (!user.mediateur) {
      throw new Error('User is not a mediateur')
    }
    return user as AuthenticatedMediateur
  })
