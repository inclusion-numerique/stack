import z from 'zod'
import { apiClientScopeValues } from '@app/web/app/administration/clients-api/apiClient'

// Represents an object returned by the BAN API
export const ClientApiValidation = z.object({
  id: z.string().uuid().nullish(), // set if update, not set if create
  name: z.string({
    required_error: 'Veuillez renseigner un nom',
  }),
  validFrom: z
    .string({
      required_error: 'Veuillez renseigner une date de début de validité',
    })
    .date('Veuillez renseigner une date valide'),
  validUntil: z.string().date('Veuillez renseigner une date valide').nullish(),
  scopes: z
    .array(
      z.enum(apiClientScopeValues, {
        invalid_type_error: 'Veuillez renseigner un scope valide',
      }),
      {
        required_error: 'Veuillez renseigner au moins un scope',
      },
    )
    .min(1, 'Veuillez renseigner au moins un scope'),
})

export type ClientApiData = z.infer<typeof ClientApiValidation>
