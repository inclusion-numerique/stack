'use client'

import type { SelectOption } from '@app/ui/components/Form/utils/options'
import type { LieuActiviteOption } from '@app/web/app/lieu-activite/getMediateursLieuxActiviteOptions'
import { LieuFilter } from '@app/web/components/filters/LieuFilter'
import { RoleFilter } from '@app/web/components/filters/RoleFilter'
import { StatutFilter } from '@app/web/components/filters/StatutFilter'
import classNames from 'classnames'
import { UtilisateursFilters } from './utilisateursFilters'

const Filters = ({
  defaultFilters,
  communesOptions,
  lieuxActiviteOptions,
  departementsOptions,
  className,
}: {
  defaultFilters: UtilisateursFilters
  communesOptions: SelectOption[]
  lieuxActiviteOptions: LieuActiviteOption[]
  departementsOptions: SelectOption[]
  className?: string
}) => (
  <div
    className={classNames(
      'fr-flex fr-align-items-start fr-flex-wrap fr-flex-gap-2v',
      className,
    )}
  >
    <RoleFilter defaultValue={defaultFilters.roles} />
    <StatutFilter defaultValue={defaultFilters.statut} />
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
  </div>
)

export default Filters
