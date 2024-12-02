import { z } from 'zod'
import { dureeAccompagnementPersonnaliseeValue } from '@app/web/cra/cra'

export const maxMinutes = 59
export const maxHeures = 23

export const CraDureeValidation = z
  .object({
    duree: z.string({
      required_error: 'Veuillez renseigner une durée',
    }),
    dureePersonnaliseeHeures: z
      .number()
      .max(maxHeures, {
        message: `De 0 à ${maxHeures} heures`,
      })
      .nullish(),
    dureePersonnaliseeMinutes: z
      .number()
      .max(maxMinutes, {
        message: `De 0 à ${maxMinutes} minutes`,
      })
      .nullish(),
  })
  // if duree is 'personnaliser', one of dureePersonnalisee is required
  .refine(
    (data) =>
      data.duree !== dureeAccompagnementPersonnaliseeValue ||
      !!data.dureePersonnaliseeMinutes ||
      !!data.dureePersonnaliseeHeures,
    {
      message: 'Veuillez renseigner une durée personnalisée',
      path: ['duree'],
    },
  )

export type CraDureeData = z.infer<typeof CraDureeValidation>
