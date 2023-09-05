import z from 'zod'

export const siretValidation = z
  .string({
    required_error: 'Veuillez renseigner le SIRET',
  })
  .trim()
  .regex(/^\d{14}$/, {
    message: 'Le SIRET doit être composé de 14 chiffres',
  })
  // Bypass regex on nullish / empty values
  .or(z.literal(''))
