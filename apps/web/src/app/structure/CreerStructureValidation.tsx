import z from 'zod'

export const CreerStructureValidation = z.object({
  // Créer un lieu d’activité pour un médiateur en meme temps que la structure
  lieuActiviteMediateurId: z.string().nullish(),

  nom: z.string({
    required_error: 'Veuillez renseigner le nom de la structure',
  }),
  adresse: z.string({
    required_error: 'Veuillez renseigner l’adresse',
  }),
  complementAdresse: z.string().nullish(),
  commune: z.string({
    required_error: 'Veuillez renseigner la commune',
  }),
  codePostal: z.string({
    required_error: 'Veuillez renseigner le code postal',
  }),
  typologie: z.string({
    required_error: 'Veuillez renseigner la typologie de la structure',
  }),
  siret: z.string().nullish(),
  rna: z.string().nullish(),
  visiblePourCartographieNationale: z.boolean().default(false),
  presentationResume: z.string().nullish(),
  presentationDetail: z.string().nullish(),
  siteWeb: z.string().nullish(),
  accessibilite: z.string().nullish(),
  horaires: z.string().nullish(),
  thematiques: z.array(z.string()).nullish(),
  typesAccompagnement: z.array(z.string()).nullish(),
})

export type CreerStructureData = z.infer<typeof CreerStructureValidation>
