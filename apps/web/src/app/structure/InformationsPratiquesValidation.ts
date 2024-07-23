import z from 'zod'
import { OpeningHoursValidation } from './OpeningHoursValidation'

export const InformationsPratiquesShape = {
  lieuItinerant: z.boolean().nullish(),
  siteWeb: z
    .string()
    .nullish()
    .refine(
      (value) =>
        value === '' ||
        value == null ||
        z.string().url().safeParse(value).success,
      {
        message: 'Veuillez renseigner une URL valide',
      },
    ),
  ficheAccesLibre: z
    .string()
    .nullish()
    .refine(
      (value) =>
        value === '' ||
        value == null ||
        (z.string().url().safeParse(value).success &&
          value?.startsWith('https://acceslibre.beta.gouv.fr/')),
      {
        message:
          'Veuillez renseigner une URL Acceslibre (https://acceslibre.beta.gouv.fr/...)',
      },
    ),
  horaires: z.string().nullish(),
  horairesComment: z.string().nullish(),
  openingHours: OpeningHoursValidation,
}

export const InformationsPratiquesValidation = z.object({
  id: z.string().uuid(),
  ...InformationsPratiquesShape,
})

export type InformationsPratiquesData = z.infer<
  typeof InformationsPratiquesValidation
>
