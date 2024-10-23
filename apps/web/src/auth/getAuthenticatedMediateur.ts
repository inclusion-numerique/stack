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

export const getAuthenticatedMediateurOrCoordinateur = () =>
  getAuthenticatedSessionUser().then((user) => {
    if (!user.mediateur && !user.coordinateur) {
      throw new Error('User is not a mediateur or a coordinateur')
    }
    return user
  })
