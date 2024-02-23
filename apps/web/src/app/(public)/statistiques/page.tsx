import {
  getStatistics,
  StatisticsParams,
} from '@app/web/app/(public)/statistiques/getStatistics'
import SearchStatistics from '@app/web/app/(public)/statistiques/SearchStatistics'
import Card from '@app/web/components/Card'
import KeyFigureTitle from './KeyFigureTitle'

const StatisticsPage = async ({
  searchParams: { fonctionnalites, recherche },
}: {
  searchParams: StatisticsParams
}) => {
  const { kpi, search, creation } = await getStatistics({
    recherche,
    fonctionnalites,
  })

  return (
    <>
      <section>
        <h2 className="fr-h3 fr-mb-4w">
          Chiffres clés pour suivre l’usage du service
        </h2>
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
            <Card
              title={
                <KeyFigureTitle type="publications">
                  {kpi.publications.count}
                </KeyFigureTitle>
              }
              titleAs="div"
            >
              Nombre total de ressources publiées
              <div className="fr-text-title--blue-france fr-text--sm fr-mb-0">
                dont {kpi.publications.public} publiques et{' '}
                {kpi.publications.private} privées
              </div>
            </Card>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
            <Card
              title={
                <KeyFigureTitle type="views">{kpi.views.count}</KeyFigureTitle>
              }
              titleAs="div"
            >
              Nombre total de vues de ressources
              <div className="fr-text-title--blue-france fr-text--sm fr-mb-0">
                dont {kpi.views.lastMonth} sur les 30 derniers jours{' '}
                {kpi.views.change > 0 && '+'}
                {kpi.views.change}%
              </div>
            </Card>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
            <Card
              title={
                <KeyFigureTitle type="rates">
                  {kpi.rates.average}/10
                </KeyFigureTitle>
              }
              titleAs="div"
            >
              Indice de satisfaction globale
              <div className="fr-text-title--blue-france fr-text--sm fr-mb-0">
                sur {kpi.rates.count} avis
              </div>
            </Card>
          </div>
        </div>
      </section>
      <hr className="fr-separator-6v fr-separator-md-12v" />
      <section>
        <h2 className="fr-h3 fr-mb-4w">
          Données pour comprendre l’usage de la recherche
        </h2>
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
            <SearchStatistics
              title="Nombre de recherches effectuées"
              data={search.data}
              xAxisDataKey="period"
              barsDataKey={['searchExecutions']}
            />
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
            <SearchStatistics
              title="Nombre de vues de ressources"
              data={search.data}
              xAxisDataKey="period"
              barsDataKey={['resourceViews']}
            />
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
            <SearchStatistics
              title="Nombre de ressources enregistrées"
              data={search.data}
              xAxisDataKey="period"
              barsDataKey={['savedResources']}
            />
          </div>
        </div>
      </section>
      <hr className="fr-separator-6v fr-separator-md-12v" />
      <section>
        <h2 className="fr-h3 fr-mb-4w">
          Données pour comprendre
          <br />
          la création de ressources, bases & profils
        </h2>
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
            <SearchStatistics
              title="Nombre de ressources créées"
              data={creation.ressources.data}
              xAxisDataKey="period"
              barsDataKey={['privates', 'publics', 'drafts']}
              legend={[
                {
                  label: 'Ressource privée',
                  value: `${creation.ressources.proportions.privates}%`,
                },
                {
                  label: 'Ressource Publique',
                  value: `${creation.ressources.proportions.publics}%`,
                },
                {
                  label: 'Brouillon',
                  value: `${creation.ressources.proportions.drafts}%`,
                },
              ]}
            />
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
            <SearchStatistics
              title="Nombre de profils créés"
              data={creation.profils.data}
              xAxisDataKey="period"
              barsDataKey={['privates', 'publics']}
              legend={[
                {
                  label: 'Profil privé',
                  value: `${creation.profils.proportions.privates}%`,
                },
                {
                  label: 'Profil Publique',
                  value: `${creation.profils.proportions.publics}%`,
                },
              ]}
            />
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
            <SearchStatistics
              title="Nombre de bases créées"
              data={creation.bases.data}
              xAxisDataKey="period"
              barsDataKey={['privates', 'publics']}
              legend={[
                {
                  label: 'Base privée',
                  value: `${creation.bases.proportions.privates}%`,
                },
                {
                  label: 'Base Publique',
                  value: `${creation.bases.proportions.publics}%`,
                },
              ]}
            />
          </div>
        </div>
      </section>
      <hr className="fr-separator-6v fr-separator-md-12v" />
      <section>
        <h2 className="fr-h3 fr-mb-4w">
          Données pour comprendre
          <br />
          le contenu des ressources ainsi que les publics visés
        </h2>
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12 fr-col-lg-6">
            <Card title="Les 10 thématiques les plus utilisées">
              <div
                className="fr-progress fr-mb-1w"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow={0}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="fr-progress__bar" style={{ width: '0%' }} />
              </div>
              <div
                className="fr-progress fr-mb-1w"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="fr-progress__bar" style={{ width: '25%' }} />
              </div>
              <div
                className="fr-progress fr-mb-1w"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow={50}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="fr-progress__bar" style={{ width: '50%' }} />
              </div>
              <div
                className="fr-progress fr-mb-1w"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow={75}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="fr-progress__bar" style={{ width: '75%' }} />
              </div>
              <div
                className="fr-progress fr-mb-1w"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow={100}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="fr-progress__bar" style={{ width: '100%' }} />
              </div>
            </Card>
          </div>
          <div className="fr-col-12 fr-col-lg-6">
            <Card title="Les 10 publics cibles les plus utilisés">data</Card>
          </div>
        </div>
      </section>
    </>
  )
}

export default StatisticsPage
