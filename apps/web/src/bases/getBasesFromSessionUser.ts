import { SessionUser } from '@app/web/auth/sessionUser'

export const getBasesFromSessionUser = (user: SessionUser) => [
  ...user.ownedBases,
  ...user.bases.map(({ base }) => base),
]

export type SessionUserBase = ReturnType<typeof getBasesFromSessionUser>[number]
