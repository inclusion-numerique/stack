'use client'

import type { SelectOption } from '@app/ui/components/Form/utils/options'
import type { LieuActiviteOption } from '@app/web/app/lieu-activite/getLieuxActiviteOptions'
import type { BeneficiaireOption } from '@app/web/beneficiaire/BeneficiaireOption'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { generateActivitesFiltersLabels } from '@app/web/cra/generateActivitesFiltersLabels'
import { MediateurOption } from '@app/web/mediateurs/MediateurOption'
import Button from '@codegouvfr/react-dsfr/Button'
import Tag from '@codegouvfr/react-dsfr/Tag'
import { useRouter, useSearchParams } from 'next/navigation'

export const FilterTags = ({
  filters,
  lieuxActiviteOptions,
  mediateursOptions,
  beneficiairesOptions,
  departementsOptions,
  communesOptions,
}: {
  filters: ActivitesFilters
  mediateursOptions: MediateurOption[]
  beneficiairesOptions: BeneficiaireOption[]
  lieuxActiviteOptions: LieuActiviteOption[]
  departementsOptions: SelectOption[]
  communesOptions: SelectOption[]
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const filterLabelsToDisplay = generateActivitesFiltersLabels(filters, {
    communesOptions,
    departementsOptions,
    lieuxActiviteOptions,
    beneficiairesOptions,
    mediateursOptions,
  })

  const handleRemoveFilter = (key: string, value: string | string[]) => {
    if (Array.isArray(value)) {
      for (const param of value) params.delete(param)
      return router.replace(`?${params}`, { scroll: false })
    }

    const updatedValues = (params.get(key)?.split(',') ?? []).filter(
      (v) => v !== value,
    )

    if (updatedValues.length > 0) {
      params.set(key, updatedValues.join(','))
    } else {
      params.delete(key)
    }

    router.replace(`?${params}`, { scroll: false })
  }

  const handleClearFilters = () => {
    router.replace('?', { scroll: false })
  }

  return (
    filterLabelsToDisplay.length > 0 && (
      <>
        <div className="fr-flex fr-justify-content-space-between fr-mb-2v">
          <ul className="fr-tags-group">
            {filterLabelsToDisplay.map((filter) => (
              <li
                className="fr-line-height-1"
                key={`${filter.type}-${filter.key}`}
              >
                <Tag
                  className="fr-pr-3v"
                  small
                  nativeButtonProps={{
                    type: 'button',
                    onClick: () =>
                      handleRemoveFilter(filter.type, filter.key ?? []),
                  }}
                >
                  <span className="fr-icon-close-line fr-icon--xs" />
                  &nbsp;{filter.label}
                </Tag>
              </li>
            ))}
          </ul>
          <div>
            <Button priority="tertiary no outline" onClick={handleClearFilters}>
              <span className="ri-close-circle-line" aria-hidden={true} />
              &nbsp;Effacer&nbsp;les&nbsp;filtres
            </Button>
          </div>
        </div>
        <hr className="fr-mt-4v fr-pb-3v" />
      </>
    )
  )
}
