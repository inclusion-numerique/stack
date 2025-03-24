import type { SelectOption } from '@app/ui/components/Form/utils/options'
import { roleSlugLabels, statutSlugLabels } from '@app/web/user/list'
import { UtilisateursFilters } from './utilisateursFilters'

export type FilterType =
  | 'lieux'
  | 'communes'
  | 'departements'
  | 'statut'
  | 'roles'

const generateLieuxLabels = (
  {
    communes = [],
    departements = [],
    lieux = [],
  }: {
    communes?: string[]
    departements?: string[]
    lieux?: string[]
  },
  {
    communesOptions = [],
    departementsOptions = [],
    lieuxActiviteOptions = [],
  }: {
    communesOptions: SelectOption<string>[]
    departementsOptions: SelectOption<string>[]
    lieuxActiviteOptions: SelectOption<string>[]
  },
) => [
  ...lieuxActiviteOptions
    .filter(({ value }) => lieux?.includes(value))
    .map(({ label, value }) => ({ label, key: value, type: 'lieux' as const })),
  ...communesOptions
    .filter(({ value }) => communes?.includes(value))
    .map(({ label, value }) => ({
      label,
      key: value,
      type: 'communes' as const,
    })),
  ...departementsOptions
    .filter(({ value }) => departements?.includes(value))
    .map(({ label, value }) => ({
      label,
      key: value,
      type: 'departements' as const,
    })),
]

export const generateUtilisateursFiltersLabels = (
  { statut, roles, departements, communes, lieux }: UtilisateursFilters,
  {
    communesOptions,
    departementsOptions,
    lieuxActiviteOptions,
  }: {
    communesOptions: SelectOption[]
    lieuxActiviteOptions: SelectOption[]
    departementsOptions: SelectOption[]
  },
) => {
  const rolesLabel = roles
    ? roles.map((role) => ({
        label: roleSlugLabels[role],
        key: role,
        type: 'roles' as const,
      }))
    : []

  const statutLabel = statut
    ? {
        label: statutSlugLabels[statut],
        key: statut,
        type: 'statut' as const,
      }
    : null

  const lieuxLabels = generateLieuxLabels(
    { communes, departements, lieux },
    { communesOptions, departementsOptions, lieuxActiviteOptions },
  )

  return [
    ...rolesLabel,
    ...(statutLabel == null ? [] : [statutLabel]),
    ...lieuxLabels,
  ]
}

const labelPrefixes: Record<string, string> = {
  communes: 'Commune : ',
  departements: 'Département : ',
  lieux: 'Structure : ',
}

export const toLieuPrefix = ({
  label,
  type,
  key,
}: {
  label: string
  type: FilterType
  key?: string[] | string | null
}) => ({
  label: labelPrefixes[type] ? `${labelPrefixes[type]}${label}` : label,
  type,
  key,
})

export type ActivitesFiltersLabels = ReturnType<
  typeof generateUtilisateursFiltersLabels
>
