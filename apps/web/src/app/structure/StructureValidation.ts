import z from 'zod'

export const StructureValidation = z.object({
  id: z.string().uuid().nullish(),
  structureCartographieNationaleId: z.string().nullish(),
  nom: z.string(),
  adresse: z.string().nullish(),
  complementAdresse: z.string().nullish(),
  commune: z.string().nullish(),
  codePostal: z.string().nullish(),
  codeInsee: z.string().nullish(),
  typologies: z.array(z.string()).nullish(),
  siret: z.string().nullish(),
  rna: z.string().nullish(),
  visiblePourCartographieNationale: z.boolean().nullish(),
  presentationResume: z.string().nullish(),
  presentationDetail: z.string().nullish(),
  siteWeb: z.string().nullish(),
  accessibilite: z.string().nullish(),
  horaires: z.string().nullish(),
  thematiques: z.array(z.string()).nullish(),
  typesAccompagnement: z.array(z.string()).nullish(),
})

export type StructureData = z.infer<typeof StructureValidation>

export const StructureCreationValidationWithSiret = StructureValidation.extend({
  siret: z.string(),
  nom: z.string(),
  adresse: z.string(),
  commune: z.string(),
  codeInsee: z.string(),
})

export type StructureCreationDataWithSiret = z.infer<
  typeof StructureCreationValidationWithSiret
>
