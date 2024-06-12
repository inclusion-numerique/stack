import { z } from 'zod'
import { v4 } from 'uuid'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { searchStructure } from '@app/web/structure/searchStructure'
import { searchStructureCartographieNationale } from '@app/web/structure/searchStructureCartographieNationale'
import { CreerStructureValidation } from '@app/web/app/structure/CreerStructureValidation'
import { prismaClient } from '@app/web/prismaClient'

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
        console.log('user', user)
        console.log('mutation input', {
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
        })

        const created = await prismaClient.structure.create({
          data: {
            id: v4(),
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

        return created
      },
    ),
})
