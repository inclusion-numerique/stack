import { RoleSlug, StatutSlug } from '@app/web/user/list'
import type { Prisma } from '@prisma/client'

type StatutFilters = {
  inscriptionValidee?: { not: null } | null
  deleted?: { not: null }
}

const statutFiltersMap: Map<StatutSlug, StatutFilters> = new Map([
  ['inscrit', { inscriptionValidee: { not: null } }],
  ['inscription', { inscriptionValidee: null }],
  ['deleted', { deleted: { not: null } }],
])

export const filterOnStatut = (queryParams?: {
  statut?: StatutSlug
}): {} | { statut: Prisma.UserWhereInput } =>
  queryParams?.statut == null
    ? {}
    : (statutFiltersMap.get(queryParams.statut) ?? {})

const roleFilter: Record<
  RoleSlug,
  {
    role: 'User' | 'Admin'
    coordinateur?: { isNot: null } | null
    mediateur?: { isNot: null } | null
  }
> = {
  mediateur: { role: 'User', coordinateur: null, mediateur: { isNot: null } },
  coordinateur: { role: 'User', coordinateur: { isNot: null } },
  administrateur: { role: 'Admin' },
}

export const filterOnRoles = (queryParams?: {
  roles: RoleSlug[]
}): {} | { role: Prisma.UserWhereInput } => {
  if (queryParams == null || queryParams.roles.length === 0) return {}

  const roleFilters = queryParams.roles.map((role) => roleFilter[role])

  if (roleFilters.length === 1) return roleFilters[0]

  return {
    OR: roleFilters,
  }
}

const horsDispositifFilter: Record<
  Exclude<RoleSlug, 'administrateur'>,
  {
    mediateur?: { conseillerNumerique: null }
    coordinateur?: { conseillerNumeriqueId: null }
  }
> = {
  mediateur: { mediateur: { conseillerNumerique: null } },
  coordinateur: { coordinateur: { conseillerNumeriqueId: null } },
}

const conseillerNumeriqueFilter: Record<
  Exclude<RoleSlug, 'administrateur'>,
  {
    mediateur?: { conseillerNumerique: { isNot: null } }
    coordinateur?: { conseillerNumeriqueId: { not: null } }
  }
> = {
  mediateur: { mediateur: { conseillerNumerique: { isNot: null } } },
  coordinateur: { coordinateur: { conseillerNumeriqueId: { not: null } } },
}

const onlyUsers = (
  role: RoleSlug,
): role is Exclude<RoleSlug, 'administrateur'> => role !== 'administrateur'

export const filterOnDispositif = (queryParams?: {
  conseiller_numerique?: '0' | '1'
  roles: RoleSlug[]
}): {} | { dispositif: Prisma.UserWhereInput } => {
  if (queryParams?.conseiller_numerique == null) return {}

  if (queryParams.conseiller_numerique === '0') {
    const filters = queryParams.roles
      .filter(onlyUsers)
      .map((role) => horsDispositifFilter[role])
    return filters.length === 1
      ? filters[0]
      : { OR: Object.values(horsDispositifFilter) }
  }

  const filters = queryParams.roles
    .filter(onlyUsers)
    .map((role) => conseillerNumeriqueFilter[role])
  return filters.length === 1
    ? filters[0]
    : { OR: Object.values(conseillerNumeriqueFilter) }
}

const canFilterOnLieux = ({
  lieux,
  departements,
  communes,
}: {
  lieux?: string[]
  departements?: string[]
  communes?: string[]
}) =>
  lieux?.length === 0 && departements?.length === 0 && communes?.length === 0

const hasLieuxFilter = ({ lieux }: { lieux?: string[] }) =>
  lieux != null && lieux.length > 0

const hasDepartementsFilter = (queryParams: {
  departements?: string[]
}): queryParams is { departements: string[] } =>
  queryParams.departements != null && queryParams.departements.length > 0

const hasComunesFilter = ({ communes }: { communes?: string[] }) =>
  communes != null && communes.length > 0

export const filterOnLieux = (queryParams?: {
  lieux?: string[]
  departements?: string[]
  communes?: string[]
}) =>
  queryParams == null || canFilterOnLieux(queryParams)
    ? {}
    : {
        emplois: {
          some: {
            structure: {
              ...(hasLieuxFilter(queryParams)
                ? { id: { in: queryParams.lieux } }
                : {}),
              ...(hasDepartementsFilter(queryParams)
                ? {
                    OR: queryParams.departements.map((departement) => ({
                      codeInsee: { startsWith: departement },
                    })),
                  }
                : {}),
              ...(hasComunesFilter(queryParams)
                ? { codeInsee: { in: queryParams.communes } }
                : {}),
            },
          },
        },
      }
