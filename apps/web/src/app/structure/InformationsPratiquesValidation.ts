import z from 'zod'

export const InformationsPratiquesValidation = z.object({
  id: z.string().uuid(),
  lieuItinerant: z.boolean().nullish(),
  siteWeb: z
    .string()
    .nullish()
    .refine(
      (value) => value === '' || z.string().url().safeParse(value).success,
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
        (z.string().url().safeParse(value).success &&
          value?.startsWith('https://acceslibre.beta.gouv.fr/')),
      {
        message:
          'Veuillez renseigner une URL Acceslibre (https://acceslibre.beta.gouv.fr/...)',
      },
    ),
  horaires: z.string().nullish(),
})

export type InformationsPratiquesData = z.infer<
  typeof InformationsPratiquesValidation
>
