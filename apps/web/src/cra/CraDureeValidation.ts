import { z } from 'zod'
import {
  dureeAccompagnementPersonnaliseeValue,
  dureeAcompagnementParDefautDefaultValues,
} from '@app/web/cra/cra'

export const CraDureeValidation = z
  .object({
    duree: z.enum(dureeAcompagnementParDefautDefaultValues, {
      required_error: 'Veuillez renseigner une durée',
    }),
    // Should be positive integer string
    dureePersonnalisee: z.string().optional(),
    dureePersonnaliseeType: z.enum(['minutes', 'heures']).optional(),
  })
  // Todo if duree is personnalisee, dureePersonnaliseeType  and dureePersonnalisee are required
  .refine(
    (data) =>
      data.duree !== dureeAccompagnementPersonnaliseeValue ||
      (data.dureePersonnaliseeType && data.dureePersonnalisee),
    {
      message: 'Veuillez renseigner une durée personnalisée',
      path: ['duree'],
    },
  )
  // if set, dureePersonnaliseeType must be positive integer string
  .refine(
    (data) =>
      !data.dureePersonnalisee ||
      Number.parseInt(data.dureePersonnalisee, 10) > 0,
    {
      message: 'Veuillez renseigner une durée valide',
      path: ['dureePersonnalisee'],
    },
  )

export type CraDureeData = z.infer<typeof CraDureeValidation>
