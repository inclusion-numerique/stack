import React, { PropsWithChildren, ReactNode } from 'react'
import classNames from 'classnames'
import BackButton from '@app/web/components/BackButton'

const InscriptionCard = ({
  children,
  title,
  backHref,
  nextStepTitle,
  titleClassName,
  stepNumber,
  totalSteps,
  subtitle,
}: PropsWithChildren<{
  title: ReactNode
  titleClassName?: string
  backHref?: string
  nextStepTitle?: string
  stepNumber?: number
  totalSteps?: number
  subtitle?: ReactNode
}>) => (
  <>
    {backHref && (
      <div className="fr-mb-6v fr-mt-10v">
        <BackButton href={backHref}>Précédent</BackButton>
      </div>
    )}

    <div
      className={classNames(
        'fr-mb-32v fr-p-12v fr-width-full fr-border-radius--8 fr-background-default--grey',
        !backHref && 'fr-mt-32v',
      )}
    >
      {stepNumber && totalSteps && (
        <p className="fr-text--sm fr-text-mention--grey fr-mb-1v">
          Étape {stepNumber} sur {totalSteps}
        </p>
      )}
      <h1
        className={classNames(
          'fr-h3',
          nextStepTitle || subtitle ? 'fr-mb-2v' : 'fr-mb-12v',
          titleClassName,
        )}
      >
        {title}
      </h1>
      {nextStepTitle && (
        <p
          className={classNames(
            'fr-text--xs fr-text-mention--grey',
            subtitle ? 'fr-mb-4v' : 'fr-mb-12v',
          )}
        >
          <b>Étape suivante&nbsp;:</b> {nextStepTitle}
        </p>
      )}
      {subtitle && <p className="fr-mt-4v fr-mb-12v">{subtitle}</p>}
      {children}
    </div>
  </>
)

export default InscriptionCard
