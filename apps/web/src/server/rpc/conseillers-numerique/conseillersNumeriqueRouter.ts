import { SearchConseillerNumeriqueByEmailValidation } from '@app/web/server/rpc/conseillers-numerique/SearchConseillerNumeriqueByEmailValidation'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { forbiddenError } from '@app/web/server/rpc/trpcErrors'
import { findConseillerNumeriqueV1 } from '@app/web/external-apis/conseiller-numerique/searchConseillerNumeriqueV1'
import { MettreAJourStructureEmployeuseDepuisContratActifValidation } from '@app/web/server/rpc/conseillers-numerique/MettreAJourStructureEmployeuseDepuisContratActifValidation'
import {
  createStructureEmployeuseFor,
  findExistingStructureForMiseEnRelationActive,
  findStructureCartographieNationaleFromMiseEnRelation,
} from '@app/web/app/inscription/importFromConseillerNumerique/importFromConseillerNumerique.queries'
import { prismaClient } from '@app/web/prismaClient'
import { createStopwatch } from '@app/web/utils/stopwatch'
import { addMutationLog } from '@app/web/utils/addMutationLog'

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

      let structure = await findExistingStructureForMiseEnRelationActive({
        miseEnRelationActive: miseEnRelation,
      })

      if (!structure) {
        // We create the structure employeuse and link it to structure carto nationale if possible

        const structureCartographieNationale =
          await findStructureCartographieNationaleFromMiseEnRelation(
            miseEnRelation,
          )

        structure = await createStructureEmployeuseFor({
          miseEnRelationActive: miseEnRelation,
        })(structureCartographieNationale)
      }

      // On retire les anciens emplois
      await prismaClient.employeStructure.updateMany({
        where: {
          userId,
          suppression: null,
          structureId: {
            not: structure.id,
          },
        },
        data: {
          suppression: new Date(),
        },
      })

      // We update the "emplois" for the user

      const existingEmploi = await prismaClient.employeStructure.findFirst({
        where: {
          userId,
          structureId: structure.id,
          suppression: null,
        },
        select: {
          id: true,
        },
      })

      // Un doublon de cet emploi existe, on ne fait rien
      if (existingEmploi) {
        return structure
      }

      // On crée un nouvel emploi
      await prismaClient.employeStructure.create({
        data: {
          userId,
          structureId: structure.id,
        },
      })

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
})
