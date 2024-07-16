import z from 'zod'
import {
  genreValues,
  statutSocialValues,
  trancheAgeValues,
} from '@app/web/beneficiaire/beneficiaire'
import { AdresseBanValidation } from '@app/web/external-apis/ban/AdresseBanValidation'
import { yesOrNo } from '@app/web/utils/yesNoBooleanOptions'

export const anneeNaissanceMax = new Date().getFullYear()
export const anneeNaissanceMin = 1900

// Should accept any international numbers like  (+33) 1 22 33 44 55
// See the spec file for test cases
export const telephoneRegex =
  /^(?:\(\+\d{1,4}\)|\+\d{1,4}|00\d{1,4})[\s()./-]*(?:\d[\s()./-]*){6,14}\d$/

export const BeneficiaireValidation = z.object({
  id: z.string().uuid().nullish(), // defined if update, nullish if create
  mediateurId: z.string().uuid(), // creator of the beneficiaire

  prenom: z.string({
    required_error: 'Veuillez renseigner un prénom',
    invalid_type_error: 'Veuillez renseigner un prénom',
  }),
  nom: z.string({
    required_error: 'Veuillez renseigner un nom',
    invalid_type_error: 'Veuillez renseigner un nom',
  }),
  telephone: z
    .string()
    .regex(
      telephoneRegex,
      'Veuillez renseigner un numéro suivant le format international e.g. (+33) 1 22 33 44 55',
    )
    .nullish(),
  pasDeTelephone: z.boolean().nullish(),
  email: z
    .string()
    .email('Veuillez renseigner une adresse email valide')
    .nullish(),
  dateNaissance: z
    .string()
    .date('Veuillez renseigner une date de naissance valide')
    .nullish(),
  anneeNaissance: z
    .number()
    .int('Veuillez renseigner une année de naissance valide')
    .min(anneeNaissanceMin, 'Veuillez renseigner une année de naissance valide')
    .max(anneeNaissanceMax, 'Veuillez renseigner une année de naissance valide')
    .nullish(),
  adresse: z.string().nullish(),
  communeResidence: AdresseBanValidation.nullish(),
  genre: z.enum(genreValues).nullish(),
  trancheAge: z.enum(trancheAgeValues).nullish(),
  statutSocial: z.enum(statutSocialValues).nullish(),
  notes: z.string().nullish(),
})

export type BeneficiaireData = z.infer<typeof BeneficiaireValidation>

// existing (with id) or anonymous
export const BeneficiaireCraValidation = BeneficiaireValidation.omit({
  prenom: true,
  nom: true,
}).extend({
  vaPoursuivreParcoursAccompagnement: z.enum(yesOrNo).nullish(),
  // Used if selected (id in object), to display the name of the beneficiaire to UI
  prenom: z.string().nullish(),
  nom: z.string().nullish(),
})

export type BeneficiaireCraData = z.infer<typeof BeneficiaireCraValidation>
