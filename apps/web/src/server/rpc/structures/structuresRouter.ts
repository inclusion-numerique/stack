import { z } from 'zod'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { searchStructure } from '@app/web/structure/searchStructure'
import { searchStructureCartographieNationale } from '@app/web/structure/searchStructureCartographieNationale'

export const structuresRouter = router({
  search: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(({ input: { query } }) => searchStructure(query)),

  searchCartographieNationale: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(({ input: { query } }) =>
      searchStructureCartographieNationale(query).catch((error) => {
        console.error('Error searching carto nationale structures', error)
        throw error
      }),
    ),
})