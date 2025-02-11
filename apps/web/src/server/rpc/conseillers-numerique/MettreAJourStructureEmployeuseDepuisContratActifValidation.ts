import z from 'zod'

export const MettreAJourStructureEmployeuseDepuisContratActifValidation =
  z.object({
    userId: z
      .string({
        required_error: 'Veuillez renseigner l’id de l’utilisateur',
      })
      .uuid('Veuillez renseigner un id valide'),
    // See MiseEnRelationConseillerNumeriqueV1MinimalProjection
    miseEnRelation: z.object({
      statut: z.string().optional(),
      // See StructureConseillerNumerique
      structureObj: z.object({
        nom: z.string({
          required_error: 'La structure de ce contrat n’a pas de nom',
        }),
        siret: z
          .string()
          .regex(
            /^\d{14}$/,
            'La structure de ce contrat n’a pas un siret valide',
          ),
        adresseInsee2Ban: z.object({
          name: z.string(),
          citycode: z.string(),
          x: z.number(),
          y: z.number(),
          city: z.string(),
          postcode: z.string(),
        }),
        contact: z.object({
          nom: z.string(),
          prenom: z.string(),
          fonction: z.string(),
          email: z.string().email(),
          telephone: z.string(),
        }),
      }),
      dateRecrutement: z.date().optional(),
      dateDebutDeContrat: z.date().optional(),
      dateFinDeContrat: z.date().optional(),
      typeDeContrat: z.string().optional(),
    }),
  })

export type MettreAJourStructureEmployeuseDepuisContratActifData = z.infer<
  typeof MettreAJourStructureEmployeuseDepuisContratActifValidation
>
