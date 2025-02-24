import { ActivitesFilterValidations } from '@app/web/cra/ActivitesFilters'
import z from 'zod'

export const ApiV1StatistiquesQueryParamsValidation = z.object({
  filter: z.object({ ...ActivitesFilterValidations }).default({}),
})

export type ApiV1StatistiquesQueryParams = z.infer<
  typeof ApiV1StatistiquesQueryParamsValidation
>
