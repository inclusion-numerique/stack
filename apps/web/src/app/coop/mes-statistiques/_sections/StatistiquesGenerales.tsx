import { AccompagnementBarChart } from '../_components/AccompagnementBarChart'
import { QuantifiedShare } from '../quantifiedShare'

export const StatistiquesGenerales = ({
  nombreAccompagnements,
  accompagnementBeneficiaires: { accompagnements, beneficiaires, anonymes },
}: {
  nombreAccompagnements: QuantifiedShare[]
  accompagnementBeneficiaires: {
    accompagnements: number
    beneficiaires: number
    anonymes: number
  }
}) => (
  <>
    <h2 className="fr-h5 fr-text-mention--grey">
      <span className="ri-line-chart-line fr-mr-1w" aria-hidden />
      Statistiques générales sur votre activité
    </h2>
    <div className="fr-grid-row fr-flex-gap-6v">
      <div className="fr-flex fr-direction-column fr-flex-gap-6v fr-col-xl-4 fr-col-12">
        <div className="fr-p-3w fr-border-radius--16 fr-background-alt--brown-caramel fr-width-full">
          <div className="fr-flex fr-align-items-center fr-justify-content-space-between">
            <span className="fr-h2 fr-mb-0">{accompagnements}</span>
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
            <span className="fr-h2 fr-mb-0">{beneficiaires + anonymes}</span>
            <span
              className="ri-user-heart-line ri-2x fr-text-label--brown-caramel"
              aria-hidden
            />
          </div>
          <div className="fr-text--bold fr-my-1w">
            Bénéficiaires accompagnés
          </div>
          <div className="fr-text-mention--grey">
            <div>{beneficiaires} bénéficiaires suivis</div>
            <div>{anonymes} bénéficiaires anonymes</div>
          </div>
        </div>
      </div>
      <div className="fr-col fr-border fr-p-3w fr-border-radius--16">
        <div className="fr-h4 fr-mb-3w">Nombre d’accompagnements</div>
        <AccompagnementBarChart data={nombreAccompagnements} />
      </div>
    </div>
  </>
)
