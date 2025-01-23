import z from 'zod'
import { ActivitesFilterValidations } from '@app/web/cra/ActivitesFilters'

export const ApiV1StatistiquesQueryParamsValidation = z.object({
  ...ActivitesFilterValidations,
})

export type ApiV1StatistiquesQueryParams = z.infer<
  typeof ApiV1StatistiquesQueryParamsValidation
>
