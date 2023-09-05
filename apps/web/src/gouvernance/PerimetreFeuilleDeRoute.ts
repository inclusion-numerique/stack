import z from 'zod'

const CollectivitePerimetreFeuilleDeRoute = z.object({
  type: z.enum(['commune', 'epci', 'departement']),
  code: z.string(),
  horsTerritoire: z.boolean().default(false),
})

export const PerimetreFeuilleDeRouteValidation = z.object({
  formulaireGouvernanceId: z.string().uuid().nonempty(),
  add: z.array(CollectivitePerimetreFeuilleDeRoute),
  remove: z.array(CollectivitePerimetreFeuilleDeRoute),
})

export type PerimetreFeuilleDeRouteData = z.infer<
  typeof PerimetreFeuilleDeRouteValidation
>
