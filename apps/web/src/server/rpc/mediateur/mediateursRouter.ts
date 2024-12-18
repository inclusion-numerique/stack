import { z } from 'zod'
import {
  protectedProcedure,
  publicProcedure,
  router,
} from '@app/web/server/rpc/createRouter'
import { forbiddenError } from '@app/web/server/rpc/trpcErrors'
import { searchMediateur } from '@app/web/mediateurs/searchMediateurs'
import { removeMediateurFromTeamOf } from '@app/web/mediateurs/removeMediateurFromTeamOf'
import { findInvitationFrom } from '@app/web/mediateurs/findInvitationFrom'
import { inviteToJoinTeamOf } from '@app/web/mediateurs/inviteToJoinTeamOf'
import { acceptInvitation } from '@app/web/mediateurs/acceptInvitation'
import { declineInvitation } from '@app/web/mediateurs/declineInvitation'
import { InviterMembreValidation } from '@app/web/equipe/InviterMembreValidation'
import { isCoordinateur } from '@app/web/auth/userTypeGuards'
import { InvitationValidation } from '@app/web/equipe/InvitationValidation'

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
  declineInvitation: publicProcedure
    .input(InvitationValidation)
    .mutation(async ({ input: { email, coordinateurId } }) => {
      const invitation = await findInvitationFrom(coordinateurId)(email)

      if (invitation == null)
        throw forbiddenError(
          'There is no invitation for this email matching coordinateurId',
        )

      await declineInvitation(invitation)
    }),
  acceptInvitation: publicProcedure
    .input(InvitationValidation)
    .mutation(async ({ input: { email, coordinateurId } }) => {
      const invitation = await findInvitationFrom(coordinateurId)(email)

      if (invitation == null)
        throw forbiddenError(
          'There is no invitation for this email matching coordinateurId',
        )

      await acceptInvitation(invitation)
    }),
})
