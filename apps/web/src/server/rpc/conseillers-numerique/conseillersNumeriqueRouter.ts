import { isConseillerNumerique } from '@app/web/auth/userTypeGuards'
import {
  MiseEnRelationConseillerNumeriqueV1MinimalProjection,
  MiseEnRelationV1MinimalProjection,
} from '@app/web/external-apis/conseiller-numerique/MiseEnRelationConseillerNumeriqueV1'
import { conseillerNumeriqueMongoCollection } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'
import { findConseillerNumeriqueV1 } from '@app/web/external-apis/conseiller-numerique/searchConseillerNumeriqueV1'
import { MettreAJourStructureEmployeuseDepuisContratActifValidation } from '@app/web/server/rpc/conseillers-numerique/MettreAJourStructureEmployeuseDepuisContratActifValidation'
import { SearchConseillerNumeriqueByEmailValidation } from '@app/web/server/rpc/conseillers-numerique/SearchConseillerNumeriqueByEmailValidation'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { forbiddenError } from '@app/web/server/rpc/trpcErrors'
import { addMutationLog } from '@app/web/utils/addMutationLog'
import { createStopwatch } from '@app/web/utils/stopwatch'
import { ObjectId } from 'mongodb'
import { miseAJourStructureEmployeuseFor } from './miseAJourStructureEmployeuseFor'

export const conseillersNumeriqueRouter = router({
  searchByEmail: protectedProcedure
    .input(SearchConseillerNumeriqueByEmailValidation)
    .mutation(async ({ input: { email }, ctx: { user } }) => {
      if (user.role !== 'Admin') {
        throw forbiddenError()
      }

      return findConseillerNumeriqueV1({ email })
    }),
  mettreAJourStructureEmployeuseDepuisContratActif: protectedProcedure
    .input(MettreAJourStructureEmployeuseDepuisContratActifValidation)
    .mutation(async ({ input: { userId, miseEnRelation }, ctx: { user } }) => {
      if (user.role !== 'Admin') {
        throw forbiddenError()
      }
      const stopwatch = createStopwatch()

      const structure =
        await miseAJourStructureEmployeuseFor(userId)(miseEnRelation)

      addMutationLog({
        userId: user.id,
        nom: 'CreerEmployeStructure',
        duration: stopwatch.stop().duration,
        data: {
          userId,
          structureId: structure.id,
        },
      })

      return structure
    }),
  mettreAJourStructureEmployeuse: protectedProcedure.mutation(
    async ({ ctx: { user } }) => {
      if (!isConseillerNumerique(user)) {
        throw forbiddenError(
          "Cet utilisateur n'est pas un conseiller numérique",
        )
      }

      const stopwatch = createStopwatch()

      const conseillerNumeriqueInfo = await findConseillerNumeriqueV1({
        id: user.mediateur.conseillerNumerique.id,
        includeDeleted: false,
      })

      if (conseillerNumeriqueInfo?.miseEnRelationActive == null) {
        throw new Error(
          `Le conseiller numérique ${user.id} n'a pas de mise en relation active`,
        )
      }

      const structure = await miseAJourStructureEmployeuseFor(user.id)(
        conseillerNumeriqueInfo?.miseEnRelationActive,
      )

      addMutationLog({
        userId: user.id,
        nom: 'CreerEmployeStructure',
        duration: stopwatch.stop().duration,
        data: {
          userId: user.id,
          structureId: structure.id,
        },
      })

      return structure
    },
  ),
})
