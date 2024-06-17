import { z } from 'zod'
import { v4 } from 'uuid'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { searchStructure } from '@app/web/structure/searchStructure'
import { searchStructureCartographieNationale } from '@app/web/structure/searchStructureCartographieNationale'
import { CreerStructureValidation } from '@app/web/app/structure/CreerStructureValidation'
import { prismaClient } from '@app/web/prismaClient'
import { createStopwatch } from '@app/web/utils/stopwatch'

export const structuresRouter = router({
  search: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(({ input: { query } }) => searchStructure(query)),

  searchCartographieNationale: protectedProcedure
    .input(
      z.object({ query: z.string(), except: z.array(z.string()).nullish() }),
    )
    .query(({ input: { query, except } }) =>
      searchStructureCartographieNationale(query, {
        except: except ?? undefined,
      }).catch((error) => {
        console.error('Error searching carto nationale structures', error)
        throw error
      }),
    ),

  create: protectedProcedure
    .input(CreerStructureValidation)
    .mutation(
      async ({
        input: {
          lieuActiviteMediateurId,
          nom,
          typologie,
          adresse,
          commune,
          codePostal,
          complementAdresse,
          siret,
          rna,
          visiblePourCartographieNationale,
          presentationResume,
          presentationDetail,
          siteWeb,
          accessibilite,
          horaires,
          thematiques,
          typesAccompagnement,
        },
        ctx: { user },
      }) => {
        const stopwatch = createStopwatch()

        const id = v4()

        const created = await prismaClient.structure.create({
          data: {
            id,
            nom,
            typologie,
            adresse,
            commune,
            codePostal,
            complementAdresse,
            siret,
            rna,
            visiblePourCartographieNationale:
              visiblePourCartographieNationale ?? false,
            presentationResume,
            presentationDetail,
            siteWeb,
            accessibilite,
            horaires,
            thematiques: thematiques ?? [],
            typesAccompagnement: typesAccompagnement ?? [],
            mediateursEnActivite: lieuActiviteMediateurId
              ? {
                  create: {
                    id: v4(),
                    mediateurId: lieuActiviteMediateurId,
                  },
                }
              : undefined,
          },
        })

        await prismaClient.mutation.create({
          data: {
            nom: 'CreerStructure',
            userId: user.id,
            duration: stopwatch.stop().duration,
            data: {
              id,
              nom,
              typologie,
              siret,
              rna,
              codePostal,
            },
          },
        })

        return created
      },
    ),
})
