'use client'

import { useState } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { SegmentedControl } from '@codegouvfr/react-dsfr/SegmentedControl'
import { AccompagnementPieChart } from '../_components/AccompagnementPieChart'
import { ProgressListItem } from '../_components/ProgressListItem'
import { QuantifiedShareLegend } from '../_components/QuantifiedShareLegend'
import { QuantifiedShareList } from '../_components/QuantifiedShareList'
import { StatistiqueAccompagnement } from '../_components/StatistiqueAccompagnement'
import { StatistiqueMateriel } from '../_components/StatistiqueMateriel'
import {
  AccompagnementLabel,
  MaterielLabel,
  QuantifiedShare,
} from '../quantifiedShare'

const thematiquesAccompagnementColors = [
  '#68A532',
  '#465F9D',
  '#A558A0',
  '#E18B76',
  '#C8AA39',
  '#E4794A',
  '#D1B781',
  '#AEA397',
  '#00A95F',
  '#417DC4',
  '#CE614A',
  '#C3992A',
  '#009081',
  '#BD987A',
]
const nombreAccompagnementParLieuColor = '#009099'
const canauxAccompagnementColors = ['#C7F6FC', '#60E0EB', '#009099', '#006A6F']
const dureesAccompagnementColors = ['#F7EBE5', '#EAC7B2', '#C08C65', '#855D48']

const formatTime = (time: number): string =>
  time >= 60 ? `${Math.floor(time / 60)}h${time % 60 || '00'}` : `${time} min`

const toFormattedDureeAccompagnement = (
  dureeAccompagnement: QuantifiedShare,
) => ({
  ...dureeAccompagnement,
  label: formatTime(+dureeAccompagnement.label),
})

const byLabel = (
  { label: label1 }: QuantifiedShare,
  { label: label2 }: QuantifiedShare,
): number => +label1 - +label2

