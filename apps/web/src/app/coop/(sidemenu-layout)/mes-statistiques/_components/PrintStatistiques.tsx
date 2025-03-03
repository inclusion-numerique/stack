import type { MesStatistiquesPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/getMesStatistiquesPageData'
import {
  generateActivitesFiltersLabels,
  toLieuPrefix,
} from '@app/web/cra/generateActivitesFiltersLabels'
import Tag from '@codegouvfr/react-dsfr/Tag'
import React from 'react'
import { StatistiquesActivitesPrint } from '../_sections/StatistiquesActivitesPrint'
import { StatistiquesBeneficiairesPrint } from '../_sections/StatistiquesBeneficiairesPrint'
import { StatistiquesGeneralesPrint } from '../_sections/StatistiquesGeneralesPrint'

export const PrintStatistiques = (
  mesStatistiquesProps: MesStatistiquesPageData,
) => {
  const {
    activitesFilters,
    communesOptions,
    departementsOptions,
    initialMediateursOptions,
    lieuxActiviteOptions,
  } = mesStatistiquesProps

  const filterLabelsToDisplay = generateActivitesFiltersLabels(
    activitesFilters,
    {
      communesOptions,
      departementsOptions,
      lieuxActiviteOptions,
      beneficiairesOptions: [],
      mediateursOptions: initialMediateursOptions,
    },
  ).map(toLieuPrefix)

  return (
    <div className="fr-print" aria-hidden>
      <h1 className="fr-text-title--blue-france fr-my-2w">Mes statistiques</h1>
      {filterLabelsToDisplay.length > 0 && (
        <section>
          <h2 className="fr-h3">Filtres activés</h2>
          <ul className="fr-tags-group">
            {filterLabelsToDisplay.map((filter) => (
              <li
                className="fr-line-height-1"
                key={`${filter.type}-${filter.key}`}
              >
                <Tag small>{filter.label}</Tag>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className="fr-pt-6v">
        <StatistiquesGeneralesPrint {...mesStatistiquesProps} />
      </section>
      <section className="fr-pt-6v">
        <StatistiquesActivitesPrint {...mesStatistiquesProps} />
      </section>
      <section className="fr-pt-6v">
        <StatistiquesBeneficiairesPrint {...mesStatistiquesProps} />
      </section>
    </div>
  )
}
