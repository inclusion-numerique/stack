import { PropsWithChildren, ReactNode } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { inscriptionStepsCount } from '@app/web/app/inscription/(steps)/inscriptionSteps'

const InscriptionCard = ({
  children,
  title,
  backHref,
  nextStepTitle,
  titleClassName,
  stepNumber,
}: PropsWithChildren<{
  title: ReactNode
  titleClassName?: string
  backHref?: string
  nextStepTitle?: string
  stepNumber?: number
}>) => (
  <>
    {backHref && (
      <Link
        className="fr-link fr-display-inline-block fr-mt-12v fr-mb-10v fr-link--underline-on-hover"
        href={backHref}
      >
        <span className="fr-icon-arrow-left-line fr-icon--sm fr-mr-1w" />
        Précédent
      </Link>
    )}
    <div
      className={classNames(
        'fr-mb-32v fr-p-12v fr-width-full fr-border-radius--8 fr-background-default--grey',
        !backHref && 'fr-mt-32v',
      )}
    >
      {stepNumber && (
        <p className="fr-text--sm fr-text-mention--grey fr-mb-1v">
          Étape {stepNumber} sur {inscriptionStepsCount}
        </p>
      )}
      <h1
        className={classNames(
          'fr-h3',
          nextStepTitle ? 'fr-mb-2v' : 'fr-mb-12v',
          titleClassName,
        )}
      >
        {title}
      </h1>
      {nextStepTitle && (
        <p className="fr-text--xs fr-text-mention--grey fr-mb-12v">
          <b>Étape suivante&nbsp;:</b> {nextStepTitle}
        </p>
      )}
      {children}
    </div>
  </>
)

export default InscriptionCard
