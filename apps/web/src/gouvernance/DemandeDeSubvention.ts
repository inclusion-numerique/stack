import z from 'zod'
import { BesoinSubvention } from '@prisma/client'
import { numberToString } from '@app/web/utils/formatNumber'
import { stripHtmlTags } from '@app/web/utils/stripHtmlTags'

export const pieceJointeBudgetMaxSize = 40 * 1000 * 1000
export const pieceJointeBudgetAllowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'application/pdf',
]

export const pieceJointeBudgetAllowedExtensions =
  pieceJointeBudgetAllowedMimeTypes.map((mimeType) => mimeType.split('/')[1])

export const noteDeContexteSubventionMinChars = 100
export const NoteDeContexteSubventionsValidation = z.object({
  gouvernanceId: z.string().uuid(),
  noteDeContexteSubventions: z
    .string({
      required_error: 'Veuillez renseigner la note de contexte',
    })
    .refine(
      (value) =>
        !value ||
        stripHtmlTags(value).length >= noteDeContexteSubventionMinChars,
      `La note de contexte doit faire au moins ${numberToString(noteDeContexteSubventionMinChars)} caractères`,
    ),
})

export type NoteDeContexteSubventionsData = z.infer<
  typeof NoteDeContexteSubventionsValidation
>

const BeneficiaireSubventionValidation = z.object({
  id: z.string().uuid().nullish(),
  membreGouvernanceId: z.string().uuid(),
  nom: z.string(),
  subvention: z
    .number({
      required_error: 'Veuillez renseigner le montant alloué',
    })
    .gt(0, 'Le montant doit être supérieur à 0'),
})

export type BeneficiaireSubventionData = z.infer<
  typeof BeneficiaireSubventionValidation
>

export const DemandeDeSubventionActionValidation = z.object({
  id: z.string().uuid(),
})

export type DemandeDeSubventionActionData = z.infer<
  typeof DemandeDeSubventionActionValidation
>

export const contexteDemandeSubventionMaxChars = 3000

const besoinsErrorMessage = 'Veuillez sélectionner au moins un besoin'
const beneficiairesErrorMessage = 'Veuillez renseigner au moins un bénéficiaire'

export const DemandeDeSubventionValidation = z
  .object({
    // This is the maximum amount of the dotation that can be used for subventionDemandee
    // Is given by system, not user input
    montantDotationRestante: z.number(),
    id: z.string().uuid().nullish(),
    besoins: z
      .array(
        z.nativeEnum(BesoinSubvention, {
          required_error: besoinsErrorMessage,
        }),
        { required_error: besoinsErrorMessage },
      )
      .min(1, besoinsErrorMessage),
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
      .gt(0, 'Le budget global doit être supérieur à 0'),
    // Only used in client for upload operation
    pieceJointeBudgetFile: z.any(),
    pieceJointeBudgetKey: z.string({
      required_error: 'Veuillez joindre le budget prévisionnel',
    }),
    subventionDemandee: z
      .number({
        required_error: 'Veuillez renseigner le montant de la subvention',
      })
      .gt(0, 'La subvention demandée doit être supérieure ou égale à 0'),
    subventionEtpChecked: z.boolean().default(false),
    subventionEtp: z
      .number({
        required_error: 'Veuillez renseigner le montant pour les ETP',
      })
      .gt(0, 'Le montant doit être supérieur ou égal à 0')
      .nullish(),
    subventionPrestationChecked: z.boolean().default(false),
    subventionPrestation: z
      .number({
        required_error: 'Veuillez renseigner le montant pour les prestations',
      })
      .gt(0, 'Le montant doit être supérieur ou égal à 0')
      .nullish(),
    beneficiaires: z
      .array(BeneficiaireSubventionValidation, {
        required_error: beneficiairesErrorMessage,
      })
      .min(1, beneficiairesErrorMessage),
  })
  // contexte must be less than contexteDemandeSubventionMaxChars characters
  .refine((data) => data.contexte.length <= contexteDemandeSubventionMaxChars, {
    message: `Le contexte doit faire moins de ${numberToString(
      contexteDemandeSubventionMaxChars,
    )} caractères`,
    path: ['contexte'],
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
        'La somme de la subvention demandée en ressource humaine et prestation de service doit être égale à la subvention demandée',
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
