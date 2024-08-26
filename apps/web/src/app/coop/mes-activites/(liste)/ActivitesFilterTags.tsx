'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { ReadonlyURLSearchParams } from 'next/dist/client/components/navigation.react-server'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useMemo } from 'react'
import PeriodFilter, {
  PeriodFilterValue,
} from '@app/web/components/filters/PeriodFilter'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import ActiviteTypeFilter from '@app/web/components/filters/ActiviteTypeFilter'
import type { AccompagnementType } from '@app/web/cra/cra'
import BeneficiaireFilter from '@app/web/components/filters/BeneficiaireFilter'
import { BeneficiaireOption } from '@app/web/hooks/useBeneficiaireSearch'

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
  initialBeneficiairesOptions,
}: {
  defaultFilters: ActivitesFilters
  initialBeneficiairesOptions: BeneficiaireOption[]
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
      value === null
        ? {
            du: null,
            au: null,
          }
        : {
            du: value.du,
            au: value.au,
          },
    )
  }
  const onActiviteTypeChange = (type: AccompagnementType | null) => {
    replaceRouteParams({
      type,
    })
  }

  const onBeneficiaireChange = (beneficiaireId: string | null) => {
    replaceRouteParams({
      beneficiaire: beneficiaireId,
    })
  }

  return (
    <div className="fr-flex fr-align-items-start fr-flex-gap-2v ">
      <p className="fr-text--sm fr-text--medium fr-mb-0 fr-mt-1v">
        Filtres&nbsp;:
      </p>
      <div className="fr-flex fr-flex-gap-2v fr-flex-wrap">
        <PeriodFilter onChange={onPeriodChange} defaultValue={defaultPeriod} />
        <ActiviteTypeFilter
          onChange={onActiviteTypeChange}
          defaultValue={defaultFilters.type}
        />
        <BeneficiaireFilter
          onChange={onBeneficiaireChange}
          initialBeneficiairesOptions={initialBeneficiairesOptions}
        />
      </div>
    </div>
  )
}

export default ActivitesFilterTags
