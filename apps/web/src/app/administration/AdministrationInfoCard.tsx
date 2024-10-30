import { PropsWithChildren, ReactNode } from 'react'
import classNames from 'classnames'

const AdministrationInfoCard = ({
  title,
  children,
  className,
}: PropsWithChildren<{ title?: ReactNode; className?: string }>) => (
  <div
    className={classNames(
      'fr-border-radius--8 fr-border  fr-pt-8v fr-px-8v fr-pb-10v fr-mb-6v',
      className,
    )}
  >
    {title && <h2 className="fr-h6 fr-mb-4v">{title}</h2>}
    {children}
  </div>
)

export default AdministrationInfoCard
