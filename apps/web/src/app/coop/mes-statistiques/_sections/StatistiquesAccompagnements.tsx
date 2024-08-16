import { AccompagnementPieChart } from '../_components/AccompagnementPieChart'
import { ProgressListItem } from '../_components/ProgressListItem'
import { QuantifiedShareLegend } from '../_components/QuantifiedShareLegend'
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

export const StatistiquesAccompagnements = ({
  modalitesAccompagnement,
  materielsAccompagnements,
  thematiquesAccompagnements,
  canauxAccompagnements,
  dureesAccompagnements,
  lieuxAccompagnements,
}: {
  modalitesAccompagnement: (QuantifiedShare<AccompagnementLabel> & {
    participants?: number
  })[]
  materielsAccompagnements: QuantifiedShare[]
  thematiquesAccompagnements: QuantifiedShare[]
  canauxAccompagnements: QuantifiedShare[]
  dureesAccompagnements: QuantifiedShare[]
  lieuxAccompagnements: QuantifiedShare[]
}) => (
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
      <h3 className="fr-h6">Thématiques d’accompagnements</h3>
      <ul className="fr-px-0 fr-mb-5w">
        {thematiquesAccompagnements.map((thematiqueAccompagnement, index) => (
          <ProgressListItem
            key={thematiqueAccompagnement.label}
            {...thematiqueAccompagnement}
            colors={[
              thematiquesAccompagnementColors[
                index % thematiquesAccompagnementColors.length
              ],
            ]}
          />
        ))}
      </ul>
      <h3 className="fr-h6">Matériel utilisé</h3>
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
          <h3 className="fr-h6">Canaux d’accompagnements</h3>
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
          <h3 className="fr-h6">Durées des accompagnements</h3>
          <div className="fr-flex fr-align-items-center">
            <AccompagnementPieChart
              size={128}
              data={dureesAccompagnements}
              colors={dureesAccompagnementColors}
            />
            <QuantifiedShareLegend
              classeName="fr-pl-3w"
              quantifiedShares={dureesAccompagnements}
              colors={dureesAccompagnementColors}
            />
          </div>
        </div>
      </div>
      <hr className="fr-separator-1px fr-my-5w" />
      <h3 className="fr-h6">Nombre d’accompagnements par lieux</h3>
      <div className="fr-text--bold fr-text--uppercase fr-text--sm fr-text-mention--grey fr-mb-1w">
        Lieux d’activités
      </div>
      <ul className="fr-px-0">
        {lieuxAccompagnements.map((nombreAccompagnementParLieu) => (
          <ProgressListItem
            {...nombreAccompagnementParLieu}
            key={nombreAccompagnementParLieu.label}
            colors={[nombreAccompagnementParLieuColor]}
          />
        ))}
      </ul>
    </div>
  </>
)
