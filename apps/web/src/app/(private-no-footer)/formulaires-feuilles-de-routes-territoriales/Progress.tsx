import classNames from 'classnames'
import styles from './Progress.module.css'

const totalProgression = 5

const segmentsList = Array.from({ length: totalProgression }).map(
  (_, index) => index,
)

const Progress = ({
  progression,
  currentTitle,
  nextTitle,
}: {
  progression: number
  currentTitle: string
  nextTitle?: string
}) => (
  <div className={styles.container}>
    <p className={styles.progressionInfo}>
      Étape {progression} sur {totalProgression}
    </p>
    <h1 className={styles.currentTitle}>{currentTitle}</h1>
    <div className={styles.bar}>
      {segmentsList.map((index) => (
        <div
          key={index}
          className={classNames(
            styles.segment,
            progression > index && styles.filled,
          )}
        />
      ))}
    </div>
    {!!nextTitle && (
      <p className={styles.nextInfo}>
        <span className="fr-text--bold">Étape suivante&nbsp;:</span> {nextTitle}
      </p>
    )}
  </div>
)

export default Progress
