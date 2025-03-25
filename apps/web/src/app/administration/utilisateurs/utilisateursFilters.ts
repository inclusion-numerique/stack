import {
  RoleSlug,
  StatutSlug,
  roleSlugs,
  statutSlugs,
} from '@app/web/user/list'
import z from 'zod'

const conseillerNumeriqueValues = ['0', '1'] as const

type ConseillerNumeriqueValue = (typeof conseillerNumeriqueValues)[number]

export const UtiliateursFilterValidations = {
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
  roles: z
    .string()
    .transform((val) => val.split(',').map((role) => role.trim()))
    .pipe(z.array(z.enum(roleSlugs)))
    .or(z.undefined())
    .transform((roles) => roles ?? []),
  statut: z.enum(statutSlugs).optional(),
  conseiller_numerique: z.enum(conseillerNumeriqueValues).optional(),
}

export type UtilisateursFilters = {
  communes?: string[]
  conseiller_numerique?: ConseillerNumeriqueValue
  departements?: string[]
  lieux?: string[]
  statut?: StatutSlug
  roles?: RoleSlug[]
}

export const utilisateursFilters = <T extends UtilisateursFilters>(
  searchParams: T,
): T => {
  const result = { ...searchParams }

  for (const key of Object.keys(UtiliateursFilterValidations)) {
    const typedKey = key as keyof UtilisateursFilters
    if (!(typedKey in result)) {
      continue
    }

    const validatedFilterValue = UtiliateursFilterValidations[
      typedKey
    ].safeParse(result[typedKey])

    if (
      validatedFilterValue.success &&
      validatedFilterValue.data !== undefined
    ) {
      result[typedKey] = validatedFilterValue.data as ConseillerNumeriqueValue &
        StatutSlug &
        RoleSlug[] &
        string[]
    } else {
      delete result[typedKey]
    }
  }

  return result
}
