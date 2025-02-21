import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import ActiviteBeneficiaireCardOpenModalLink from '@app/web/app/coop/(sidemenu-layout)/mes-beneficiaires/[beneficiaireId]/(consultation)/accompagnements/ActiviteBeneficiaireCardOpenModalLink'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'
import type { ActiviteForList } from '@app/web/cra/activitesQueries'
import { typeActiviteIllustrations, typeActiviteLabels } from '@app/web/cra/cra'
import { formatActiviteDayDate } from '@app/web/utils/activiteDayDateFormat'
import classNames from 'classnames'

const ActiviteMediateurCard = ({
  activite,
  displayDate = false,
}: {
  activite: ActiviteForList
  displayDate?: boolean
}) => {
  const spacer = <span className="fr-mx-2v">·</span>

  return (
    <div className="fr-py-2v fr-px-4v fr-flex fr-align-items-center fr-my-2v fr-enlarge-button fr-border-radius--8 fr-justify-content-start">
      <div className="fr-background-alt--blue-france fr-p-1v fr-border-radius--8 fr-flex fr-mr-4v">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="fr-display-block"
          alt=""
          src={typeActiviteIllustrations[activite.type]}
          style={{ width: 36, height: 36 }}
        />
      </div>
      <p className="fr-text--xs fr-text--bold fr-text--uppercase fr-mb-0 fr-whitespace-nowrap">
        {typeActiviteLabels[activite.type]}
      </p>
      {activite.titreAtelier ? (
        <p className="fr-text--medium fr-text--sm fr-text-mention--grey fr-mb-0 fr-ellipsis fr-whitespace-nowrap">
          {spacer}
          {activite.titreAtelier}
        </p>
      ) : null}
      <p className="fr-text--medium fr-text--sm fr-text-mention--grey fr-mb-0  fr-whitespace-nowrap">
        {spacer}
        {activite.type === 'Collectif' ? (
          <>
            <span className="fr-icon-group-line fr-mr-1w fr-icon--sm" />
            {activite.accompagnements.length} participant
            {sPluriel(activite.accompagnements.length)}
          </>
        ) : (
          <>
            <span className="fr-icon-user-line fr-mr-1w fr-icon--sm" />
            {getBeneficiaireDisplayName(
              activite.accompagnements[0]?.beneficiaire ?? {},
            )}
          </>
        )}
      </p>
      {displayDate && (
        <p
          className={classNames(
            'fr-text--xs fr-text-mention--grey fr-text--bold fr-text--uppercase flex-1 fr-ml-auto fr-pl-3w fr-my-4v fr-whitespace-nowrap',
            displayDate && 'fr-ml-auto',
          )}
        >
          {formatActiviteDayDate(activite.date)}
        </p>
      )}
      <span
        className={classNames(
          'fr-icon-more-line fr-pl-4v fr-text-title--blue-france',
          !displayDate && 'fr-ml-auto',
        )}
      />

      <ActiviteBeneficiaireCardOpenModalLink activite={activite} />
    </div>
  )
}

export default ActiviteMediateurCard
