import { type NextRequest, NextResponse } from 'next/server'
import type { ApiClientScope } from '@prisma/client'
import type { infer as ZodInfer } from 'zod'
import { isAuthenticatedApiClientRequest } from '@app/web/app/api/v1/isAuthenticatedApiClientRequest'
import { getApiRequestParams } from '@app/web/app/api/v1/getApiRequestParams'
import {
  ApiV1QueryParamsSchema,
  NoQueryParamsValidation,
  NoQueryParamsValidationType,
} from '@app/web/app/api/v1/ApiV1QueryParams'

/**
 * Config to create a safe (Scopes and validate query params) API route
 */
export type ApiRouteConfig = {
  scopes: ApiClientScope[]
}

/**
 * This is the type of the handler function that will be called with the query
 */
export type ApiRouteHandler<
  ResponseType,
  QueryParamsSchema extends ApiV1QueryParamsSchema,
> = (context: {
  request: NextRequest
  params: ZodInfer<QueryParamsSchema>
}) => Promise<NextResponse<ResponseType>>

export const createHandlerWithValidation =
  <ResponseType, QueryParamsSchema extends ApiV1QueryParamsSchema>({
    queryParamsSchema,
    scopes,
  }: ApiRouteConfig & {
    queryParamsSchema: QueryParamsSchema
  }) =>
  (handler: ApiRouteHandler<ResponseType, QueryParamsSchema>) =>
  async (request: NextRequest) => {
    const isAuthenticated = await isAuthenticatedApiClientRequest(
      request,
      scopes,
    )
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const parsedParams = getApiRequestParams(request, queryParamsSchema)

    if (!parsedParams.success) {
      return NextResponse.json({ error: parsedParams.error }, { status: 400 })
    }

    return handler({ request, params: parsedParams.params })
  }

/**
 * Allow to create a safe api route with function chaining
 *
 * e.g. for a GET route without query params:
 * createApiV1Route.configure({ scopes: ['Cras'] }).handle(async (context) => {
 *   return NextResponse.json({ status: 'ok' })
 * })
 *
 * e.g. for a GET route with query params:
 * createApiV1Route.configure({ scopes: ['Cras'] })
 *   .queryParams(YourQueryParamsSchema)
 *   .handle(async ({params}) => {
 *     return NextResponse.json({ yourQueryParams: params })
 *   })
 */
export const createApiV1Route = {
  configure: <ResponseType>(config: ApiRouteConfig) => ({
    // Handler with query params validation
    queryParams: <QueryParamsSchema extends ApiV1QueryParamsSchema>(
      queryParamsSchema: QueryParamsSchema,
    ) => ({
      handle: createHandlerWithValidation<ResponseType, QueryParamsSchema>({
        ...config,
        queryParamsSchema,
      }),
    }),
    // Handler without any query params
    handle: createHandlerWithValidation<
      ResponseType,
      NoQueryParamsValidationType
    >({
      ...config,
      queryParamsSchema: NoQueryParamsValidation,
    }),
  }),

  // configure: <QueryParamsSchema extends ApiV1QueryParamsSchema>(
  //   config: ApiRouteConfig<QueryParamsSchema>,
  // ): {
  //   handle: <ResponseType>(
  //     handler: ApiRouteHandler<ResponseType, QueryParamsSchema>,
  //   ) => void
  // } => ({
  //   handle: createHandlerWithValidation<ResponseType, QueryParamsSchema>(
  //     config,
  //   ) as <ResponseType>(
  //     handler: ApiRouteHandler<ResponseType, QueryParamsSchema>,
  //   ) => void,
  // }),
}
