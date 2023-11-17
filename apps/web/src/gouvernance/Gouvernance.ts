import z, { ZodArray, ZodEffects, ZodObject } from 'zod'
import { ZodRawShape } from 'zod/lib/types'
import { FrequenceComite, TypeComite, TypeContrat } from '@prisma/client'
import { requiredSiretValidation } from '@app/web/validation/siretValidation'
import { GouvernanceFormSection } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections'

export const MembreValidation = z.object({
  code: z.string(),
  nom: z.string(),
  coporteur: z.boolean().default(false),
})

export type MembreData = z.infer<typeof MembreValidation>

export const ComiteValidation = z
  .object({
    id: z.string().uuid().nullish(),
    type: z.nativeEnum(TypeComite, {
      required_error: 'Veuillez renseigner le type de comité',
    }),
    typeAutrePrecisions: z.string().nullish(),
    frequence: z.nativeEnum(FrequenceComite, {
      required_error: 'Veuillez renseigner la fréquence du comité',
    }),
    commentaire: z.string().nullish(),
  })
  .refine(
    (data) => !(data.type === TypeComite.Autre && !data.typeAutrePrecisions),
    {
      message: 'Veuillez renseigner le type de comité',
      path: ['typeAutrePrecisions'],
    },
  )
export type ComiteData = z.infer<typeof ComiteValidation>

export const FeuilleDeRouteValidation = z
  .object({
    id: z.string().uuid().nullish(),
    nom: z.string({
      required_error: 'Veuillez renseigner le nom de la feuille de route',
    }),
    // Actor code of the member that is the porteur of the feuille de route
    porteur: MembreValidation.refine(
      (data) => !!data,
      'Veuillez renseigner le porteur de la feuille de route',
    ),
    perimetreScope: z.enum(['region', 'departement', 'epci'], {
      required_error: 'Veuillez renseigner le périmètre de la feuille de route',
    }),
    perimetreEpciCodes: z.array(z.string()),
    contratPreexistant: z.enum(['oui', 'non'], {
      required_error: 'Veuillez renseigner si un contrat préexiste',
    }),
    typeContrat: z.nativeEnum(TypeContrat).nullish(),
    typeContratAutreDescription: z.string().nullish(),
  })
  .refine(
    // perimetreEpciCodes must have at least one element if perimetreScope is epci
    (data) =>
      data.perimetreScope !== 'epci' || data.perimetreEpciCodes.length > 0,
    {
      message: 'Veuillez renseigner le périmètre de la feuille de route',
      path: ['perimetreEpciCodes'],
    },
  )
  .refine(
    // Refine so typeContrat is required if contratPreexistant is true
    (data) => !(data.contratPreexistant === 'oui' && !data.typeContrat),
    {
      message: 'Veuillez renseigner le type de contrat',
      path: ['typeContrat'],
    },
  )
  .refine(
    // refine so typeContratAutrePrecisions is required if typeContrat is Autre and contratPreexistant is true
    (data) =>
      !(
        data.contratPreexistant === 'oui' &&
        data.typeContrat === TypeContrat.Autre &&
        !data.typeContratAutreDescription
      ),
    {
      message: 'Veuillez préciser le contrat préexistant',
      path: ['typeContratAutreDescription'],
    },
  )
export type FeuilleDeRouteData = z.infer<typeof FeuilleDeRouteValidation>

// TODO Find a way to extend with refine
/**
 * A Gouvernance form is composed of sections
 * They can have an independent edition form, or all be used in a creation form
 */

const contactDuSousPrefetReferentConstraints = {
  gouvernanceId: z.string().uuid(),
  sousPrefetReferentPrenom: z.string({
    required_error: 'Veuillez renseigner le prénom du sous-préfet référent',
  }),
  sousPrefetReferentNom: z.string({
    required_error: 'Veuillez renseigner le nom du sous-préfet référent',
  }),
  sousPrefetReferentEmail: z
    .string({
      required_error: 'Veuillez renseigner l’email du sous-préfet référent',
    })
    .email('Veuillez renseigner un email valide'),
}

const coporteursDeLaGouvernanceConstraints = {
  gouvernanceId: z.string().uuid(),
  // Array of actor codes of selected members
  // They will be refined to have at least one element with coporteur: true
  membres: z.array(MembreValidation),
  pasDeCoporteurs: z.boolean().nullish(),
}

