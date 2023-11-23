import classNames from 'classnames'
import Badge from '@codegouvfr/react-dsfr/Badge'
import { PriorisationCardInfo } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/priorisation/getPriorisationCardInfos'
import { numberToString } from '@app/web/utils/formatNumber'
import styles from './BesoinPriorisationCard.module.css'

const BesoinCardContent = ({
  index,
  card: { text, titre, autrePrecision, etpDetails },
}: {
  index: number
  card: PriorisationCardInfo
}) => (
  <div className={styles.content}>
    <div className={classNames('fr-mb-2v', styles.header)}>
      <p className="fr-text--lg fr-mb-0 fr-text--bold">{titre}</p>
      <Badge
        small
        className="fr-badge--blue-cumulus fr-flex-shrink-0 fr-ml-10v"
      >
        Priorité {index + 1}
      </Badge>
    </div>
    {etpDetails ? (
      <>
        <p className="fr-text-mention--grey fr-mb-2v">
          Besoins auxquels cette ressource serait dédiée&nbsp;:
        </p>
        <ul className="fr-my-0">
          {etpDetails.etpKeys.map((detail) => (
            <li key={detail.key}>
              {detail.text}
              {detail.autrePrecision && (
                <>
                  <br />- Autre besoin&nbsp;: {detail.autrePrecision}
                </>
              )}
              <strong> ({numberToString(detail.count)} ETP)</strong>
            </li>
          ))}
        </ul>
      </>
    ) : (
      <p className="fr-mb-0">
        {text}
        {autrePrecision && (
          <>
            <br />- Autre besoin&nbsp;: {autrePrecision}
          </>
        )}
      </p>
    )}
  </div>
)

export default BesoinCardContent
