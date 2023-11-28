import z from 'zod'
import { checkLuhnIntegrity } from '@app/web/utils/checkLuhnIntegrity'

const baseSiretValidation = z
  .string()
  .trim()
  .min(1, 'Veuillez renseigner le SIRET')
  .regex(/^\d{14}$/, {
    message: 'Le SIRET doit être composé de 14 chiffres',
  })
  .refine(checkLuhnIntegrity, {
    message: 'Ce SIRET n’est pas valide',
  })

export const optionalSiretValidation = baseSiretValidation
  // Bypass regex on nullish / empty values
  .or(z.literal(''))

export const requiredSiretValidation = baseSiretValidation
