import z from 'zod'
import { TypeActiviteSlug, typeActiviteSlugValues } from '@app/web/cra/cra'

const isoDayRegex = /^\d{4}-\d{2}-\d{2}$/

export const ActivitesFilterValidations = {
  du: z.string().regex(isoDayRegex).optional(),
  au: z.string().regex(isoDayRegex).optional(),
  type: z.enum(typeActiviteSlugValues).optional(),
  mediateur: z.string().uuid().optional(),
  beneficiaire: z.string().uuid().optional(),
  commune: z.string().length(5).optional(),
  departement: z.string().max(3).optional(),
  lieu: z.string().uuid().optional(),
  conseiller_numerique: z.enum(['0', '1']).optional(),
}

export type ActivitesFilters = {
  du?: string // Iso date e.g. '2022-01-01'
  au?: string // Iso date e.g. '2022-01-01'
  type?: TypeActiviteSlug
  mediateur?: string // UUID of mediateur
  beneficiaire?: string // UUID of beneficiaire
  commune?: string // Code INSEE of commune
  departement?: string // Code département
  lieu?: string // UUID du lieu d’activité
  conseiller_numerique?: string // '0' or '1' (0 = non, 1 = oui)
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
      result[typedKey] = validatedFilterValue.data as TypeActiviteSlug
    } else {
      delete result[typedKey]
    }
  }

  return result
}
