import { z } from 'zod'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { requiredSiretValidation } from '@app/web/siret/siretValidation'
import { checkSiret } from '@app/web/siret/checkSiret'

export const siretRouter = router({
  checkSiret: protectedProcedure
    .input(z.object({ siret: requiredSiretValidation }))
    .mutation(async ({ input: { siret } }) => checkSiret(siret)),
})
