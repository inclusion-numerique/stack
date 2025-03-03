import { TypeActiviteSlug, typeActiviteSlugValues } from '@app/web/cra/cra'
import z from 'zod'

const isoDayRegex = /^\d{4}-\d{2}-\d{2}$/

export const ActivitesFilterValidations = {
  du: z.string().regex(isoDayRegex).optional(),
  au: z.string().regex(isoDayRegex).optional(),
  types: z
    .union([
      z.string().transform((val) => val.split(',').map((id) => id.trim())),
      z.array(z.enum(typeActiviteSlugValues)),
    ])
    .optional(),
  mediateurs: z
    .union([
      z.string().transform((val) => val.split(',').map((id) => id.trim())),
      z.array(z.string().uuid()),
    ])
    .optional(),
  beneficiaires: z
    .union([
      z.string().transform((val) => val.split(',').map((id) => id.trim())),
      z.array(z.string().uuid()),
    ])
    .optional(),
  communes: z
    .union([
      z.string().transform((val) => val.split(',').map((val) => val.trim())),
      z.array(z.string().length(5)),
    ])
    .optional(),
  departements: z
    .union([
      z.string().transform((val) => val.split(',').map((val) => val.trim())),
      z.array(z.string().max(3)),
    ])
    .optional(),
  lieux: z
    .union([
      z.string().transform((val) => val.split(',').map((id) => id.trim())),
      z.array(z.string().uuid()),
    ])
    .optional(),
  conseiller_numerique: z.enum(['0', '1']).optional(),
}

export type ActivitesFilters = {
  du?: string // Iso date e.g. '2022-01-01'
  au?: string // Iso date e.g. '2022-01-01'
  types?: TypeActiviteSlug[]
  mediateurs?: string[] // UUID of mediateurs
  beneficiaires?: string[] // UUID of beneficiaires
  communes?: string[] // Code INSEE des communes
  departements?: string[] // Code INSEE des départements
  lieux?: string[] // UUID des lieux d’activités
  conseiller_numerique?: '0' | '1' // (0 = non, 1 = oui)
}

/**
 * Validate and sanitize search params for activites
 * This is required as some values are used for queries and must be validated
 */
export const validateActivitesFilters = <T extends ActivitesFilters>(
  searchParams: T,
): T => {
  const result = { ...searchParams }

  for (const key of Object.keys(ActivitesFilterValidations)) {
    const typedKey = key as keyof ActivitesFilters
    if (!(typedKey in result)) {
      continue
    }

    const validatedFilterValue = ActivitesFilterValidations[typedKey].safeParse(
      result[typedKey],
    )

    if (
      validatedFilterValue.success &&
      validatedFilterValue.data !== undefined
    ) {
      result[typedKey] = validatedFilterValue.data as
        | (('0' | '1') & TypeActiviteSlug[] & string[])
        | undefined
    } else {
      delete result[typedKey]
    }
  }

  return result
}
