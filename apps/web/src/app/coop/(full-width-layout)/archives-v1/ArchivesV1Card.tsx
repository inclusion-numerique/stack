import classNames from 'classnames'
import { PropsWithChildren } from 'react'

const ArchivesV1Card = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div
    className={classNames(
      'fr-border fr-border-radius--8 fr-p-10v fr-flex fr-direction-column fr-align-items-center fr-flex-gap-6v fr-flex fr-align-items-center fr-justify-content-center',
      className,
    )}
  >
    {children}
  </div>
)

export default ArchivesV1Card
