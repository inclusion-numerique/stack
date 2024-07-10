import z from 'zod'
import {
  genreValues,
  statutSocialValues,
  trancheAgeValues,
} from '@app/web/beneficiaire/beneficiaire'
import { AdresseBanValidation } from '@app/web/external-apis/ban/AdresseBanValidation'
import { yesOrNo } from '@app/web/utils/yesNoBooleanOptions'

export const BeneficiaireValidation = z.object({
  id: z.string().uuid().nullish(), // defined if update, nullish if create
  mediateurId: z.string().uuid(), // creator of the beneficiaire

  vaPoursuivreParcoursAccompagnement: z.enum(yesOrNo).nullish(), // Useful for anonymous beneficiaire

  prenom: z.string().nullish(),
  nom: z.string().nullish(),
  telephone: z.string().nullish(),
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
    .min(1900, 'Veuillez renseigner une année de naissance valide')
    .max(2030, 'Veuillez renseigner une année de naissance valide')
    .nullish(),
  adresse: z.string().nullish(),
  communeResidence: AdresseBanValidation.nullish(),
  genre: z.enum(genreValues).nullish(),
  trancheAge: z.enum(trancheAgeValues).nullish(),
  statutSocial: z.enum(statutSocialValues).nullish(),
  notes: z.string().nullish(),
})

export type BeneficiaireData = z.infer<typeof BeneficiaireValidation>
