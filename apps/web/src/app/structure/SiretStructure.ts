import z from 'zod'

/**
 * Modèle qui représente une structure créée depuis l'API entreprise
 * de recherche sur le registre SIRET
 */
export const SiretStructureValidation = z.object(
  {
    siret: z.string(),
    nom: z.string(),
    adresse: z.string(),
    complementAdresse: z.string().nullish(),
    commune: z.string(),
    codePostal: z.string().nullish(), // TODO required quand on aura le code postal depuis api adresse pour l'api siret
    codeInsee: z.string(),
    typologie: z.string().nullish(),
  },
  { required_error: 'Veuillez renseigner la structure' },
)

export type SiretStructure = z.infer<typeof SiretStructureValidation>
