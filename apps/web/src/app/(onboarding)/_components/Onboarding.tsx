import { PropsWithChildren, ReactNode } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { CloseButton } from './CloseButton'
import CompleteOnboardingButton from './CompleteOnboardingButton'

const Onboarding = ({
  image,
  children,
  previous,
  next,
  stepIndex,
  totalSteps,
  title,
  label,
  closeHref,
}: PropsWithChildren<{
  image: ReactNode
  title?: string
  label?: ReactNode
  stepIndex?: number
  totalSteps?: number
  previous?: { href: string }
  next?: { href: string; label?: string; isComplete?: boolean }
  closeHref: string
}>) => (
  <div className="fr-container-fluid">
    <div className="fr-grid-row fr-height-full">
      <div className="fr-col-md-6 fr-col-12">
        <div className="fr-flex fr-align-items-center fr-mx-auto fr-height-full ">
          <div
            className="fr-mx-auto fr-p-4w fr-flex fr-direction-column fr-flex-gap-4v fr-justify-content-space-between"
            style={{ maxWidth: '486px', height: '700px' }}
          >
            <div>
              {label != null && (
                <span className="fr-text--lg fr-text--bold fr-text-label--blue-france fr-background-alt--blue-france fr-border-radius--8 fr-p-2w fr-mb-1w fr-inline-flex fr-align-items-center">
                  {label}
                </span>
              )}
              {stepIndex && totalSteps && (
                <p className="fr-text-mention--grey fr-text--bold fr-text--sm fr-mt-8v fr-mt-md-10v fr-mb-0">
                  {stepIndex} SUR {totalSteps}
                </p>
              )}
              {title && <h1 className="fr-h2 fr-my-2w">{title}</h1>}
              {children}
            </div>
            <div className="fr-flex fr-flex-gap-4v fr-direction-row-reverse">
              {next &&
                (next.isComplete ? (
                  <CompleteOnboardingButton
                    className="fr-mr-auto"
                    next={next}
                  />
                ) : (
                  <Button
                    className="fr-mr-auto"
                    iconId="fr-icon-arrow-right-line"
                    title={next.label ?? 'Suivant'}
                    iconPosition="right"
                    linkProps={{ href: next.href }}
                  >
                    {next.label ?? 'Suivant'}
                  </Button>
                ))}
              {previous && (
                <Button
                  iconId="fr-icon-arrow-left-line"
                  title="Précédent"
                  priority="secondary"
                  linkProps={{
                    href: previous.href,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="fr-col-6 fr-hidden fr-unhidden-md fr-background-alt--blue-france">
        <div className="fr-flex fr-align-items-center fr-mx-auto fr-p-8w">
          {image}
        </div>
      </div>
    </div>
    <CloseButton closeHref={closeHref} />
  </div>
)

export default Onboarding
