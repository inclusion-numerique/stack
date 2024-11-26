import { MesStatistiquesPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/getMesStatistiquesPageData'
import { AccompagnementPieChart } from '../_components/AccompagnementPieChart'
import ProgressBar from '../_components/ProgressBar'
import { QuantifiedShareLegend } from '../_components/QuantifiedShareLegend'
import { QuantifiedShareList } from '../_components/QuantifiedShareList'
import {
  communeColor,
  genresColors,
  statusColors,
  tranchesAgeColors,
} from './colors'

const toProgress = ({
  label,
  count,
  proportion,
}: {
  label: string
  count?: number
  proportion: number
}) => ({
  label,
  count,
  percentage: proportion,
})

export const StatistiquesBeneficiairesPrint = ({
  beneficiaires,
}: MesStatistiquesPageData) => {
  const totalWithGenre = beneficiaires.genres.reduce(
    (total: number, { count, value }) =>
      value === 'NonCommunique' ? total : total + count,
    0,
  )

  const totalWithTrancheAge = beneficiaires.trancheAges.reduce(
    (total: number, { count, value }) =>
      value === 'NonCommunique' ? total : total + count,
    0,
  )

  const totalWithStatut = beneficiaires.statutsSocial.reduce(
    (total: number, { count, value }) =>
      value === 'NonCommunique' ? total : total + count,
    0,
  )

  const totalWithCommune = beneficiaires.communes.reduce(
    (total: number, { count }) => total + count,
    0,
  )

  return (
    <>
      <h2 className="fr-h3">Statistiques sur vos bénéficiaires</h2>
      <h3 className="fr-h5 fr-mb-2v fr-mt-6v">Genres</h3>
      <small role="note" className="fr-mb-6v fr-display-block">
        Les statistiques prennent en compte les bénéficiaires suivis et anonymes
        dont le genre a été complété.
        <br />
        Total des bénéficiaires dont le genre a été complété&nbsp;:{' '}
        {totalWithGenre}/{beneficiaires.total} bénéficiaires suivis ou anonymes
      </small>
      <div className="fr-flex fr-align-items-center">
        <AccompagnementPieChart
          size={128}
          data={beneficiaires.genres}
          colors={genresColors}
          isAnimationActive={false}
        />
        <QuantifiedShareLegend
          classeName="fr-pl-3w"
          quantifiedShares={beneficiaires.genres}
          colors={genresColors}
        />
      </div>
      <h3 className="fr-h5 fr-mb-2v fr-mt-6v">Tranches d’âge</h3>
      <small role="note" className="fr-mb-6v fr-display-block">
        Les statistiques prennent en compte les bénéficiaires suivis et anonymes
        dont l’année de naissance ou la tranche d’âge a été complétée.
        <br />
        Total des bénéficiaires dont la tranche d’âge a été complétée&nbsp;:{' '}
        {totalWithTrancheAge}/{beneficiaires.total} bénéficiaires suivis ou
        anonymes
      </small>

      <div>
        <div className="fr-mr-3w fr-mb-2w">
          <ProgressBar
            size="large"
            progress={beneficiaires.trancheAges.map(toProgress)}
            colors={tranchesAgeColors}
            tooltopKey="tranches-age"
          />
        </div>
        <QuantifiedShareLegend
          quantifiedShares={beneficiaires.trancheAges}
          colors={tranchesAgeColors}
        />
      </div>

      <h3 className="fr-h5 fr-mb-2v fr-mt-6v">Statuts</h3>
      <small role="note" className="fr-mb-6v fr-display-block">
        Les statistiques prennent en compte les bénéficiaires suivis et anonymes
        dont le statut a été complété.
        <br />
        Total des bénéficiaires dont le statut a été complété&nbsp;:{' '}
        {totalWithStatut}/{beneficiaires.total} bénéficiaires suivis ou anonymes
      </small>
      <div className="fr-mr-3w fr-mb-2w">
        <ProgressBar
          size="large"
          progress={beneficiaires.statutsSocial.map(toProgress)}
          colors={statusColors}
          tooltopKey="status-beneficiaires"
        />
      </div>
      <QuantifiedShareLegend
        quantifiedShares={beneficiaires.statutsSocial}
        colors={statusColors}
      />
      <h3 className="fr-h5 fr-mb-2v fr-mt-6v">
        Commune de résidence des bénéficiaires
      </h3>
      <small role="note" className="fr-mb-6v fr-display-block">
        Les statistiques prennent en compte les bénéficiaires suivis et anonymes
        dont la commune de résidence a été complétée.
        <br />
        Total des bénéficiaires dont la commune de résidence a été
        complétée&nbsp;: {totalWithCommune}/{beneficiaires.total} bénéficiaires
        suivis ou anonymes
      </small>
      <QuantifiedShareList
        order="desc"
        quantifiedShares={beneficiaires.communes}
        colors={[communeColor]}
      />
    </>
  )
}
