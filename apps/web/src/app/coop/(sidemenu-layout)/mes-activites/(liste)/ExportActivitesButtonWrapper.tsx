import type { SelectOption } from '@app/ui/components/Form/utils/options'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import type { BeneficiaireOption } from '@app/web/beneficiaire/BeneficiaireOption'
import type { MediateurOption } from '@app/web/mediateurs/MediateurOption'
import { generateActivitesFiltersLabels } from '@app/web/cra/generateActivitesFiltersLabels'
import ExportActivitesButton from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/ExportActivitesButton'
import ExportActivitesDisabledButton from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/ExportActivitesDisabledButton'
import type { LieuActiviteOption } from '@app/web/app/lieu-activite/getLieuxActiviteOptions'

const ExportActivitesButtonWrapper = async ({
  lieuxActiviteOptions,
  beneficiairesOptions,
  mediateursOptions,
  departementsOptions,
  communesOptions,
  filters,
  searchResultMatchesCount,
}: {
  filters: ActivitesFilters
  beneficiairesOptions: BeneficiaireOption[]
  mediateursOptions: MediateurOption[]
  communesOptions: SelectOption[]
  lieuxActiviteOptions: LieuActiviteOption[]
  departementsOptions: SelectOption[]
  searchResultMatchesCount: Promise<number>
}) => {
  const filterLabels = generateActivitesFiltersLabels(filters, {
    communesOptions,
    departementsOptions,
    lieuxActiviteOptions,
    beneficiairesOptions,
    mediateursOptions,
  })

  const matchesCount = await searchResultMatchesCount

  if (matchesCount > 0) {
    return (
      <ExportActivitesButton
        filters={filters}
        filterLabels={filterLabels}
        matchesCount={matchesCount}
      />
    )
  }

  return <ExportActivitesDisabledButton />
}

export default ExportActivitesButtonWrapper