const membresDeLaGouvernanceConstraints = {
  gouvernanceId: z.string().uuid(),
  // Array of actor codes of selected members
  membres: z.array(MembreValidation).min(1, {
    message: 'Veuillez renseigner les membres de la gouvernance',
  }),
}

const comitologieConstraints = {
  gouvernanceId: z.string().uuid(),
  comites: z.array(ComiteValidation),
}

const feuillesDeRouteEtPorteursConstraints = {
  gouvernanceId: z.string().uuid(),
  feuillesDeRoute: z.array(FeuilleDeRouteValidation).min(1, {
    message: 'Veuillez renseigner au moins une feuille de route',
  }),
}

export const SiretInfoValidation = z.object({
  siret: requiredSiretValidation,
  // Nom will comme from SIRET Check API. If it is not defined, means the SIRET is loading or invalid
  nom: z.string(),
})

export type SiretInfoData = z.infer<typeof SiretInfoValidation>

const coordinateurConseillerNumeriqueDeLaGouvernanceConstraints = {
  gouvernanceId: z.string().uuid(),
  recruteursCoordinateurs: z.array(SiretInfoValidation).min(1, {
    message: 'Veuillez renseigner au moins une collectivité/structure',
  }),
}

const noteDeContextConstraints = {
  gouvernanceId: z.string().uuid(),
  noteDeContexte: z.string({
    required_error: 'Veuillez renseigner la note de contexte',
  }),
}

export const GouvernanceSectionValidations = {
  contactDuSousPrefetReferent: z.object(contactDuSousPrefetReferentConstraints),
  coporteursDeLaGouvernance: z.object(coporteursDeLaGouvernanceConstraints),
  membresDeLaGouvernance: z.object(membresDeLaGouvernanceConstraints),
  comitologie: z.object(comitologieConstraints),
  feuillesDeRouteEtPorteurs: z.object(feuillesDeRouteEtPorteursConstraints),
  coordinateurConseillerNumeriqueDeLaGouvernance: z.object(
    coordinateurConseillerNumeriqueDeLaGouvernanceConstraints,
  ),
  noteDeContexte: z.object(noteDeContextConstraints),
} satisfies {
  [key in GouvernanceFormSection]:
    | ZodObject<ZodRawShape>
    | ZodEffects<ZodObject<ZodRawShape>>
    | ZodArray<ZodEffects<ZodObject<ZodRawShape>>>
}

export type ContactDuSousPrefetReferentData = z.infer<
  typeof GouvernanceSectionValidations.contactDuSousPrefetReferent
>
export type CoporteursDeLaGouvernanceData = z.infer<
  typeof GouvernanceSectionValidations.coporteursDeLaGouvernance
>
export type MembresDeLaGouvernanceData = z.infer<
  typeof GouvernanceSectionValidations.membresDeLaGouvernance
>
export type ComitologieData = z.infer<
  typeof GouvernanceSectionValidations.comitologie
>
export type FeuillesDeRouteEtPorteursData = z.infer<
  typeof GouvernanceSectionValidations.feuillesDeRouteEtPorteurs
>
export type CoordinateurConseillerNumeriqueDeLaGouvernanceData = z.infer<
  typeof GouvernanceSectionValidations.coordinateurConseillerNumeriqueDeLaGouvernance
>
export type NoteDeContexteData = z.infer<
  typeof GouvernanceSectionValidations.noteDeContexte
>

export const CreateGouvernanceValidation = z.object({
  departementCode: z.string({
    required_error: 'Veuillez renseigner le département',
  }),
})
export type CreateGouvernanceData = z.infer<typeof CreateGouvernanceValidation>

// If a gouvernance v2 is not yet submited, all sections must be filled at once
export const GouvernanceValidation = z
  .object({
    ...contactDuSousPrefetReferentConstraints,
    ...coporteursDeLaGouvernanceConstraints,
    ...membresDeLaGouvernanceConstraints,
    ...comitologieConstraints,
    ...feuillesDeRouteEtPorteursConstraints,
    ...coordinateurConseillerNumeriqueDeLaGouvernanceConstraints,
    ...noteDeContextConstraints,
  })
  // There should be co porteur if checkbox is not checked
  .refine(
    (data) =>
      !!data.pasDeCoporteurs || data.membres.some(({ coporteur }) => coporteur),
    {
      message: 'Veuillez renseigner les co-porteurs de la gouvernance',
      path: ['membres'],
    },
  )

export type GouvernanceData = z.infer<typeof GouvernanceValidation>
