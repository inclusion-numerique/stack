import type { MesStatistiquesPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/getMesStatistiquesPageData'
import { AccompagnementPieChart } from '../_components/AccompagnementPieChart'
import { ProgressListItem } from '../_components/ProgressListItem'
import { QuantifiedShareLegend } from '../_components/QuantifiedShareLegend'
import { QuantifiedShareList } from '../_components/QuantifiedShareList'
import { StatistiqueMateriel } from '../_components/StatistiqueMateriel'
import {
  canauxAccompagnementColors,
  dureesAccompagnementColors,
  nombreAccompagnementParLieuColor,
  thematiquesAccompagnementColors,
} from './colors'

export const StatistiquesActivitesPrint = ({
  activites,
  structures,
}: MesStatistiquesPageData) => {
  const thematiques = activites.thematiques.sort((a, b) => b.count - a.count)
  const thematiquesMaxProportion = activites.thematiques.reduce(
    (max, thematique) =>
      thematique.proportion > max ? thematique.proportion : max,
    0,
  )

  const thematiquesDemarches = activites.thematiquesDemarches.sort(
    (a, b) => b.count - a.count,
  )
  const thematiquesDemarchesMaxProportion =
    activites.thematiquesDemarches.reduce(
      (max, thematique) =>
        thematique.proportion > max ? thematique.proportion : max,
      0,
    )

  return (
    <>
      <h2 className="fr-h3">Statistiques sur vos activités</h2>
      <h3 className="fr-h5">Types d’activités</h3>
      <ul>
        {activites.typeActivites.map((typeActivite) => (
          <li key={typeActivite.value}>
            <b>{typeActivite.count}</b> {typeActivite.label}{' '}
            {typeActivite.value === 'Collectif' &&
              `, ${activites.total} participants au total`}{' '}
            ({typeActivite.proportion} % des activités)
          </li>
        ))}
      </ul>
      <h3 className="fr-h5 fr-mb-2v fr-mt-6v">Thématiques des activités</h3>
      <small role="note" className="fr-mb-6v fr-display-block">
        Thématiques sélectionnées lors de l’enregistrement d’une activité. À
        noter : une activité peut avoir plusieurs thématiques.
      </small>
      <h4 className="fr-h6 fr-mb-2v fr-mt-6v">Médiation numérique</h4>
      <ul className="fr-px-0 fr-mb-0">
        {thematiques.map(({ value, proportion, label, count }, index) => (
          <ProgressListItem
            key={value}
            count={count}
            proportion={proportion}
            maxProportion={thematiquesMaxProportion}
            label={label}
            colors={[
              thematiquesAccompagnementColors[
                index % thematiquesAccompagnementColors.length
              ],
            ]}
          />
        ))}
      </ul>
      <h4 className="fr-h6 fr-mb-2v fr-mt-6v">Démarches administratives</h4>
      <ul className="fr-px-0 fr-mb-0">
        {thematiquesDemarches.map(
          ({ value, proportion, label, count }, index) => (
            <ProgressListItem
              key={value}
              count={count}
              proportion={proportion}
              maxProportion={thematiquesDemarchesMaxProportion}
              label={label}
              colors={[
                thematiquesAccompagnementColors[
                  index % thematiquesAccompagnementColors.length
                ],
              ]}
            />
          ),
        )}
      </ul>
      <h3 className="fr-h5 fr-mb-2v fr-mt-6v">Matériel utilisé</h3>
      <small role="note" className="fr-mb-6v fr-display-block">
        Matériel utilisé lors d’un accompagnement de médiation numérique. À
        noter : Plusieurs matériels ont pu être utilisés lors d’un même
        accompagnement.
      </small>
      <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
        {activites.materiels.map(({ value, label, count, proportion }) => (
          <StatistiqueMateriel
            key={value}
            className="fr-col-2"
            value={value}
            label={label}
            count={count}
            proportion={proportion}
          />
        ))}
      </div>
      <h3 className="fr-h5 fr-mb-2v fr-mt-6v">Canaux des activités</h3>
      <small role="note" className="fr-mb-6v fr-display-block">
        Répartition des activités enregistrées par canal.
      </small>
      <div className="fr-flex fr-align-items-center">
        <AccompagnementPieChart
          size={128}
          data={activites.mergedTypeLieu}
          colors={canauxAccompagnementColors}
          isAnimationActive={false}
        />
        <QuantifiedShareLegend
          classeName="fr-pl-3w"
          quantifiedShares={activites.mergedTypeLieu}
          colors={canauxAccompagnementColors}
        />
      </div>
      <h3 className="fr-h5 fr-mb-2v fr-mt-6v">Durées des activités</h3>
      <small role="note" className="fr-mb-6v fr-display-block">
        Répartition des activités enregistrées par durée.
      </small>
      <div className="fr-flex fr-align-items-center">
        <AccompagnementPieChart
          size={128}
          data={activites.durees}
          colors={dureesAccompagnementColors}
          isAnimationActive={false}
        />
        <QuantifiedShareLegend
          classeName="fr-pl-3w"
          quantifiedShares={activites.durees}
          colors={dureesAccompagnementColors}
        />
      </div>
      <h3 className="fr-h5 fr-mb-2v fr-mt-6v">Nombre d’activités par lieux</h3>
      <small role="note" className="fr-mb-6v fr-display-block">
        Répartition des activités enregistrées par lieu d’activité.
      </small>
      <QuantifiedShareList
        order="desc"
        quantifiedShares={structures}
        colors={[nombreAccompagnementParLieuColor]}
      />
    </>
  )
}
