'use client'

import type { SelectOption } from '@app/ui/components/Form/utils/options'
import type { LieuActiviteOption } from '@app/web/app/lieu-activite/getLieuxActiviteOptions'
import type { BeneficiaireOption } from '@app/web/beneficiaire/BeneficiaireOption'
import { ActiviteTypeFilter } from '@app/web/components/filters/ActiviteTypeFilter'
import { BeneficiaireFilter } from '@app/web/components/filters/BeneficiaireFilter'
import { LieuFilter } from '@app/web/components/filters/LieuFilter'
import { MediateurFilter } from '@app/web/components/filters/MediateurFilter'
import { PeriodeFilter } from '@app/web/components/filters/PeriodeFilter'
import { ProfilFilter } from '@app/web/components/filters/ProfilFilter'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { MediateurOption } from '@app/web/mediateurs/MediateurOption'
import classNames from 'classnames'

const Filters = ({
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
  lieuxActiviteOptions: LieuActiviteOption[]
  departementsOptions: SelectOption[]
  isCoordinateur: boolean
  isMediateur: boolean
  beneficiairesFilter?: boolean
  minDate?: Date
  className?: string
}) => (
  <div
    className={classNames(
      'fr-flex fr-align-items-start fr-flex-wrap fr-flex-gap-2v',
      className,
    )}
  >
    {isCoordinateur && (
      <>
        <MediateurFilter
          initialMediateursOptions={initialMediateursOptions}
          defaultValue={defaultFilters.mediateurs ?? []}
        />
        <ProfilFilter defaultValue={defaultFilters.profil} />
      </>
    )}
    <PeriodeFilter
      minDate={minDate ?? new Date()}
      defaultValue={
        defaultFilters.au && defaultFilters.du
          ? {
              du: defaultFilters.du,
              au: defaultFilters.au,
            }
          : undefined
      }
    />
    <LieuFilter
      defaultValue={[
        ...(defaultFilters.lieux == null
          ? []
          : [{ type: 'lieu' as const, value: defaultFilters.lieux }]),
        ...(defaultFilters.communes == null
          ? []
          : [{ type: 'commune' as const, value: defaultFilters.communes }]),
        ...(defaultFilters.departements == null
          ? []
          : [
              {
                type: 'departement' as const,
                value: defaultFilters.departements,
              },
            ]),
      ]}
      lieuxActiviteOptions={lieuxActiviteOptions}
      communesOptions={communesOptions}
      departementsOptions={departementsOptions}
    />
    <ActiviteTypeFilter defaultValue={defaultFilters.types ?? []} />
    {isMediateur && beneficiairesFilter && (
      <BeneficiaireFilter
        initialBeneficiairesOptions={initialBeneficiairesOptions}
        defaultValue={defaultFilters.beneficiaires ?? []}
      />
    )}
  </div>
)

export default Filters
