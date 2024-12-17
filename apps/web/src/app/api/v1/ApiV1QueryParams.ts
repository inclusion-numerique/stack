import type { ZodObject, ZodRawShape } from 'zod'
import { z } from 'zod'

export type ApiV1QueryParamsSchema = ZodObject<ZodRawShape>

// Endpoints with no params must chose this schema
// This allos to throw a 400 error if the query params are not empty
export const NoQueryParamsValidation = z.object({})

export type NoQueryParamsValidationType = typeof NoQueryParamsValidation
