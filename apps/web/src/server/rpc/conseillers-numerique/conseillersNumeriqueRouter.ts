import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { SearchConseillerNumeriqueByEmailValidation } from '@app/web/server/rpc/conseillers-numerique/SearchConseillerNumeriqueByEmailValidation'
import { forbiddenError } from '@app/web/server/rpc/trpcErrors'
import { findConseillerNumeriqueByEmail } from '@app/web/external-apis/conseiller-numerique/findConseillerNumeriqueByEmail'

export const conseillersNumeriqueRouter = router({
  searchByEmail: protectedProcedure
    .input(SearchConseillerNumeriqueByEmailValidation)
    .mutation(async ({ input: { email }, ctx: { user } }) => {
      if (user.role !== 'Admin') {
        throw forbiddenError()
      }

      const conseiller = await findConseillerNumeriqueByEmail({
        email,
      })

      return conseiller
    }),
})
