import z from 'zod'
import { AdresseBanValidation } from '@app/web/external-apis/ban/AdresseBanValidation'
import { validateValidSiretDigits } from '@app/web/siret/siretValidation'
import { validateValidRnaDigits } from '@app/web/rna/rnaValidation'

export const descriptionMaxLength = 280

export const CreerStructureValidation = z.object({
  // Créer un lieu d’activité pour un médiateur en meme temps que la structure
  lieuActiviteMediateurId: z.string().nullish(),

  adresseBan: AdresseBanValidation,

  nom: z.string({
    required_error: 'Veuillez renseigner le nom de la structure',
  }),
  complementAdresse: z.string().nullish(),
  siret: z
    .string()
    .nullish()
    .refine(
      (value) =>
        !value ||
        validateValidSiretDigits(value) ||
        validateValidRnaDigits(value),
      {
        message: 'Ceci n’est pas un n°SIRET ou RNA valide',
      },
    ),
  rna: z.string().nullish(),
  visiblePourCartographieNationale: z.boolean().default(false),
  // TODO sub objects for whole optional validation ?
  typologie: z
    .string({
      required_error: 'Veuillez renseigner la typologie de la structure',
    })
    .nullish(),
  presentationResume: z
    .string()
    .max(
      descriptionMaxLength,
      `Cette description doit faire moins de ${descriptionMaxLength} caractères`,
    )
    .nullish(),
  lieuItinerant: z.boolean().nullish(),
  presentationDetail: z.string().nullish(),
  siteWeb: z.string().url('Veuillez renseigner une URL valide').nullish(),
  accessibilite: z
    .string()
    .url('Veuillez renseigner une URL valide')
    .startsWith(
      'https://acceslibre.beta.gouv.fr/',
      'Veuillez renseigner une URL Acceslibre (https://acceslibre.beta.gouv.fr/...)',
    )
    .nullish(),
  horaires: z.string().nullish(),
  thematiques: z.array(z.string()).nullish(),
  typesAccompagnement: z.array(z.string()).nullish(),
})

export type CreerStructureData = z.infer<typeof CreerStructureValidation>
