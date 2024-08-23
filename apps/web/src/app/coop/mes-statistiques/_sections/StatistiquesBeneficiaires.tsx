import Button from '@codegouvfr/react-dsfr/Button'
import { AccompagnementPieChart } from '../_components/AccompagnementPieChart'
import ProgressBar from '../_components/ProgressBar'
import { QuantifiedShareList } from '../_components/QuantifiedShareList'
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
const communeColor = '#6A6AF4'

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

const toTotalCount = (total: number, { count }: QuantifiedShare) =>
  total + count

const toTotalCountExcept =
  (except: string) =>
  (total: number, { count, label }: QuantifiedShare) =>
    label === except ? total : total + count

export const StatistiquesBeneficiaires = ({
  genresBeneficiaires,
  tranchesAgeBeneficiaires,
  statusBeneficiaires,
  communesBeneficiaires,
}: {
  genresBeneficiaires: QuantifiedShare[]
  tranchesAgeBeneficiaires: QuantifiedShare[]
  statusBeneficiaires: QuantifiedShare[]
  communesBeneficiaires: QuantifiedShare[]
}) => (
  <>
    <h2 className="fr-h5 fr-text-mention--grey">
      <span className="ri-user-heart-line fr-mr-1w" aria-hidden />
      Statistiques sur vos bénéficiaires
    </h2>
    <div className="fr-border fr-p-4w fr-border-radius--16">
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-lg-6 fr-col-12">
          <div className="fr-mb-0 fr-col fr-flex fr-align-items-center fr-mb-3w">
            <h3 className="fr-text--lg fr-mb-0">Genres</h3>
            <Button
              className="fr-px-1v fr-ml-1v"
              title="Plus d’information à propos des genres"
              priority="tertiary no outline"
              size="small"
              type="button"
              aria-describedby="tooltip-genres"
            >
              <span className="ri-information-line fr-text--lg" aria-hidden />
            </Button>
            <span
              className="fr-tooltip fr-placement"
              id="tooltip-genres"
              role="tooltip"
              aria-hidden
            >
              Les statistiques prennent en compte les bénéficiaires suivis et
              anonymes dont le genre a été complété.
              <br />
              <br />
              Total des bénéficiaires dont le genre a été complété :{' '}
              {genresBeneficiaires.reduce(
                toTotalCountExcept('Non communiqué'),
                0,
              )}
              /{genresBeneficiaires.reduce(toTotalCount, 0)} bénéficiaires
              suivis ou anonymes
            </span>
          </div>
          <QuantifiedShareLegend
            quantifiedShares={genresBeneficiaires}
            colors={grenresColors}
          />
        </div>
        <div className="fr-col-lg-6 fr-col-12">
          <AccompagnementPieChart
            size={140}
            className="fr-mx-auto"
            data={genresBeneficiaires}
            colors={grenresColors}
          />
        </div>
      </div>
      <hr className="fr-separator-1px fr-my-5w" />
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-lg-6 fr-col-12">
          <div className="fr-mb-0 fr-col fr-flex fr-align-items-center fr-mb-3w">
            <h3 className="fr-text--lg fr-mb-0">Tranches d’âge</h3>
            <Button
              className="fr-px-1v fr-ml-1v"
              title="Plus d’information à propos des tranches d’âge"
              priority="tertiary no outline"
              size="small"
              type="button"
              aria-describedby="tooltip-tranches-age"
            >
              <span className="ri-information-line fr-text--lg" aria-hidden />
            </Button>
            <span
              className="fr-tooltip fr-placement"
              id="tooltip-tranches-age"
              role="tooltip"
              aria-hidden
            >
              Les statistiques prennent en compte les bénéficiaires suivis et
              anonymes dont l’année de naissance ou la tranche d’âge a été
              complétée.
              <br />
              <br />
              Total des bénéficiaires dont la tranche d’âge a été complété :{' '}
              {tranchesAgeBeneficiaires.reduce(
                toTotalCountExcept('Non communiqué'),
                0,
              )}
              /{tranchesAgeBeneficiaires.reduce(toTotalCount, 0)} bénéficiaires
              suivis ou anonymes
            </span>
          </div>
          <div className="fr-mr-3w fr-mb-2w">
            <ProgressBar
              size="large"
              progress={tranchesAgeBeneficiaires.map(toProgress)}
              colors={tranchesAgeColors}
            />
          </div>
          <QuantifiedShareLegend
            quantifiedShares={tranchesAgeBeneficiaires}
            colors={tranchesAgeColors}
          />
        </div>
        <div className="fr-col-lg-6 fr-col-12">
          <div className="fr-mb-0 fr-col fr-flex fr-align-items-center fr-mb-3w">
            <h3 className="fr-text--lg fr-mb-0">Statuts</h3>
            <Button
              className="fr-px-1v fr-ml-1v"
              title="Plus d’information à propos des statuts"
              priority="tertiary no outline"
              size="small"
              type="button"
              aria-describedby="tooltip-statuts"
            >
              <span className="ri-information-line fr-text--lg" aria-hidden />
            </Button>
            <span
              className="fr-tooltip fr-placement"
              id="tooltip-statuts"
              role="tooltip"
              aria-hidden
            >
              Les statistiques prennent en compte les bénéficiaires suivis et
              anonymes dont le statut a été complété.
              <br />
              <br />
              Total des bénéficiaires dont le statut a été complété :{' '}
              {statusBeneficiaires.reduce(
                toTotalCountExcept('Non communiqué ou hétérogène'),
                0,
              )}
              /{statusBeneficiaires.reduce(toTotalCount, 0)} bénéficiaires
              suivis ou anonymes
            </span>
          </div>
          <div className="fr-mr-3w fr-mb-2w">
            <ProgressBar
              size="large"
              progress={statusBeneficiaires.map(toProgress)}
              colors={statusColors}
            />
          </div>
          <QuantifiedShareLegend
            quantifiedShares={statusBeneficiaires}
            colors={statusColors}
          />
        </div>
      </div>
      <hr className="fr-separator-1px fr-my-5w" />

      <div className="fr-mb-0 fr-col fr-flex fr-align-items-center fr-mb-3w">
        <h3 className="fr-text--lg fr-mb-0">
          Commune de résidence des bénéficiaires
        </h3>
        <Button
          className="fr-px-1v fr-ml-1v"
          title="Plus d’information à propos des communes de résidence des bénéficiaires"
          priority="tertiary no outline"
          size="small"
          type="button"
          aria-describedby="tooltip-communes-beneficiaires"
        >
          <span className="ri-information-line fr-text--lg" aria-hidden />
        </Button>
        <span
          className="fr-tooltip fr-placement"
          id="tooltip-communes-beneficiaires"
          role="tooltip"
          aria-hidden
        >
          Les statistiques prennent en compte les bénéficiaires suivis et
          anonymes dont la commune de résidence a été complétée.
          <br />
          <br />
          Total des bénéficiaires dont la commune de résidence a été complété :{' '}
          {communesBeneficiaires.reduce(
            toTotalCountExcept('Non communiqué'),
            0,
          )}
          /{communesBeneficiaires.reduce(toTotalCount, 0)} bénéficiaires suivis
          ou anonymes
        </span>
      </div>

      <div className="fr-text--bold fr-text--uppercase fr-text--sm fr-text-mention--grey fr-mb-1w">
        Commune
      </div>
      <QuantifiedShareList
        limit={{
          showLabel: 'Voir toutes les communes',
          hideLabel: 'Réduire',
          count: 5,
        }}
        quantifiedShares={communesBeneficiaires}
        colors={[communeColor]}
      />
    </div>
  </>
)
