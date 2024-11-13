import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { SessionUser } from '@app/web/auth/sessionUser'

export type AuthenticatedMediateur = SessionUser & {
  mediateur: Exclude<SessionUser['mediateur'], null>
}

export type AuthenticatedCoordinateur = SessionUser & {
  coordinateur: Exclude<SessionUser['coordinateur'], null>
}

export const getAuthenticatedMediateur = () =>
  getAuthenticatedSessionUser().then((user): AuthenticatedMediateur => {
    if (!user.mediateur) {
      throw new Error('User is not a mediateur')
    }
    return user as AuthenticatedMediateur
  })

export const getAuthenticatedCoordinateur = () =>
  getAuthenticatedSessionUser().then((user): AuthenticatedCoordinateur => {
    if (!user.coordinateur) {
      throw new Error('User is not a coordinateur')
    }
    return user as AuthenticatedCoordinateur
  })

export const getAuthenticatedMediateurOrCoordinateur = () =>
  getAuthenticatedSessionUser().then((user) => {
    if (!user.mediateur && !user.coordinateur) {
      throw new Error('User is not a mediateur or a coordinateur')
    }
    return user
  })
