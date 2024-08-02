import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { StatistiquesTerritoriales } from './_components/StatistiquesTerritoriales'
import { StatistiquesAccompagnements } from './_sections/StatistiquesAccompagnements'
import { StatistiquesBeneficiaires } from './_sections/StatistiquesBeneficiaires'
import { StatistiquesGenerales } from './_sections/StatistiquesGenerales'
import {
  AccompagnementLabel,
  MaterielLabel,
  QuantifiedShare,
} from './quantifiedShare'

type MesStatistiquesProps = {
  modalitesAccompagnement: (QuantifiedShare<AccompagnementLabel> & {
    participants?: number
  })[]
  materielUtilise: QuantifiedShare<MaterielLabel>[]
  thematiquesAccompagnement: QuantifiedShare[]
  nombreAccompagnementsParLieu: QuantifiedShare[]
  communesDesBeneficiaires: QuantifiedShare[]
  nombreAccompagnements: QuantifiedShare[]
  accompagnementBeneficiaires: {
    accompagnements: number
    beneficiaires: number
    anonymes: number
  }
  canauxAccompagnement: QuantifiedShare[]
  dureesAccompagnement: QuantifiedShare[]
  genres: QuantifiedShare[]
  tranchesAge: QuantifiedShare[]
  status: QuantifiedShare[]
}

export const MesStatistiques = ({
  modalitesAccompagnement,
  materielUtilise,
  thematiquesAccompagnement,
  nombreAccompagnementsParLieu,
  nombreAccompagnements,
  accompagnementBeneficiaires,
  canauxAccompagnement,
  dureesAccompagnement,
  genres,
  tranchesAge,
  status,
  communesDesBeneficiaires,
}: MesStatistiquesProps) => (
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
        <StatistiquesGenerales
          nombreAccompagnements={nombreAccompagnements}
          accompagnementBeneficiaires={accompagnementBeneficiaires}
        />
      </section>
      <section className="fr-mb-6w">
        <StatistiquesAccompagnements
          modalitesAccompagnement={modalitesAccompagnement}
          materielUtilise={materielUtilise}
          thematiquesAccompagnement={thematiquesAccompagnement}
          canauxAccompagnement={canauxAccompagnement}
          dureesAccompagnement={dureesAccompagnement}
          nombreAccompagnementsParLieu={nombreAccompagnementsParLieu}
        />
      </section>
      <section className="fr-mb-6w">
        <StatistiquesBeneficiaires
          genres={genres}
          tranchesAge={tranchesAge}
          status={status}
          communesDesBeneficiaires={communesDesBeneficiaires}
        />
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
