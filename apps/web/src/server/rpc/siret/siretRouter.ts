import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { checkSiret } from '@app/web/siret/checkSiret'
import { requiredSiretValidation } from '@app/web/siret/siretValidation'
import { z } from 'zod'

export const siretRouter = router({
  checkSiret: protectedProcedure
    .input(z.object({ siret: requiredSiretValidation }))
    .mutation(async ({ input: { siret } }) => checkSiret(siret)),
})
