import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { ReactNode, forwardRef } from 'react'

type TriggerButtonProps = {
  isOpen: boolean
  isFilled?: boolean
  children: ReactNode
}

const TriggerButton = forwardRef<HTMLButtonElement, TriggerButtonProps>(
  ({ isOpen, isFilled = false, children, ...props }, ref) => (
    <Button
      ref={ref}
      priority={isFilled ? 'secondary' : 'tertiary'}
      {...props}
      className={classNames(
        'fr-border-radius--4',
        isFilled && 'fr-background-alt--blue-france',
        isOpen && 'fr-background-contrast--grey',
      )}
    >
      {children}{' '}
      <span
        className={classNames(
          'fr-ml-1v fr-icon--sm',
          isOpen ? 'fr-icon-arrow-up-s-line' : 'fr-icon-arrow-down-s-line',
        )}
        aria-hidden="true"
      />
    </Button>
  ),
)

TriggerButton.displayName = 'TriggerButton'

export default TriggerButton
