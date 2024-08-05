import BeneficiairePageNavigationBar from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/BeneficiairePageNavigationBar'
import { BeneficiaireInformationsData } from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(informations)/getBeneficiaireInformationsData'

const ViewBeneficiaireInformationsPage = ({
  data: { beneficiaire, totalCrasCount },
}: {
  data: BeneficiaireInformationsData
}) => {
  return (
    <>
      <BeneficiairePageNavigationBar
        beneficiaireId={beneficiaire.id}
        accompagnementsCount={totalCrasCount}
        current="informations"
      />
      <div className="fr-border-radius--8 fr-border  fr-pt-8v fr-px-7v fr-pb-10v fr-mt-6v">
        <h2 className="fr-h6 fr-mb-1v">Thématiques d’accompagnements</h2>
        <p className="fr-text--xs fr-text-mention--grey">
          Retrouvez les thématiques d’accompagnements vues avec ce bénéficiaire.
        </p>
      </div>
    </>
  )
}

export default ViewBeneficiaireInformationsPage
