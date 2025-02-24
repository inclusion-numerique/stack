import type { SelectOption } from '@app/ui/components/Form/utils/options'
import type { BeneficiaireOption } from '@app/web/beneficiaire/BeneficiaireOption'
import type { LocationFilterType } from '@app/web/components/filters/LocationFilter'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { profilSlugLabels, typeActiviteSlugLabels } from '@app/web/cra/cra'
import type { MediateurOption } from '@app/web/mediateurs/MediateurOption'
import { dateAsDay } from '@app/web/utils/dateAsDay'

export const locationTypeLabels: {
  [key in LocationFilterType]: string
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
}) => `${dateAsDay(new Date(du))} - ${dateAsDay(new Date(au))}`

export const generateActivitesLocationTypeFilterLabel = ({
  commune,
  departement,
  lieu,
}: Pick<ActivitesFilters, 'commune' | 'departement' | 'lieu'>) => {
  if (commune) {
    return locationTypeLabels.commune
  }
  if (departement) {
    return locationTypeLabels.departement
  }
  if (lieu) {
    return locationTypeLabels.lieu
  }
  return null
}

export const generateActivitesLocationNameFilterLabel = (
  {
    commune,
    departement,
    lieu,
  }: Pick<ActivitesFilters, 'commune' | 'departement' | 'lieu'>,
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
  if (commune) {
    return (
      communesOptions.find((option) => option.value === commune)?.label ?? null
    )
  }
  if (departement) {
    return (
      departementsOptions.find((option) => option.value === departement)
        ?.label ?? null
    )
  }
  if (lieu) {
    return (
      lieuxActiviteOptions.find((option) => option.value === lieu)?.label ??
      null
    )
  }
  return null
}

const generateBeneficiaireFilterLabel = (
  { beneficiaire }: Pick<ActivitesFilters, 'beneficiaire'>,
  { beneficiairesOptions }: { beneficiairesOptions: BeneficiaireOption[] },
) => {
  if (!beneficiaire) {
    return null
  }

  return (
    beneficiairesOptions.find((option) => option.value?.id === beneficiaire)
      ?.label ?? null
  )
}

const generateMediateurFilterLabel = (
  { mediateur }: Pick<ActivitesFilters, 'mediateur'>,
  { mediateursOptions = [] }: { mediateursOptions: MediateurOption[] },
) => {
  if (!mediateur) return null

  return (
    mediateursOptions.find((option) => option.value?.mediateurId === mediateur)
      ?.label ?? null
  )
}

export const generateActivitesFiltersLabels = (
  {
    beneficiaire,
    mediateur,
    type,
    profil,
    departement,
    commune,
    lieu,
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

  const typeLabel = type ? typeActiviteSlugLabels[type] : null
  const profilLabel = profil ? profilSlugLabels[profil] : null

  const beneficiaireLabel = generateBeneficiaireFilterLabel(
    { beneficiaire },
    { beneficiairesOptions },
  )

  const mediateurLabel = generateMediateurFilterLabel(
    { mediateur },
    { mediateursOptions },
  )

  const typeLieu = generateActivitesLocationTypeFilterLabel({
    commune,
    departement,
    lieu,
  })

  const nomLieu = generateActivitesLocationNameFilterLabel(
    {
      commune,
      departement,
      lieu,
    },
    { departementsOptions, communesOptions, lieuxActiviteOptions },
  )

  const lieuFull = typeLieu ? `${typeLieu} : ${nomLieu}` : null

  return {
    du: du ? dateAsDay(new Date(du)) : null,
    au: au ? dateAsDay(new Date(au)) : null,
    periode,
    type: typeLabel,
    profil: profilLabel,
    mediateur: mediateurLabel,
    beneficiaire: beneficiaireLabel,
    typeLieu,
    nomLieu,
    lieu: lieuFull,
  }
}

export type ActivitesFiltersLabels = ReturnType<
  typeof generateActivitesFiltersLabels
>
