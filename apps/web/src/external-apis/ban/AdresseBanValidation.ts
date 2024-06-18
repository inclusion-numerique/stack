import z from 'zod'

// Represents an object returned by the BAN API
export const AdresseBanValidation = z.object(
  {
    label: z.string().nullish(), // Full address string "e.g. 4 rue de la Rue, 12000 Ville"
    id: z.string(),
    commune: z.string(),
    codePostal: z.string(),
    codeInsee: z.string(),
    nom: z.string(), // Street name + house number  "e.g. 4 rue de la Rue"
    contexte: z.string(), // Geographic context (e.g. "69, Rhone, Auvergne-Rhone-Alpes")
    latitude: z.number(),
    longitude: z.number(),
  },
  {
    required_error: 'Veuillez renseigner une adresse',
    invalid_type_error: 'Veuillez renseigner une adresse',
  },
)

export type AdresseBanData = z.infer<typeof AdresseBanValidation>
