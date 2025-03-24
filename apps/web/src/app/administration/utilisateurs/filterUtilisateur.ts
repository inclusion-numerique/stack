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

const isUser = ({ roles }: { roles: RoleSlug[] }) =>
  roles.includes('mediateur') ||
  roles.includes('coordinateur') ||
  roles.includes('conseiller-numerique')

const isAdmin = ({ roles }: { roles: RoleSlug[] }) =>
  roles.includes('administrateur')

const isMediateur = ({ roles }: { roles: RoleSlug[] }) =>
  roles.includes('mediateur')

const isConum = ({ roles }: { roles: RoleSlug[] }) =>
  roles.includes('conseiller-numerique')

const isCoord = ({ roles }: { roles: RoleSlug[] }) =>
  roles.includes('coordinateur')

export const filterOnRoles = (queryParams?: {
  roles: RoleSlug[]
}): {} | { role: Prisma.UserWhereInput } =>
  queryParams == null || queryParams.roles.length === 0
    ? {}
    : {
        role: {
          in: [
            ...(isAdmin(queryParams) ? ['Admin'] : []),
            ...(isUser(queryParams) ? ['User'] : []),
          ],
        },
        ...(isMediateur(queryParams) ? { mediateur: { isNot: null } } : {}),
        ...(isConum(queryParams)
          ? { mediateur: { conseillerNumerique: { isNot: null } } }
          : {}),
        ...(isCoord(queryParams) ? { coordinateur: { isNot: null } } : {}),
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
