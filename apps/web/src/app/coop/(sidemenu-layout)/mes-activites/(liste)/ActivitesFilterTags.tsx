'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { ReadonlyURLSearchParams } from 'next/dist/client/components/navigation.react-server'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useMemo } from 'react'
import type { SelectOption } from '@app/ui/components/Form/utils/options'
import classNames from 'classnames'
import PeriodFilter, {
  PeriodFilterValue,
} from '@app/web/components/filters/PeriodFilter'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import ActiviteTypeFilter from '@app/web/components/filters/ActiviteTypeFilter'
import BeneficiaireFilter from '@app/web/components/filters/BeneficiaireFilter'
import type { BeneficiaireOption } from '@app/web/beneficiaire/BeneficiaireOption'
import LocationFilter, {
  LocationFilterValue,
} from '@app/web/components/filters/LocationFilter'
import { TypeActiviteSlug } from '@app/web/cra/cra'
import MediateurFilter from '@app/web/components/filters/MediateurFilter'
import { MediateurOption } from '@app/web/mediateurs/MediateurOption'

// Allows to replace the current route with new query params
const replaceRouteWithNewParams = ({
  pathname,
  searchParams,
  newParams,
  router,
}: {
  searchParams: ReadonlyURLSearchParams
  pathname: string
  newParams: Record<string, string | null>
  router: AppRouterInstance
}) => {
  const newSearchParams = new URLSearchParams(searchParams.toString())

  for (const [key, value] of Object.entries(newParams)) {
    if (value === null) {
      newSearchParams.delete(key)
    } else {
      newSearchParams.set(key, value)
    }
  }

  // We always return to page 1 when changing filters
  newSearchParams.delete('page')

  router.replace(`${pathname}?${newSearchParams.toString()}`, {
    scroll: false,
  })
}

const createRouteParamsReplacer =
  ({
    pathname,
    searchParams,
    router,
  }: {
    searchParams: ReadonlyURLSearchParams
    pathname: string
    router: AppRouterInstance
  }) =>
  (newParams: Record<string, string | null>) =>
    replaceRouteWithNewParams({
      pathname,
      searchParams,
      newParams,
      router,
    })

const ActivitesFilterTags = ({
  defaultFilters,
  initialMediateursOptions,
  initialBeneficiairesOptions,
  communesOptions,
  departementsOptions,
  lieuxActiviteOptions,
  isCoordinateur,
  isMediateur,
  beneficiairesFilter = true,
  minDate,
  className,
}: {
  defaultFilters: ActivitesFilters
  initialMediateursOptions: MediateurOption[]
  initialBeneficiairesOptions: BeneficiaireOption[]
  communesOptions: SelectOption[]
  lieuxActiviteOptions: SelectOption[]
  departementsOptions: SelectOption[]
  isCoordinateur: boolean
  isMediateur: boolean
  beneficiairesFilter?: boolean // display beneficiaire filters. defaults to true
  minDate?: Date
  className?: string
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const replaceRouteParams = useMemo(
    () =>
      createRouteParamsReplacer({
        router,
        searchParams,
        pathname,
      }),
    [router, searchParams, pathname],
  )

  const defaultPeriod =
    defaultFilters.au && defaultFilters.du
      ? {
          du: defaultFilters.du,
          au: defaultFilters.au,
        }
      : undefined

  const onPeriodChange = (value: PeriodFilterValue | null) => {
    replaceRouteParams(
      value === null ? { du: null, au: null } : { du: value.du, au: value.au },
    )
  }
  const onActiviteTypeChange = (type: TypeActiviteSlug | null) => {
    replaceRouteParams({ type })
  }

  const onBeneficiaireChange = (beneficiaireId: string | null) => {
    replaceRouteParams({ beneficiaire: beneficiaireId })
  }

  const onMediateurChange = (mediateurId: string | null) => {
    replaceRouteParams({ mediateur: mediateurId })
  }

  const defaultLocation: LocationFilterValue | undefined = defaultFilters.lieu
    ? {
        type: 'lieu',
        value: defaultFilters.lieu,
      }
    : defaultFilters.commune
      ? {
          type: 'commune',
          value: defaultFilters.commune,
        }
      : defaultFilters.departement
        ? {
            type: 'departement',
            value: defaultFilters.departement,
          }
        : undefined

  const onLocationChange = (location: LocationFilterValue | null) => {
    const newLocationParams: {
      lieu: null | string
      commune: null | string
      departement: null | string
    } = {
      lieu: null,
      commune: null,
      departement: null,
    }
    if (!location) {
      replaceRouteParams(newLocationParams)
      return
    }

    if (location.type === 'lieu') {
      newLocationParams.lieu = location.value
    }

    if (location.type === 'commune') {
      newLocationParams.commune = location.value
    }

    if (location.type === 'departement') {
      newLocationParams.departement = location.value
    }

    replaceRouteParams(newLocationParams)
  }

  return (
    <div
      className={classNames(
        'fr-flex fr-align-items-start fr-flex-gap-2v',
        className,
      )}
    >
      <p className="fr-text--sm fr-text--medium fr-mb-0 fr-mt-1v">
        Filtres&nbsp;:
      </p>
      <div className="fr-flex fr-flex-gap-2v fr-flex-wrap">
        {isCoordinateur && (
          <MediateurFilter
            onChange={onMediateurChange}
            initialMediateursOptions={initialMediateursOptions}
            defaultValue={defaultFilters.mediateur}
          />
        )}
        <PeriodFilter
          onChange={onPeriodChange}
          minDate={minDate ?? new Date()}
          defaultValue={defaultPeriod}
        />
        <LocationFilter
          onChange={onLocationChange}
          defaultValue={defaultLocation}
          lieuxActiviteOptions={lieuxActiviteOptions}
          communesOptions={communesOptions}
          departementsOptions={departementsOptions}
        />
        <ActiviteTypeFilter
          onChange={onActiviteTypeChange}
          defaultValue={defaultFilters.type}
        />
        {isMediateur && beneficiairesFilter && (
          <BeneficiaireFilter
            onChange={onBeneficiaireChange}
            initialBeneficiairesOptions={initialBeneficiairesOptions}
            defaultValue={defaultFilters.beneficiaire}
          />
        )}
      </div>
    </div>
  )
}

export default ActivitesFilterTags
