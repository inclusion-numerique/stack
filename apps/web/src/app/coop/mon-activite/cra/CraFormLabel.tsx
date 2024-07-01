import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import type { ReactNode } from 'react'
import classNames from 'classnames'

const CraFormLabel = ({
  children,
  required,
  className,
  as: Component = 'span',
}: {
  children: ReactNode
  required?: boolean
  className?: string
  as?: 'span' | 'p'
}) => (
  <Component className={classNames('fr-text--medium', className)}>
    {children}
    {required ? (
      <>
        &nbsp;
        <RedAsterisk />
      </>
    ) : null}
  </Component>
)

export default CraFormLabel
