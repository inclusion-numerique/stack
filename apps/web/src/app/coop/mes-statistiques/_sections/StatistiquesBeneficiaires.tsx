import { AccompagnementPieChart } from '../_components/AccompagnementPieChart'
import ProgressBar from '../_components/ProgressBar'
import { ProgressListItem } from '../_components/ProgressListItem'
import { QuantifiedShareLegend } from '../_components/QuantifiedShareLegend'
import { QuantifiedShare } from '../quantifiedShare'

const tranchesAgeColors = [
  '#00AC8C',
  '#FF6F4C',
  '#CAC5B0',
  '#5770BE',
  '#FF0185',
  '#F88AEF',
  '#E3E3FD',
]
const statusColors = ['#FFF480', '#B68B65', '#A3A6BC', '#C6C6FB', '#FFDBD2']
const grenresColors = ['#C08C65', '#009099', '#E3E3FD']
const communeDesBeneficiairesColor = '#6A6AF4'

const toProgress = ({
  label,
  proportion,
}: {
  label: string
  proportion: number
}) => ({
  label,
  value: proportion,
})

export const StatistiquesBeneficiaires = ({
  genres,
  tranchesAge,
  status,
  communesDesBeneficiaires,
}: {
  genres: QuantifiedShare[]
  tranchesAge: QuantifiedShare[]
  status: QuantifiedShare[]
  communesDesBeneficiaires: QuantifiedShare[]
}) => (
  <>
    <h2 className="fr-h5 fr-text-mention--grey">
      <span className="ri-user-heart-line fr-mr-1w" aria-hidden />
      Statistiques sur vos bénéficiaires
    </h2>
    <div className="fr-border fr-p-4w fr-border-radius--16">
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-lg-6 fr-col-12">
          <h3 className="fr-h6">Genres</h3>
          <QuantifiedShareLegend
            quantifiedShares={genres}
            colors={grenresColors}
          />
        </div>
        <div className="fr-col-lg-6 fr-col-12">
          <AccompagnementPieChart
            size={140}
            className="fr-mx-auto"
            data={genres}
            colors={grenresColors}
          />
        </div>
      </div>
      <hr className="fr-separator-1px fr-my-5w" />
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-lg-6 fr-col-12">
          <h3 className="fr-h6">Tranches d’âge</h3>
          <div className="fr-mr-3w fr-mb-2w">
            <ProgressBar
              size="large"
              progress={tranchesAge.map(toProgress)}
              colors={tranchesAgeColors}
            />
          </div>
          <QuantifiedShareLegend
            quantifiedShares={tranchesAge}
            colors={tranchesAgeColors}
          />
        </div>
        <div className="fr-col-lg-6 fr-col-12">
          <h3 className="fr-h6">Statuts</h3>
          <div className="fr-mr-3w fr-mb-2w">
            <ProgressBar
              size="large"
              progress={status.map(toProgress)}
              colors={statusColors}
            />
          </div>
          <QuantifiedShareLegend
            quantifiedShares={status}
            colors={statusColors}
          />
        </div>
      </div>
      <hr className="fr-separator-1px fr-my-5w" />
      <h3 className="fr-h6">Commune de résidence des bénéficiaires</h3>
      <div className="fr-text--bold fr-text--uppercase fr-text--sm fr-text-mention--grey fr-mb-1w">
        Commune
      </div>
      {communesDesBeneficiaires.map((communeDesBeneficiaires) => (
        <ProgressListItem
          {...communeDesBeneficiaires}
          key={communeDesBeneficiaires.label}
          colors={[communeDesBeneficiairesColor]}
        />
      ))}
    </div>
  </>
)
