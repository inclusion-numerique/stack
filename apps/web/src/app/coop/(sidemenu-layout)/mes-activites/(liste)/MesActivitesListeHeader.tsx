import type { SelectOption } from '@app/ui/components/Form/utils/options'
import classNames from 'classnames'
import { Suspense } from 'react'
import ActivitesFilterTags from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/ActivitesFilterTags'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import type { BeneficiaireOption } from '@app/web/beneficiaire/BeneficiaireOption'
import type { MediateurOption } from '@app/web/mediateurs/MediateurOption'
import ExportActivitesDisabledButton from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/ExportActivitesDisabledButton'
import type { ActiviteDates } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getFirstAndLastActiviteDate'
import ExportActivitesButtonWrapper from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/ExportActivitesButtonWrapper'
import type { LieuActiviteOption } from '@app/web/app/lieu-activite/getLieuxActiviteOptions'

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
