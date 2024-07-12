import z from 'zod'

export const StructureInformationsPratiquesCommandValidation = z.object({
  lieuItinerant: z.boolean().nullish(),
  siteWeb: z.string().url('Veuillez renseigner une URL valide').nullish(),
  ficheAccesLibre: z
    .string()
    .url('Veuillez renseigner une URL valide')
    .startsWith(
      'https://acceslibre.beta.gouv.fr/',
      'Veuillez renseigner une URL Acceslibre (https://acceslibre.beta.gouv.fr/...)',
    )
    .nullish(),
  horaires: z.string().nullish(),
})

export type StructureInformationsPratiquesData = z.infer<
  typeof StructureInformationsPratiquesCommandValidation
>
