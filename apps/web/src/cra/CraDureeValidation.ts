import { z } from 'zod'
import { dureeAccompagnementPersonnaliseeValue } from '@app/web/cra/cra'

export const CraDureeValidation = z
  .object({
    duree: z.string({
      required_error: 'Veuillez renseigner une durée',
    }),
    dureePersonnalisee: z.number().nullish(),
    dureePersonnaliseeType: z.enum(['minutes', 'heures']).default('minutes'),
  })
  // if duree is 'personnaliser', dureePersonnalisee is required
  .refine(
    (data) =>
      data.duree !== dureeAccompagnementPersonnaliseeValue ||
      data.dureePersonnalisee,
    {
      message: 'Veuillez renseigner une durée personnalisée',
      path: ['duree'],
    },
  )

export type CraDureeData = z.infer<typeof CraDureeValidation>
