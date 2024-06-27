import { PropsWithChildren } from 'react'
import classNames from 'classnames'
import styles from './CoopLayout.module.css'

const CoopPageContainer = ({
  size,
  children,
  className,
}: PropsWithChildren<{ size: 944 | 794; className?: string }>) => (
  <div
    className={classNames(
      styles.contentContainer,
      styles[`contentContainer--${size}`],
      className,
    )}
  >
    {children}
  </div>
)

export default CoopPageContainer
