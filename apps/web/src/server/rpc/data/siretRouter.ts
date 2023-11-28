import { z } from 'zod'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { requiredSiretValidation } from '@app/web/validation/siretValidation'
import { fetchSiretData } from '@app/web/server/siret/fetchSiretData'
import { checkAndUpsertSiret } from '@app/web/server/siret/checkAndUpsertSiret'

export const siretRouter = router({
  siretInfo: protectedProcedure
    .input(z.object({ siret: requiredSiretValidation }))
    .query(async ({ input: { siret } }) => fetchSiretData(siret)),
  upsertSiret: protectedProcedure
    .input(z.object({ siret: requiredSiretValidation }))
    .mutation(async ({ input: { siret } }) => checkAndUpsertSiret(siret)),
})
