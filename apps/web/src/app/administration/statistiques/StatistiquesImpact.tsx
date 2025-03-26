import { ImpactStats } from '@app/web/server/impact/getImpactStats'

import KeyFigureTitle from '@app/web/app/administration/statistiques/KeyFigureTitle'
import StatisticsChart from '@app/web/app/administration/statistiques/StatisticsChart'
import Card from '@app/web/components/Card'
import { numberToString } from '@app/web/utils/formatNumber'

export const StatistiquesImpact = ({ stats }: { stats: ImpactStats }) => {
  const { conum, mediateur, coordoConum, coordoHD, activitesParMois } = stats

  return (
    <>
      <section>
        <h2 className="fr-h5 fr-text-mention--grey">
          <span className="ri-focus-2-line fr-mr-1w" aria-hidden />
          Statistiques d'impact et d'usage
        </h2>

        <div className="fr-grid-row fr-grid-row--gutters fr-mb-2w">
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-6">
            <Card
              title={
                <KeyFigureTitle type="conum">{conum.total}</KeyFigureTitle>
              }
              titleAs="div"
            >
              Conseillers numériques
              <div className="fr-text-title--blue-france fr-text--sm fr-mb-0">
                dont {conum.actifs} sont actifs ({conum.ratio}%)
              </div>
            </Card>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-6">
            <Card
              title={
                <KeyFigureTitle type="mediateur">
                  {numberToString(mediateur.total)}
                </KeyFigureTitle>
              }
              titleAs="div"
            >
              Médiateurs numérique
              <div className="fr-text-title--blue-france fr-text--sm fr-mb-0">
                dont {mediateur.actifs} sont actifs ({mediateur.ratio}%)
              </div>
            </Card>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-6">
            <Card
              title={
                <KeyFigureTitle type="coordoConum">
                  {coordoConum.total}
                </KeyFigureTitle>
              }
              titleAs="div"
            >
              Coordinateurs de CoNum
              <div className="fr-text-title--blue-france fr-text--sm fr-mb-0">
                dont {coordoConum.actifs} sont actifs ({coordoConum.ratio}%)
              </div>
            </Card>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-6">
            <Card
              title={
                <KeyFigureTitle type="coordoHD">
                  {coordoHD.total}
                </KeyFigureTitle>
              }
              titleAs="div"
            >
              Coordinateurs hors dispositif
              <div className="fr-text-title--blue-france fr-text--sm fr-mb-0">
                dont {coordoHD.actifs} sont actifs ({coordoHD.ratio}%)
              </div>
            </Card>
          </div>
        </div>
        <StatisticsChart
          data={activitesParMois}
          title="Activités par mois"
          xAxisDataKey="mois"
          tooltipLabelDataKey="mois"
          dataKeys={['avecBeneficiaire', 'sansBeneficiaire']}
          legends={[
            {
              key: 'avecBeneficiaire',
              label: 'Avec bénéficiaire(s) suivi(s)',
              value: `${numberToString(
                activitesParMois.reduce(
                  (acc, curr) => acc + curr.avecBeneficiaire,
                  0,
                ),
              )} (${
                activitesParMois[activitesParMois.length - 1]
                  ?.pourcentageAvecBeneficiaire ?? 0
              }%)`,
            },
            {
              key: 'sansBeneficiaire',
              label: 'Sans suivi bénéficiaire',
              value: `${numberToString(
                activitesParMois.reduce(
                  (acc, curr) => acc + curr.sansBeneficiaire,
                  0,
                ),
              )} (${
                activitesParMois[activitesParMois.length - 1]
                  ?.pourcentageSansBeneficiaire ?? 0
              }%)`,
            },
          ]}
          showLegendBelowChart
          titleClassName="fr-h6 fr-mb-2w"
        />
      </section>
    </>
  )
}
