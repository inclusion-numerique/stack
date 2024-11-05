import { SessionUser } from '@app/web/auth/sessionUser'

export const mediateurCoordonnesIdsFor = (user: SessionUser) =>
  (user.coordinateur?.mediateursCoordonnes ?? []).map(
    ({ mediateurId }) => mediateurId,
  )
