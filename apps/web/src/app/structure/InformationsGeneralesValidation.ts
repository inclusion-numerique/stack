import z from 'zod'
import { AdresseBanValidation } from '@app/web/external-apis/ban/AdresseBanValidation'
import { validateValidSiretDigits } from '@app/web/siret/siretValidation'
import { validateValidRnaDigits } from '@app/web/rna/rnaValidation'

export const InformationsGeneralesValidation = z.object({
  id: z.string().uuid(),
  nom: z.string().trim().min(1, 'Veuillez renseigner le nom de la structure'),
  adresseBan: AdresseBanValidation,
  complementAdresse: z.string().nullish(),
  siret: z
    .string()
    .nullish()
    .refine(
      (value) =>
        !value ||
        validateValidSiretDigits(value) ||
        validateValidRnaDigits(value),
      {
        message: 'Ceci n’est pas un n°SIRET ou RNA valide',
      },
    ),
  rna: z.string().nullish(),
})

export type InformationsGeneralesData = z.infer<
  typeof InformationsGeneralesValidation
>
