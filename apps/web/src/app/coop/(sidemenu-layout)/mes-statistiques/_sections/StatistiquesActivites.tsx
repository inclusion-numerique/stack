'use client'

import { useState } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { SegmentedControl } from '@codegouvfr/react-dsfr/SegmentedControl'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import type { MesStatistiquesPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/getMesStatistiquesPageData'
import { AccompagnementPieChart } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_components/AccompagnementPieChart'
import { QuantifiedShareLegend } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_components/QuantifiedShareLegend'
import { ProgressListItem } from '../_components/ProgressListItem'
import { QuantifiedShareList } from '../_components/QuantifiedShareList'
import { StatistiqueAccompagnement } from '../_components/StatistiqueAccompagnement'
import { StatistiqueMateriel } from '../_components/StatistiqueMateriel'
import {
  canauxAccompagnementColors,
  dureesAccompagnementColors,
  nombreAccompagnementParLieuColor,
  thematiquesAccompagnementColors,
} from './colors'

export const StatistiquesActivites = ({
  activites,
  structures,
  totalCounts,
}: MesStatistiquesPageData) => {
  const [
    isMediationNumeriqueAccompagnement,
    setIsMediationNumeriqueAccompagnement,
  ] = useState(true)

  const thematiquesToDisplay = isMediationNumeriqueAccompagnement
    ? activites.thematiques
    : activites.thematiquesDemarches

  const thematiquesToDisplayMaxProportion = thematiquesToDisplay.reduce(
    (max, thematique) =>
      thematique.proportion > max ? thematique.proportion : max,
    0,
  )

  return (
    <>
      <h2 className="fr-h5 fr-text-mention--grey">
        <span className="ri-service-line fr-mr-1w" aria-hidden />
        Statistiques sur vos activités
      </h2>
      <div className="fr-background-alt--blue-france fr-p-4w fr-mb-3w fr-border-radius--16 fr-grid-row fr-flex-gap-4v">
        {activites.typeActivites.map(({ count, proportion, value }) => (
          <StatistiqueAccompagnement
            key={value}
            className="fr-col-xl fr-col-12"
            typeActivite={value}
            count={count}
            proportion={proportion}
          >
            {value === 'Collectif' && (
              <>
                <span className="fr-text--bold">
                  {totalCounts.accompagnements.collectifs.total}
                </span>{' '}
                participation
                {sPluriel(totalCounts.accompagnements.collectifs.total)}
              </>
            )}
          </StatistiqueAccompagnement>
        ))}
      </div>
      <div className="fr-border fr-p-4w fr-mb-3w fr-border-radius--16">
        <div className="fr-grid-row fr-mb-3w fr-align-items-center">
          <div className="fr-mb-0 fr-col fr-flex fr-align-items-center">
            <h3 className="fr-text--lg fr-mb-0">Thématiques des activités</h3>
            <Button
              className="fr-px-1v fr-ml-1v"
              title="Plus d’information à propos des thématiques d’accompagnements"
              priority="tertiary no outline"
              size="small"
              type="button"
              aria-describedby="tooltip-thematiques-accompagnement"
            >
              <span className="ri-information-line fr-text--lg" aria-hidden />
            </Button>
            <span
              className="fr-tooltip fr-placement"
              id="tooltip-thematiques-accompagnement"
              role="tooltip"
              aria-hidden
            >
              Thématiques sélectionnées lors de l’enregistrement d’une activité.
              À noter&nbsp;: une activité peut avoir plusieurs thématiques.
            </span>
          </div>
          <SegmentedControl
            className="fr-md-col fr-col-12 fr-ml-auto"
            hideLegend
            small
            legend="Bascule entre les thématiques"
            segments={[
              {
                label: 'Médiation numérique',
                nativeInputProps: {
                  checked: isMediationNumeriqueAccompagnement,
                  onChange: () => setIsMediationNumeriqueAccompagnement(true),
                },
              },
              {
                label: 'Démarches administratives',
                nativeInputProps: {
                  checked: !isMediationNumeriqueAccompagnement,
                  onChange: () => setIsMediationNumeriqueAccompagnement(false),
                },
              },
            ]}
          />
        </div>
        <ul className="fr-px-0 fr-mb-0">
          {thematiquesToDisplay
            .sort((a, b) => b.count - a.count)
            .map(({ value, proportion, label, count }, index) => (
              <ProgressListItem
                key={value}
                count={count}
                proportion={proportion}
                maxProportion={thematiquesToDisplayMaxProportion}
                label={label}
                colors={[
                  thematiquesAccompagnementColors[
                    index % thematiquesAccompagnementColors.length
                  ],
                ]}
              />
            ))}
        </ul>
        {isMediationNumeriqueAccompagnement && (
          <>
            <div className="fr-mb-0 fr-col fr-flex fr-align-items-center fr-mt-10v fr-mb-3w">
              <h3 className="fr-text--lg fr-mb-0">Matériel utilisé</h3>
              <Button
                className="fr-px-1v fr-ml-1v"
                title="Plus d’information à propos du matériel utilisé"
                priority="tertiary no outline"
                size="small"
                type="button"
                aria-describedby="tooltip-meteriel-utilise"
              >
                <span className="ri-information-line fr-text--lg" aria-hidden />
              </Button>
              <span
                className="fr-tooltip fr-placement"
                id="tooltip-meteriel-utilise"
                role="tooltip"
                aria-hidden
              >
                Matériel utilisé lors d’un accompagnement de médiation
                numérique. À noter : Plusieurs matériels ont pu être utilisés
                lors d’un même accompagnement.
              </span>
            </div>

            <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
              {activites.materiels.map(
                ({ value, label, count, proportion }) => (
                  <StatistiqueMateriel
                    key={value}
                    className="fr-col-xl fr-col-4"
                    value={value}
                    label={label}
                    count={count}
                    proportion={proportion}
                  />
                ),
              )}
            </div>
          </>
        )}
      </div>
      <div className="fr-border fr-p-4w fr-border-radius--16">
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-xl-6 fr-col-12">
            <div className="fr-mb-0 fr-col fr-flex fr-align-items-center fr-mb-3w">
              <h3 className="fr-text--lg fr-mb-0">Canaux des activités</h3>
              <Button
                className="fr-px-1v fr-ml-1v"
                title="Plus d’information à propos des canaux d’accompagnements"
                priority="tertiary no outline"
                size="small"
                type="button"
                aria-describedby="tooltip-canaux-accompagnements"
              >
                <span className="ri-information-line fr-text--lg" aria-hidden />
              </Button>
              <span
                className="fr-tooltip fr-placement"
                id="tooltip-canaux-accompagnements"
                role="tooltip"
                aria-hidden
              >
                Il s’agit de la répartition des activités enregistrées par
                canal.
              </span>
            </div>
            <div className="fr-flex fr-align-items-center">
              <AccompagnementPieChart
                size={128}
                data={activites.typeLieu}
                colors={canauxAccompagnementColors}
              />
              <QuantifiedShareLegend
                classeName="fr-pl-3w"
                quantifiedShares={activites.typeLieu}
                colors={canauxAccompagnementColors}
              />
            </div>
          </div>
          <div className="fr-col-xl-6 fr-col-12">
            <div className="fr-mb-0 fr-col fr-flex fr-align-items-center fr-mb-3w">
              <h3 className="fr-text--lg fr-mb-0">Durées des activités</h3>
              <Button
                className="fr-px-1v fr-ml-1v"
                title="Plus d’information à propos des durées d’accompagnements"
                priority="tertiary no outline"
                size="small"
                type="button"
                aria-describedby="tooltip-durees-accompagnements"
              >
                <span className="ri-information-line fr-text--lg" aria-hidden />
              </Button>
              <span
                className="fr-tooltip fr-placement"
                id="tooltip-durees-accompagnements"
                role="tooltip"
                aria-hidden
              >
                Il s’agit de la répartition des activités enregistrées par
                durée.
              </span>
            </div>

            <div className="fr-flex fr-align-items-center">
              <AccompagnementPieChart
                size={128}
                data={activites.durees}
                colors={dureesAccompagnementColors}
              />
              <QuantifiedShareLegend
                classeName="fr-pl-3w"
                quantifiedShares={activites.durees}
                colors={dureesAccompagnementColors}
              />
            </div>
          </div>
        </div>
        <hr className="fr-separator-1px fr-my-5w" />
        <div className="fr-mb-0 fr-col fr-flex fr-align-items-center fr-mb-3w">
          <h3 className="fr-text--lg fr-mb-0">Nombre d’activités par lieux</h3>
          <Button
            className="fr-px-1v fr-ml-1v"
            title="Plus d’information à propos du nombre d’accompagnements par lieux"
            priority="tertiary no outline"
            size="small"
            type="button"
            aria-describedby="tooltip-nombre-accompagnements-par-lieux"
          >
            <span className="ri-information-line fr-text--lg" aria-hidden />
          </Button>
          <span
            className="fr-tooltip fr-placement"
            id="tooltip-nombre-accompagnements-par-lieux"
            role="tooltip"
            aria-hidden
          >
            Il s’agit de la répartition des activités enregistrées par lieu
            d’activité.
          </span>
        </div>
        <div className="fr-text--bold fr-text--uppercase fr-text--sm fr-text-mention--grey fr-mb-1w">
          Lieux d’activités
        </div>
        <QuantifiedShareList
          limit={{
            showLabel: 'Voir tout mes lieux',
            hideLabel: 'Réduire',
            count: 5,
          }}
          order="desc"
          quantifiedShares={structures}
          colors={[nombreAccompagnementParLieuColor]}
        />
      </div>
    </>
  )
}
