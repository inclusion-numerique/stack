import classNames from 'classnames'
import Button from '@codegouvfr/react-dsfr/Button'
import { PriorisationCardInfo } from '@app/web/app/(private-with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/priorisation/getPriorisationCardInfos'
import BesoinCardContent from '@app/web/app/(private-with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/priorisation/BesoinCardContent'
import WhiteCard from '@app/web/ui/WhiteCard'
import styles from './BesoinPriorisationCard.module.css'

const BesoinPriorisationCard = ({
  index,
  card,
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
  const { prioriteKey } = card
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
      <BesoinCardContent index={index} card={card} />
    </WhiteCard>
  )
}

export default BesoinPriorisationCard
