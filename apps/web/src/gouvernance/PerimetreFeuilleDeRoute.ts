import z from 'zod'

export const PerimetreFeuilleDeRouteValidation = z.object({
  formulaireGouvernanceId: z.string().uuid().nonempty(),
  codeCommunes: z.array(z.string().nonempty()),
  codeEpcis: z.array(z.string().nonempty()),
  codeDepartements: z.array(z.string().nonempty()),

  codeCommunesHorsTerritoire: z.array(z.string().nonempty()),
  codeEpcisHorsTerritoire: z.array(z.string().nonempty()),
  codeDepartementsHorsTerritoire: z.array(z.string().nonempty()),
})

export type PerimetreFeuilleDeRouteData = z.infer<
  typeof PerimetreFeuilleDeRouteValidation
>
