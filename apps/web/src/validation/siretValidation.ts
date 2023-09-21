import z from 'zod'

const baseSiretValidation = z
  .string({
    required_error: 'Veuillez renseigner le SIRET',
  })
  .trim()
  .regex(/^\d{14}$/, {
    message: 'Le SIRET doit être composé de 14 chiffres',
  })

export const siretValidation = baseSiretValidation
  // Bypass regex on nullish / empty values
  .or(z.literal(''))

export const requiredSiretValidation = baseSiretValidation.nonempty({
  message: 'Veuillez renseigner le SIRET',
})
