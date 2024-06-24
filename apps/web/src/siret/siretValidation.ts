import z from 'zod'
import { checkLuhnIntegrity } from '@app/web/siret/checkLuhnIntegrity'

export const validateValidSiretDigits = (siret: string) =>
  // La poste has invalid siret for its structures, we whitelist La Poste SIREN
  siret.length === 14 &&
  siret !== '00000000000000' &&
  (siret.startsWith('356000000') || checkLuhnIntegrity(siret))

const baseSiretValidation = z
  .string()
  .trim()
  .min(1, 'Veuillez renseigner le SIRET')
  .regex(/^\d{14}$/, {
    message: 'Le SIRET doit être composé de 14 chiffres',
  })
  .refine(validateValidSiretDigits, {
    message: 'Ce SIRET n’est pas valide',
  })

export const optionalSiretValidation = baseSiretValidation
  // Bypass regex on nullish / empty values
  .or(z.literal(''))

export const requiredSiretValidation = baseSiretValidation

export const SiretInfoValidation = z.object({
  siret: requiredSiretValidation,
  // Nom will comme from SIRET Check API. If it is not defined, means the SIRET is loading or invalid
  nom: z.string().min(1, 'SIRET en cours de vérification'),
})

export type SiretInfoData = z.infer<typeof SiretInfoValidation>
