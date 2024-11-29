import React from 'react'
import Tag from '@codegouvfr/react-dsfr/Tag'
import type { MesStatistiquesPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/getMesStatistiquesPageData'
import { generateActivitesFiltersLabels } from '@app/web/cra/generateActivitesFiltersLabels'
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

  const filterLabelsToDisplay = Object.entries(
    generateActivitesFiltersLabels(activitesFilters, {
      communesOptions,
      departementsOptions,
      lieuxActiviteOptions,
      beneficiairesOptions: [],
      mediateursOptions: initialMediateursOptions,
    }),
  )
    .filter(
      ([key]) =>
        key !== 'du' && key !== 'au' && key !== 'typeLieu' && key !== 'nomLieu',
    )
    .filter((entry): entry is [string, string] => !!entry[1])

  return (
    <div className="fr-print" aria-hidden>
      <h1 className="fr-text-title--blue-france fr-my-2w">Mes statistiques</h1>
      {filterLabelsToDisplay.length > 0 && (
        <section>
          <h2 className="fr-h3">Filtres activés</h2>
          <ul>
            {filterLabelsToDisplay.map(([key, value]) => (
              <Tag key={key} small>
                {value}
              </Tag>
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