export const StatistiquesAccompagnements = ({
  modalitesAccompagnement,
  materielsAccompagnements,
  thematiquesAccompagnements,
  thematiquesDemarchesAdministratives,
  canauxAccompagnements,
  dureesAccompagnements,
  lieuxAccompagnements,
}: {
  modalitesAccompagnement: (QuantifiedShare<AccompagnementLabel> & {
    participants?: number
  })[]
  materielsAccompagnements: QuantifiedShare[]
  thematiquesAccompagnements: QuantifiedShare[]
  thematiquesDemarchesAdministratives: QuantifiedShare[]
  canauxAccompagnements: QuantifiedShare[]
  dureesAccompagnements: QuantifiedShare[]
  lieuxAccompagnements: QuantifiedShare[]
}) => {
  const [
    isMediationNumeriqueAccompagnement,
    setIsMediationNumeriqueAccompagnement,
  ] = useState(true)

  const formattedDureesAccompagnements = dureesAccompagnements
    .toSorted(byLabel)
    .map(toFormattedDureeAccompagnement)

  return (
    <>
      <h2 className="fr-h5 fr-text-mention--grey">
        <span className="ri-service-line fr-mr-1w" aria-hidden />
        Statistiques sur vos accompagnements
      </h2>
      <div className="fr-background-alt--blue-france fr-p-4w fr-mb-3w fr-border-radius--16 fr-grid-row fr-flex-gap-4v">
        {modalitesAccompagnement.map(
          ({ label, count, proportion, participants }) => (
            <StatistiqueAccompagnement
              key={label}
              className="fr-col-xl fr-col-12"
              accompagnement={label}
              count={count}
              proportion={proportion}
            >
              {participants && (
                <>
                  <span className="fr-text--bold">{participants}</span>{' '}
                  participants
                </>
              )}
            </StatistiqueAccompagnement>
          ),
        )}
      </div>
      <div className="fr-border fr-p-4w fr-mb-3w fr-border-radius--16">
        <div className="fr-grid-row fr-mb-3w fr-align-items-center">
          <div className="fr-mb-0 fr-col fr-flex fr-align-items-center">
            <h3 className="fr-text--lg fr-mb-0">
              Thématiques d’accompagnements
            </h3>
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
              À noter : une activité peut avoir plusieurs thématiques.
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
                  onClick: () => setIsMediationNumeriqueAccompagnement(true),
                },
              },
              {
                label: 'Démarches administratives',
                nativeInputProps: {
                  checked: !isMediationNumeriqueAccompagnement,
                  onClick: () => setIsMediationNumeriqueAccompagnement(false),
                },
              },
            ]}
          />
        </div>
        <ul className="fr-px-0 fr-mb-5w">
          {isMediationNumeriqueAccompagnement &&
            thematiquesAccompagnements.map(
              (thematiqueAccompagnement, index) => (
                <ProgressListItem
                  key={thematiqueAccompagnement.label}
                  {...thematiqueAccompagnement}
                  colors={[
                    thematiquesAccompagnementColors[
                      index % thematiquesAccompagnementColors.length
                    ],
                  ]}
                />
              ),
            )}
          {!isMediationNumeriqueAccompagnement &&
            thematiquesDemarchesAdministratives.map(
              (thematiqueAccompagnement, index) => (
                <ProgressListItem
                  key={thematiqueAccompagnement.label}
                  {...thematiqueAccompagnement}
                  colors={[
                    thematiquesAccompagnementColors[
                      index % thematiquesAccompagnementColors.length
                    ],
                  ]}
                />
              ),
            )}
        </ul>
        <div className="fr-mb-0 fr-col fr-flex fr-align-items-center fr-mb-3w">
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
            Matériel utilisé lors d’un accompagnement de médiation numérique. À
            noter : Plusieurs matériels ont pu être utilisés lors d’un même
            accompagnement.
          </span>
        </div>

        <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
          {materielsAccompagnements.map(({ label, count, proportion }) => (
            <StatistiqueMateriel
              key={label}
              className="fr-col-xl fr-col-4"
              value={label as MaterielLabel}
              count={count}
              proportion={proportion}
            />
          ))}
        </div>
      </div>
      <div className="fr-border fr-p-4w fr-border-radius--16">
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-xl-6 fr-col-12">
            <div className="fr-mb-0 fr-col fr-flex fr-align-items-center fr-mb-3w">
              <h3 className="fr-text--lg fr-mb-0">Canaux d’accompagnements</h3>
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
                Il s’agit de la répartition des activités enregistrées par canal
                d’accompagnement.
              </span>
            </div>
            <div className="fr-flex fr-align-items-center">
              <AccompagnementPieChart
                size={128}
                data={canauxAccompagnements}
                colors={canauxAccompagnementColors}
              />
              <QuantifiedShareLegend
                classeName="fr-pl-3w"
                quantifiedShares={canauxAccompagnements}
                colors={canauxAccompagnementColors}
              />
            </div>
          </div>
          <div className="fr-col-xl-6 fr-col-12">
            <div className="fr-mb-0 fr-col fr-flex fr-align-items-center fr-mb-3w">
              <h3 className="fr-text--lg fr-mb-0">
                Durées des accompagnements
              </h3>
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
                Il s’agit de la répartition des activités enregistrées par canal
                d’accompagnement.
              </span>
            </div>

            <div className="fr-flex fr-align-items-center">
              <AccompagnementPieChart
                size={128}
                data={formattedDureesAccompagnements}
                colors={dureesAccompagnementColors}
              />
              <QuantifiedShareLegend
                classeName="fr-pl-3w"
                quantifiedShares={formattedDureesAccompagnements}
                colors={dureesAccompagnementColors}
              />
            </div>
          </div>
        </div>
        <hr className="fr-separator-1px fr-my-5w" />
        <div className="fr-mb-0 fr-col fr-flex fr-align-items-center fr-mb-3w">
          <h3 className="fr-text--lg fr-mb-0">
            Nombre d’accompagnements par lieux
          </h3>
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
            d’accompagnement. À noter : Les lieux à distance ou à domicile
            n’apparaissent pas sur la carte.
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
          quantifiedShares={lieuxAccompagnements}
          colors={[nombreAccompagnementParLieuColor]}
        />
      </div>
    </>
  )
}
