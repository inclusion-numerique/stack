import { findConseillerNumeriqueByEmail } from '@app/web/external-apis/conseiller-numerique/findConseillerNumeriqueByEmail'
import { SearchConseillerNumeriqueByEmailValidation } from '@app/web/server/rpc/conseillers-numerique/SearchConseillerNumeriqueByEmailValidation'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { forbiddenError } from '@app/web/server/rpc/trpcErrors'

export const conseillersNumeriqueRouter = router({
  searchByEmail: protectedProcedure
    .input(SearchConseillerNumeriqueByEmailValidation)
    .mutation(async ({ input: { email }, ctx: { user } }) => {
      if (user.role !== 'Admin') {
        throw forbiddenError()
      }

      return findConseillerNumeriqueByEmail(email)
    }),
})
