import type { SelectOption } from '@app/ui/components/Form/utils/options'
import ActivitesFilterTags from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/ActivitesFilterTags'
import ExportActivitesButtonWrapper from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/ExportActivitesButtonWrapper'
import ExportActivitesDisabledButton from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/ExportActivitesDisabledButton'
import type { ActiviteDates } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getFirstAndLastActiviteDate'
import type { LieuActiviteOption } from '@app/web/app/lieu-activite/getLieuxActiviteOptions'
import type { BeneficiaireOption } from '@app/web/beneficiaire/BeneficiaireOption'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import type { MediateurOption } from '@app/web/mediateurs/MediateurOption'
import classNames from 'classnames'
import { Suspense } from 'react'

const MesActivitesListeHeader = ({
  className,
  communesOptions,
  defaultFilters,
  departementsOptions,
  initialMediateursOptions,
  initialBeneficiairesOptions,
  lieuxActiviteOptions,
  searchResultMatchesCount,
  activiteDates,
}: {
  defaultFilters: ActivitesFilters
  initialMediateursOptions: MediateurOption[]
  initialBeneficiairesOptions: BeneficiaireOption[]
  communesOptions: SelectOption[]
  lieuxActiviteOptions: LieuActiviteOption[]
  departementsOptions: SelectOption[]
  activiteDates: ActiviteDates
  className?: string
  searchResultMatchesCount: Promise<number>
}) => (
  <div
    className={classNames(
      'fr-flex fr-justify-content-space-between fr-align-items-center fr-flex-gap-4v',
      className,
    )}
  >
    <ActivitesFilterTags
      className="fr-mt-0-5v"
      defaultFilters={defaultFilters}
      initialMediateursOptions={initialMediateursOptions}
      initialBeneficiairesOptions={initialBeneficiairesOptions}
      communesOptions={communesOptions}
      departementsOptions={departementsOptions}
      lieuxActiviteOptions={lieuxActiviteOptions}
      minDate={activiteDates.first ?? new Date()}
      isCoordinateur={false}
      isMediateur
    />
    <Suspense fallback={<ExportActivitesDisabledButton />}>
      <ExportActivitesButtonWrapper
        filters={defaultFilters}
        communesOptions={communesOptions}
        departementsOptions={departementsOptions}
        lieuxActiviteOptions={lieuxActiviteOptions}
        beneficiairesOptions={initialBeneficiairesOptions}
        mediateursOptions={initialMediateursOptions}
        searchResultMatchesCount={searchResultMatchesCount}
      />
    </Suspense>
  </div>
)

export default MesActivitesListeHeader
