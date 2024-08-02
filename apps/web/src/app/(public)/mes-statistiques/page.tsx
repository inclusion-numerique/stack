import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { StatistiqueMateriel } from './_components/StatistiqueMateriel'
import { StatistiqueAccompagnement } from './_components/StatistiqueAccompagnement'
import { StatistiquesTerritoriales } from './_components/StatistiquesTerritoriales'

const MesStatistiquesPage = () => (
  <>
    <SkipLinksPortal links={defaultSkipLinks} />
    <main
      id={contentId}
      className="fr-container fr-container--medium fr-mb-16w"
    >
      <Breadcrumbs currentPage="Mes statistiques" />
      <h1 className="fr-h2 fr-text-title--blue-france">Mes statistiques</h1>
      <hr />
      <section className="fr-mb-6w">
        <h2 className="fr-h5 fr-text-mention--grey">
          <span className="ri-line-chart-line fr-mr-1w" aria-hidden />
          Statistiques générales sur votre activité
        </h2>
        <div className="fr-flex fr-flex-gap-6v">
          <div className="fr-flex fr-direction-column fr-flex-gap-6v">
            <div className="fr-p-3w fr-border-radius--16 fr-background-alt--brown-caramel">
              <div className="fr-flex fr-align-items-center fr-justify-content-space-between">
                <span className="fr-h2 fr-mb-0">320</span>
                <span
                  className="ri-service-line ri-2x fr-text-label--brown-caramel"
                  aria-hidden
                />
              </div>
              <div className="fr-text--bold fr-my-1w">Accompagnements</div>
              <div className="fr-text-mention--grey">au total</div>
            </div>
            <div className="fr-p-3w fr-border-radius--16 fr-background-alt--brown-caramel">
              <div className="fr-flex fr-align-items-center fr-justify-content-space-between">
                <span className="fr-h2 fr-mb-0">120</span>
                <span
                  className="ri-user-heart-line ri-2x fr-text-label--brown-caramel"
                  aria-hidden
                />
              </div>
              <div className="fr-text--bold fr-my-1w">
                Bénéficiaires accompagnés
              </div>
              <div className="fr-text-mention--grey">
                <div>48 bénéficiaires suivis</div>
                <div>20 bénéficiaires anonymes</div>
              </div>
            </div>
          </div>
          <div className="fr-border fr-p-3w fr-border-radius--16">
            <span className="fr-h4">Nombre d’accompagnements</span>
          </div>
        </div>
      </section>
      <section className="fr-mb-6w">
        <h2 className="fr-h5 fr-text-mention--grey">
          <span className="ri-service-line fr-mr-1w" aria-hidden />
          Statistiques sur vos accompagnements
        </h2>
        <div className="fr-background-alt--blue-france fr-p-4w fr-mb-3w fr-border-radius--16 fr-grid-row">
          <StatistiqueAccompagnement
            className="fr-col-4"
            accompagnement="Accompagnements individuels"
            count={121}
            proportion={23}
          />
          <StatistiqueAccompagnement
            className="fr-col-4"
            accompagnement="Ateliers collectifs"
            count={4}
            proportion={23}
          >
            <span className="fr-text--bold">40</span> participants
          </StatistiqueAccompagnement>
          <StatistiqueAccompagnement
            className="fr-col-4"
            accompagnement="Aide aux démarches administratives"
            count={68}
            proportion={23}
          />
        </div>
        <div className="fr-border fr-p-4w fr-mb-3w fr-border-radius--16">
          <h3 className="fr-h6">Thématiques d’accompagnements</h3>
          <h3 className="fr-h6">Matériel utilisé</h3>
          <div className="fr-grid-row">
            <StatistiqueMateriel value="Ordinateur" count={28} ratio={20} />
            <StatistiqueMateriel value="Smartphone" count={28} ratio={20} />
            <StatistiqueMateriel
              value="Tablette"
              count={28}
              ratio={20}
              rotateIcon={-90}
            />
            <StatistiqueMateriel value="Autre" count={28} ratio={20} />
            <StatistiqueMateriel value="Sans matériel" count={28} ratio={20} />
          </div>
        </div>
        <div className="fr-border fr-p-4w fr-border-radius--16">
          <div className="fr-grid-row">
            <div className="fr-col-6">
              <h3 className="fr-h6">Canaux d’accompagnements</h3>
            </div>
            <div className="fr-col-6">
              <h3 className="fr-h6">Durées des accompagnements</h3>
            </div>
          </div>
          <hr />
          <h3 className="fr-h6">Nombre d’accompagnements par lieux</h3>
        </div>
      </section>
      <section className="fr-mb-6w">
        <h2 className="fr-h5 fr-text-mention--grey">
          <span className="ri-user-heart-line fr-mr-1w" aria-hidden />
          Statistiques sur vos bénéficiaires
        </h2>
        <div className="fr-border fr-p-4w fr-border-radius--16">
          <h3 className="fr-h6">Genres</h3>
          <hr />
          <div className="fr-grid-row">
            <div className="fr-col-6">
              <h3 className="fr-h6">Tranches d’âge</h3>
            </div>
            <div className="fr-col-6">
              <h3 className="fr-h6">Statuts</h3>
            </div>
          </div>
          <hr />
          <h3 className="fr-h6">Commune de résidence des bénéficiaires</h3>
        </div>
      </section>
      <section>
        <h2 className="fr-h5 fr-text-mention--grey fr-flex fr-align-items-center fr-flex-gap-2v">
          <img src="/images/services/conseillers-numerique-logo-small.svg" />
          Statistiques départementales France Numérique Ensemble
        </h2>
        <StatistiquesTerritoriales codeDepartement="04" />
      </section>
    </main>
  </>
)

export default MesStatistiquesPage
