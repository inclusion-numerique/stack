import { Fragment } from 'react'
import { BeneficiaireAccompagnementsPageData } from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/accompagnements/getBeneficiaireAccompagnementsPageData'
import ActiviteBeneficiaireCard from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/accompagnements/ActiviteBeneficiaireCard'
import { formatActiviteDayDate } from '@app/web/utils/activiteDayDateFormat'
import BeneficiairePageNavigationBar from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/BeneficiairePageNavigationBar'

const ViewBeneficiaireAccompagnementsPage = ({
  data: { activitesByDate, beneficiaire, totalCrasCount },
}: {
  data: BeneficiaireAccompagnementsPageData
}) => (
  <>
    <BeneficiairePageNavigationBar
      beneficiaireId={beneficiaire.id}
      accompagnementsCount={totalCrasCount}
      current="accompagnements"
    />
    {activitesByDate.length === 0 && (
      <div className="fr-border-radius--8 fr-border  fr-py-8v fr-px-8v fr-mt-6v fr-text--center">
        <p className="fr-text--sm fr-mb-0">
          Aucun accompagnement pour le moment
        </p>
      </div>
    )}
    {activitesByDate.map(({ date, activites }) => (
      <Fragment key={new Date(date).toISOString()}>
        <h3 className="fr-text--xs fr-text-mention--grey fr-text--bold fr-text--uppercase fr-my-4v">
          {formatActiviteDayDate(date)}
        </h3>
        {activites.map((activite) => (
          <ActiviteBeneficiaireCard key={activite.id} activite={activite} />
        ))}
      </Fragment>
    ))}
  </>
)

export default ViewBeneficiaireAccompagnementsPage
