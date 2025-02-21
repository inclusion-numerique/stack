import {
  genreValues,
  statutSocialValues,
  trancheAgeValues,
} from '@app/web/beneficiaire/beneficiaire'
import { AdresseBanValidation } from '@app/web/external-apis/ban/AdresseBanValidation'
import z from 'zod'

export const anneeNaissanceMax = new Date().getFullYear()
export const anneeNaissanceMin = 1900

// Should accept any international numbers like  (+33) 1 22 33 44 55
// See the spec file for test cases
export const telephoneRegex =
  /^(?:(?:\(\+\d{1,4}\)|\+\d{1,4}|00\d{1,4})[\s()./-]*(?:\d[\s()./-]*){6,14}\d|0\d(?:\s\d{2}){4}|\d{10}|\d(?:\s?\d){9})$/

export const telephoneValidation = z
  .string()
  .transform((value) => (value.trim() === '' ? null : value))
  .refine((data) => data === null || telephoneRegex.test(data), {
    message:
      'Veuillez renseigner un numéro suivant le format français (e.g. 04 55 66 77 88) ou international (e.g. +33 1 22 33 44 55)',
  })
  .nullish()

export const anneeNaissanceValidation = z
  .number({
    invalid_type_error: 'Veuillez renseigner une année de naissance valide',
  })
  .int('Veuillez renseigner une année de naissance valide')
  .min(anneeNaissanceMin, 'Veuillez renseigner une année de naissance valide')
  .max(anneeNaissanceMax, 'Veuillez renseigner une année de naissance valide')
  .nullish()

export const BeneficiaireValidation = z.object({
  id: z.string().uuid().nullish(), // defined if update, nullish if create
  mediateurId: z.string().uuid(), // creator of the beneficiaire

  prenom: z
    .string({
      required_error: 'Veuillez renseigner un prénom',
      invalid_type_error: 'Veuillez renseigner un prénom',
    })
    .trim()
    .min(1, 'Veuillez renseigner un prénom'),
  nom: z
    .string({
      required_error: 'Veuillez renseigner un nom',
      invalid_type_error: 'Veuillez renseigner un nom',
    })
    .trim()
    .min(1, 'Veuillez renseigner un nom'),
  telephone: telephoneValidation,
  pasDeTelephone: z.boolean().nullish(),
  email: z.union([
    z.string().email('Veuillez renseigner une adresse email valide'),
    z
      .string()
      .max(0)
      .transform((value) => value || null),
    z.null(),
    z.undefined(),
  ]),
  anneeNaissance: anneeNaissanceValidation,
  adresse: z.string().nullish(),
  dejaAccompagne: z.boolean().nullish(),
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
  prenom: z.string().nullish(),
  nom: z.string().nullish(),
})

export type BeneficiaireCraData = z.infer<typeof BeneficiaireCraValidation>
