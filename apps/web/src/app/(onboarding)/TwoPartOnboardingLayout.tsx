import { PropsWithChildren } from 'react'

import classNames from 'classnames'
import Button from '@codegouvfr/react-dsfr/Button'
import CloseOnboardingButton from '@app/web/app/(onboarding)/CloseOnboardingButton'
import styles from './TwoPartOnboardingLayout.module.css'

const TwoPartOnboardingLayout = ({
  illustrationBackground,
  illustrationSrc,
  illustrationMaxWidth,
  children,
  nextHref,
  previousHref,
  stepIndex,
  totalSteps,
  title,
  titleClassName,
}: PropsWithChildren<{
  illustrationBackground: 'blue-france-925-125' | 'blue-france-975-75'
  illustrationSrc: string
  illustrationMaxWidth: number
  // illustrationWidth: number
  title?: string
  titleClassName?: string
  stepIndex?: number
  totalSteps?: number
  previousHref?: string
  nextHref?: string
}>) => (
  <>
    <CloseOnboardingButton mdBackground={illustrationBackground} />
    {/* Content is half left part */}
    <div className={styles.content}>
      {/* Inner content to be allow to center it horizontally */}
      <div className={styles.innerContent}>
        {/* Part that is scrollable */}
        <div className={styles.topContent}>
          {!!stepIndex && !!totalSteps && (
            <p
              className={classNames(
                'fr-text-mention--grey fr-text--bold fr-text--sm fr-mt-8v fr-mt-md-10v fr-mb-0',
                styles.steps,
              )}
            >
              {stepIndex} SUR {totalSteps}
            </p>
          )}

          {!!title && (
            <h1 className={classNames('fr-h2', styles.title, titleClassName)}>
              {title}
            </h1>
          )}

          {children}
        </div>
        {/* Button are at the bottom to always be at same y */}
        <div className={styles.buttons}>
          {!!previousHref && (
            <Button
              iconId="fr-icon-arrow-left-line"
              title="Précédent"
              priority="secondary"
              linkProps={{
                href: previousHref,
              }}
            />
          )}
          {!!nextHref && (
            <Button
              iconId="fr-icon-arrow-right-line"
              iconPosition="right"
              linkProps={{
                href: nextHref,
              }}
            >
              Suivant
            </Button>
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
    >
      <div
        className={styles.illustrationWrapper}
        style={{
          maxWidth: illustrationMaxWidth,
        }}
      >
        <img src={illustrationSrc} className={styles.illustration} alt="" />
      </div>
    </div>
  </>
)

export default TwoPartOnboardingLayout
