import type { SelectOption } from '@app/ui/components/Form/utils/options'
import type { BeneficiaireOption } from '@app/web/beneficiaire/BeneficiaireOption'
import { LieuFilterType } from '@app/web/components/filters/LieuFilter'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { typeActiviteSlugLabels } from '@app/web/cra/cra'
import type { MediateurOption } from '@app/web/mediateurs/MediateurOption'
import { dateAsDay } from '@app/web/utils/dateAsDay'

export type FilterType =
  | 'lieux'
  | 'communes'
  | 'departements'
  | 'beneficiaires'
  | 'mediateurs'
  | 'periode'
  | 'types'
  | 'conseiller_numerique'

export const locationTypeLabels: {
  [key in LieuFilterType]: string
} = {
  lieu: 'Lieu d’activité',
  commune: 'Commune',
  departement: 'Département',
}

export const generateActivitesPeriodeFilterLabel = ({
  au,
  du,
}: {
  au: string
  du: string
}) => ({
  label: `${dateAsDay(new Date(du))} - ${dateAsDay(new Date(au))}`,
  key: ['du', 'au'],
  type: 'periode' as const,
})

const generateBeneficiaireFilterLabel = (
  { beneficiaires = [] }: Pick<ActivitesFilters, 'beneficiaires'>,
  { beneficiairesOptions = [] }: { beneficiairesOptions: BeneficiaireOption[] },
) =>
  beneficiairesOptions
    .filter(({ value }) => value?.id && beneficiaires.includes(value.id))
    .map(({ label, value }) => ({
      label,
      key: value?.id,
      type: 'beneficiaires' as const,
    }))

const generateMediateurFilterLabel = (
  { mediateurs = [] }: Pick<ActivitesFilters, 'mediateurs'>,
  { mediateursOptions = [] }: { mediateursOptions: MediateurOption[] },
) =>
  mediateursOptions
    .filter(
      ({ value }) =>
        value?.mediateurId && mediateurs.includes(value.mediateurId),
    )
    .map(({ label, value }) => ({
      label,
      key: value?.mediateurId,
      type: 'mediateurs' as const,
    }))

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

export const generateActivitesFiltersLabels = (
  {
    beneficiaires,
    mediateurs,
    types,
    conseiller_numerique,
    departements,
    communes,
    lieux,
    au,
    du,
  }: ActivitesFilters,
  {
    beneficiairesOptions,
    mediateursOptions,
    communesOptions,
    departementsOptions,
    lieuxActiviteOptions,
  }: {
    beneficiairesOptions: BeneficiaireOption[]
    mediateursOptions: MediateurOption[]
    communesOptions: SelectOption[]
    lieuxActiviteOptions: SelectOption[]
    departementsOptions: SelectOption[]
  },
) => {
  const periode =
    du && au
      ? generateActivitesPeriodeFilterLabel({
          du,
          au,
        })
      : null

  const typesLabel = types
    ? types.map((type) => ({
        label: typeActiviteSlugLabels[type],
        key: type,
        type: 'types' as const,
      }))
    : []

  const roleLabel = conseiller_numerique
    ? {
        label:
          conseiller_numerique === '1'
            ? 'Conseiller numérique'
            : 'Médiateur numérique',
        key: conseiller_numerique,
        type: 'conseiller_numerique' as const,
      }
    : null

  const beneficiairesLabels = generateBeneficiaireFilterLabel(
    { beneficiaires },
    { beneficiairesOptions },
  )

  const mediateursLabels = generateMediateurFilterLabel(
    { mediateurs },
    { mediateursOptions },
  )

  const lieuxLabels = generateLieuxLabels(
    { communes, departements, lieux },
    { communesOptions, departementsOptions, lieuxActiviteOptions },
  )

  return [
    ...mediateursLabels,
    ...(roleLabel == null ? [] : [roleLabel]),
    ...(periode == null ? [] : [periode]),
    ...lieuxLabels,
    ...typesLabel,
    ...beneficiairesLabels,
  ]
}

const labelPrefixes: Record<string, string> = {
  communes: 'Commune : ',
  departements: 'Département : ',
  lieux: 'Lieu d’activité : ',
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
  typeof generateActivitesFiltersLabels
>
