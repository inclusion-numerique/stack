import classNames from 'classnames'
import Button from '@codegouvfr/react-dsfr/Button'
import Badge from '@codegouvfr/react-dsfr/Badge'
import WhiteCard from '@app/web/ui/WhiteCard'
import { PriorisationCardInfo } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/priorisation/getPriorisationCardInfos'
import { numberToString } from '@app/web/utils/formatNumber'
import styles from './BesoinPriorisationCard.module.css'

const BesoinPriorisationCard = ({
  index,
  card: { prioriteKey, text, titre, autrePrecision, etpDetails },
  isLast,
  loading,
  onPriorityKeyDown,
  onPriorityKeyUp,
}: {
  index: number
  card: PriorisationCardInfo
  isLast: boolean
  loading: boolean
  onPriorityKeyUp: (key: string, from: number) => void
  onPriorityKeyDown: (key: string, from: number) => void
}) => {
  const canUp = index > 0
  const onUp = () => {
    if (!canUp) {
      return
    }
    onPriorityKeyUp(prioriteKey, index)
  }

  const canDown = !isLast
  const onDown = () => {
    if (!canDown) {
      return
    }
    onPriorityKeyDown(prioriteKey, index)
  }
  return (
    <WhiteCard className={classNames('fr-p-6v fr-mt-4v', styles.card)}>
      <div className={styles.buttons}>
        <Button
          disabled={loading}
          size="small"
          priority="tertiary"
          type="button"
          onClick={onUp}
          title="Augmenter la priorité"
          iconId="fr-icon-arrow-up-s-line"
        />
        <Button
          disabled={loading}
          size="small"
          priority="tertiary"
          type="button"
          onClick={onDown}
          title="Diminuer la priorité"
          iconId="fr-icon-arrow-down-s-line"
        />
      </div>
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
                  <strong> ( {numberToString(detail.count)} ETP )</strong>
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
    </WhiteCard>
  )
}

export default BesoinPriorisationCard
