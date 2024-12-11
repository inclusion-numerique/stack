import { z } from 'zod'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { forbiddenError } from '@app/web/server/rpc/trpcErrors'
import { searchMediateur } from '@app/web/mediateurs/searchMediateurs'
import { removeMediateurFromTeamOf } from '@app/web/mediateurs/removeMediateurFromTeamOf'
import { inviteToJoinTeamOf } from '@app/web/mediateurs/inviteToJoinTeamOf'
import { InviterMembreValidation } from '@app/web/equipe/InviterMembreValidation'
import { isCoordinateur } from '@app/web/auth/userTypeGuards'

export const mediateursRouter = router({
  search: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(({ input: { query }, ctx: { user } }) => {
      if (!user.coordinateur && user.role !== 'Admin')
        throw forbiddenError('User is not a coordinateur')

      return searchMediateur({
        coordinateurId: user.coordinateur?.id,
        searchParams: { recherche: query },
      })
    }),
  removeFromTeam: protectedProcedure
    .input(z.object({ mediateurId: z.string() }))
    .mutation(({ input: { mediateurId }, ctx: { user } }) => {
      if (!isCoordinateur(user))
        throw forbiddenError('User is not a coordinateur')

      return removeMediateurFromTeamOf(user.coordinateur)(mediateurId)
    }),
  invite: protectedProcedure
    .input(InviterMembreValidation)
    .mutation(async ({ input: { members }, ctx: { user } }) => {
      if (!isCoordinateur(user))
        throw forbiddenError('User is not a coordinateur')

      return inviteToJoinTeamOf(user)(members)
    }),
})
