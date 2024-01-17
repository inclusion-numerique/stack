import { PropsWithChildren } from 'react'

import classNames from 'classnames'
import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import CompleteOnboardingButton from '@app/web/app/nouveautes/CompleteOnboardingButton'
import CloseOnboardingButton from '@app/web/app/nouveautes/CloseOnboardingButton'
import styles from './TwoPartOnboardingLayout.module.css'

const totalSteps = 5

const TwoPartOnboardingLayout = ({
  illustrationBackground,
  illustrationSrc,
  illustrationLeft,
  illustrationTop,
  children,
  icon,
  nextHref,
  previousHref,
  user,
  stepIndex,
  title,
}: PropsWithChildren<
  {
    illustrationBackground: 'blue-france-925-125' | 'blue-france-975-75'
    illustrationSrc: string
    illustrationTop: number
    illustrationLeft: number
    // illustrationWidth: number
    title: string
    icon: string
    stepIndex: number
    previousHref: string
  } & ( // If no nexthref is provided, this is the last step (and the button will be a "Terminer" button with mutation to register)
    | { nextHref: string; user?: undefined }
    | { nextHref?: undefined; user: SessionUser | null }
  )
>) => (
  <>
    <CloseOnboardingButton mdBackground={illustrationBackground} />
    <div className={styles.content}>
      <div className={styles.innerContent}>
        <div className={styles.topContent}>
          <span className={classNames('fr-icon--lg', styles.icon, icon)} />

          <p
            className={classNames(
              'fr-text-mention--grey fr-text--bold fr-text--sm fr-mt-8v fr-mt-md-10v fr-mb-0',
              styles.steps,
            )}
          >
            {stepIndex} SUR {totalSteps}
          </p>

          <h2 className={styles.title}>{title}</h2>

          {children}
        </div>
        <div className={styles.buttons}>
          <Button
            iconId="fr-icon-arrow-left-line"
            title="Précédent"
            priority="secondary"
            linkProps={{
              href: previousHref,
            }}
          />
          {nextHref ? (
            <Button
              iconId="fr-icon-arrow-right-line"
              iconPosition="right"
              linkProps={{
                href: nextHref,
              }}
            >
              Suivant
            </Button>
          ) : (
            <CompleteOnboardingButton user={user} />
          )}
        </div>
      </div>
    </div>
    <div
      className={classNames(
        'fr-hidden fr-unhidden-md',
        {
          [styles.illustrationBackgroundBlueFrance925125]:
            illustrationBackground === 'blue-france-925-125',
          [styles.illustrationBackgroundBlueFrance97575]:
            illustrationBackground === 'blue-france-975-75',
        },
        styles.illustrationContainer,
      )}
      style={{
        paddingTop: illustrationTop,
        paddingLeft: illustrationLeft,
      }}
    >
      <img src={illustrationSrc} className={styles.illustration} alt="" />
    </div>
  </>
)

export default TwoPartOnboardingLayout
