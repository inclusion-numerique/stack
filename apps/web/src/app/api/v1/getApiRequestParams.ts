import type { NextRequest } from 'next/server'
import type { infer as ZodInfer, ZodError } from 'zod'
import { transformJsonApiQueryParamsToObject } from '@app/web/app/api/v1/transformJsonApiQueryParamsToObject'
import type { ApiV1QueryParamsSchema } from '@app/web/app/api/v1/ApiV1QueryParams'

export const getApiRequestParams = <
  QueryParamsSchema extends ApiV1QueryParamsSchema = ApiV1QueryParamsSchema,
>(
  request: NextRequest,
  queryParamsValidation: QueryParamsSchema,
):
  | { success: true; params: ZodInfer<QueryParamsSchema>; error?: undefined }
  | {
      success: false
      error: ZodError
      params?: undefined
    } => {
  const { searchParams } = request.nextUrl

  const queryParams = transformJsonApiQueryParamsToObject(searchParams)

  const parsed = queryParamsValidation.strict().safeParse(queryParams)

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error,
    }
  }

  return {
    success: true,
    params: parsed.data as unknown as ZodInfer<QueryParamsSchema>,
  }
}
