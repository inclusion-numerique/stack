import {
  accompagnementTypeIllustrations,
  accompagnementTypeLabels,
} from '@app/web/cra/cra'
import ActiviteBeneficiaireCardOpenModalLink from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/accompagnements/ActiviteBeneficiaireCardOpenModalLink'
import { Activite } from '@app/web/cra/activitesQueries'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'

const ActiviteMediateurCard = ({ activite }: { activite: Activite }) => {
  const spacer = <span className="fr-mx-2v">·</span>

  return (
    <div className="fr-py-2v fr-px-4v fr-flex fr-align-items-center fr-my-2v fr-enlarge-button fr-border-radius--8 fr-justify-content-start">
      <div className="fr-background-alt--blue-france fr-p-1v fr-border-radius--8 fr-flex fr-mr-4v">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="fr-display-block"
          alt=""
          src={accompagnementTypeIllustrations[activite.type]}
          style={{ width: 36, height: 36 }}
        />
      </div>
      <p className="fr-text--xs fr-text--bold fr-text--uppercase fr-mb-0 fr-whitespace-nowrap">
        {accompagnementTypeLabels[activite.type]}
      </p>
      {activite.type === 'collectif' && activite.cra.titreAtelier ? (
        <p className="fr-text--medium fr-text--sm fr-text-mention--grey fr-mb-0 fr-ellipsis fr-whitespace-nowrap">
          {spacer}
          {activite.cra.titreAtelier}
        </p>
      ) : null}
      <p className="fr-text--medium fr-text--sm fr-text-mention--grey fr-mb-0  fr-whitespace-nowrap">
        {spacer}
        {'beneficiaire' in activite.cra && (
          <>
            <span className="fr-icon-user-line fr-mr-1w fr-icon--sm" />
            {getBeneficiaireDisplayName(activite.cra.beneficiaire)}
          </>
        )}
        {'participants' in activite.cra && (
          <>
            <span className="fr-icon-group-line fr-mr-1w fr-icon--sm" />
            {activite.cra.participants.length +
              activite.cra.participantsAnonymes.total}{' '}
            participants
          </>
        )}
      </p>

      <ActiviteBeneficiaireCardOpenModalLink activite={activite} />
    </div>
  )
}

export default ActiviteMediateurCard
