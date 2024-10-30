import { PropsWithChildren, ReactNode } from 'react'
import classNames from 'classnames'

const AdministrationInlineLabelValue = ({
  children,
  label,
  className,
}: PropsWithChildren<{
  label: ReactNode
  className?: string
}>) => (
  <div className={classNames('fr-flex fr-flex-gap-4v', className)}>
    <p className="fr-text--sm fr-mb-0">
      <strong>{label}&nbsp;:</strong>
    </p>
    <div>{children}</div>
  </div>
)

export default AdministrationInlineLabelValue
