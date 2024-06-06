import z from 'zod'

/**
 * Modèle qui représente une structure de la carto nationale, déjà créée chez nous ou non
 */
export const CartoNationaleStructureValidation = z.object(
  {
    // If already existing in our db
    id: z.string().uuid().nullish(),
    // Not yet linked to a carto nationale structure
    structureCartographieNationaleId: z.string().nullish(),
    siret: z.string().nullish(),
    nom: z.string(),
    adresse: z.string().nullish(),
    complementAdresse: z.string().nullish(),
    commune: z.string().nullish(),
    codePostal: z.string().nullish(), // TODO required quand on aura le code postal depuis api adresse pour l'api siret
    codeInsee: z.string().nullish(),
    typologie: z.string().nullish(),
  },
  { required_error: 'Veuillez renseigner la structure' },
)

export type CartoNationaleStructureData = z.infer<
  typeof CartoNationaleStructureValidation
>
