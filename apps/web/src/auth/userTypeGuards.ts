import type { SessionUser } from '@app/web/auth/sessionUser'

export type MediateurUser<
  T extends Pick<SessionUser, 'mediateur'> = SessionUser,
> = T & {
  mediateur: Exclude<T['mediateur'], null>
}

export type CoordinateurUser<
  T extends Pick<SessionUser, 'coordinateur'> = SessionUser,
> = T & {
  coordinateur: Exclude<T['coordinateur'], null>
}

export type ConseillerNumeriqueUser<
  T extends Pick<SessionUser, 'mediateur'> = SessionUser,
> = T & {
  mediateur: Exclude<T['mediateur'], null> & {
    conseillerNumerique: Exclude<
      Exclude<T['mediateur'], null>['conseillerNumerique'],
      null
    >
  }
}

export const isMediateur = <
  T extends Pick<SessionUser, 'mediateur'> = SessionUser,
>(
  user: T,
): user is MediateurUser<T> => !!user.mediateur

export const isConseillerNumerique = <
  T extends Pick<SessionUser, 'mediateur'> = SessionUser,
>(
  user: T | null,
): user is ConseillerNumeriqueUser<T> => !!user?.mediateur?.conseillerNumerique

export const isCoordinateur = <
  T extends Pick<SessionUser, 'coordinateur'> = SessionUser,
>(
  user: T,
): user is CoordinateurUser<T> => !!user.coordinateur
