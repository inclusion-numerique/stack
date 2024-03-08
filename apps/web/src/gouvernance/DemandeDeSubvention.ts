import z from 'zod'
import { BesoinSubvention } from '@prisma/client'

const BeneficiaireSubventionValidation = z.object({
  id: z.string().uuid().nullish(),
  membreGouvernanceId: z.string().uuid(),
  subvention: z
    .number({
      required_error:
        'Veuillez renseigner le montant de la subvention demandée',
    })
    .min(0)
    .nullish(),
})

export type BeneficiaireSubventionData = z.infer<
  typeof BeneficiaireSubventionValidation
>

const DemandeDeSubventionValidation = z
  .object({
    // This is the maximum amount of the dotation that can be used for subventionDemandee
    // Is given by system, not user input
    montantDotationRestante: z.number(),
    id: z.string().uuid().nullish(),
    besoins: z
      .array(
        z.nativeEnum(BesoinSubvention, {
          required_error: 'Veuillez renseigner un besoin',
        }),
      )
      .min(1, 'Veuillez sélectionner au moins un besoin'),
    feuilleDeRouteId: z
      .string({
        required_error: 'Veuillez renseigner la feuille de route concernée',
      })
      .uuid(),
    nomAction: z.string({
      required_error: 'Veuillez renseigner le nom de l’action',
    }),
    contexte: z.string({ required_error: 'Veuillez renseigner le contexte' }),
    description: z.string({
      required_error:
        'Veuillez renseigner la description de la demande de subvention',
    }),
    budgetGlobal: z
      .number({
        required_error: 'Veuillez renseigner le budget global',
      })
      .min(0, 'Le budget global doit être supérieur à 0'),
    pieceJointeBudgetKey: z.string({
      required_error: 'Veuillez joindre le budget prévisionnel',
    }),
    subventionDemandee: z
      .number({
        required_error:
          'Veuillez renseigner le montant de la subvention demandée',
      })
      .min(0, 'La subvention demandée doit être supérieure ou égale à 0'),
    subventionEtp: z
      .number({
        required_error:
          'Veuillez renseigner le montant de la subvention demandée pour les ETP',
      })
      .min(0, 'Le montant doit être supérieur ou égal à 0')
      .nullish(),
    subventionPrestation: z
      .number({
        required_error:
          'Veuillez renseigner le montant de la subvention demandée pour les prestations',
      })
      .min(0, 'Le montant doit être supérieur ou égal à 0')
      .nullish(),
    beneficiaires: z
      .array(BeneficiaireSubventionValidation)
      .min(1, 'Veuillez sélectionner au moins un bénéficiaire'),
  })
  // subventionDemandee should be lower than budgetGlobal
  .refine((data) => data.subventionDemandee <= data.budgetGlobal, {
    message:
      'La subvention demandée doit être inférieure ou égale au budget global',
    path: ['subventionDemandee'],
  })
  // La somme de montantSubventionEtp et montantSubventionPrestation doit être égale à subventionDemandee
  .refine(
    (data) =>
      data.subventionDemandee ===
      (data.subventionEtp ?? 0) + (data.subventionPrestation ?? 0),
    {
      message:
        'La somme de la subvention demandée pour les ETP et la prestation doit être égale à la subvention demandée',
      path: ['subventionDemandee'],
    },
  )
  // La some des subventions demandées par les membres doit être égale à la subvention demandée
  .refine(
    (data) => {
      const sum = data.beneficiaires.reduce(
        (accumulator, demandeDeSubventionMembre) =>
          accumulator + (demandeDeSubventionMembre.subvention ?? 0),
        0,
      )
      return sum === data.subventionDemandee
    },
    {
      message:
        'La somme des subventions demandées par les membres doit être égale à la subvention demandée',
      path: ['demandeDeSubventionMembres'],
    },
  )

export type DemandeDeSubventionData = z.infer<
  typeof DemandeDeSubventionValidation
>
