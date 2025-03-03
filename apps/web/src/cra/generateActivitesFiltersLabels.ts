import type { SelectOption } from '@app/ui/components/Form/utils/options'
import type { BeneficiaireOption } from '@app/web/beneficiaire/BeneficiaireOption'
import { LieuFilterType } from '@app/web/components/filters/LieuFilter'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { profilSlugLabels, typeActiviteSlugLabels } from '@app/web/cra/cra'
import type { MediateurOption } from '@app/web/mediateurs/MediateurOption'
import { dateAsDay } from '@app/web/utils/dateAsDay'

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
  type: 'periode',
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
      type: 'beneficiaires',
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
      type: 'mediateurs',
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
    .map(({ label, value }) => ({ label, key: value, type: 'lieux' })),
  ...communesOptions
    .filter(({ value }) => communes?.includes(value))
    .map(({ label, value }) => ({ label, key: value, type: 'communes' })),
  ...departementsOptions
    .filter(({ value }) => departements?.includes(value))
    .map(({ label, value }) => ({ label, key: value, type: 'departements' })),
]

export const generateActivitesFiltersLabels = (
  {
    beneficiaires,
    mediateurs,
    types,
    profil,
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
        type: 'types',
      }))
    : []

  const profilLabel = profil
    ? {
        label: profilSlugLabels[profil],
        key: profil,
        type: 'profil',
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
    ...(profilLabel == null ? [] : [profilLabel]),
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
  type: string
  key?: string[] | string | null
}) => ({
  label: labelPrefixes[type] ? `${labelPrefixes[type]}${label}` : label,
  type,
  key,
})

export type ActivitesFiltersLabels = ReturnType<
  typeof generateActivitesFiltersLabels
>
