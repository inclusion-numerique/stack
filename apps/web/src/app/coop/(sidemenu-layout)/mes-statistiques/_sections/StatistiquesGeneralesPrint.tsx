import type { MesStatistiquesPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/getMesStatistiquesPageData'
import { AccompagnementBarChart } from '../_components/AccompagnementBarChart'

export const StatistiquesGeneralesPrint = ({
  totalCounts,
  accompagnementsParMois,
  accompagnementsParJour,
}: MesStatistiquesPageData) => (
  <>
    <h2 className="fr-h3">Statistiques générales sur vos accompagnements</h2>
    <h3 className="fr-h5">Accompagnements et bénéficiaires</h3>
    <p>
      <strong>{totalCounts.beneficiaires.total} Bénéficiaires</strong>{' '}
      accompagnés, dont{' '}
      <strong>{totalCounts.beneficiaires.suivis} bénéficiaires suivis</strong>{' '}
      et{' '}
      <strong>
        {totalCounts.beneficiaires.anonymes} bénéficiaires anonymes
      </strong>
    </p>
    <p>
      <strong>{totalCounts.accompagnements.total} accompagnements</strong> au
      total
      <br />
      <small role="note" className="fr-mb-6v fr-display-block">
        *Les ateliers collectifs comptent pour 1 accompagnement par
        participation.
        <br />
        Ex : Un atelier collectif avec 10 participations compte pour 10
        accompagnements.
      </small>
    </p>
    <h3 className="fr-h5 fr-mt-6v">Nombre d’accompagnements par mois</h3>
    <AccompagnementBarChart data={accompagnementsParMois} />
    <h3 className="fr-h5 fr-mt-6v">Nombre d’accompagnements par jour</h3>
    <AccompagnementBarChart data={accompagnementsParJour} />
  </>
)
