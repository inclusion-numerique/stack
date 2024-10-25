import { PropsWithChildren } from 'react'
import classNames from 'classnames'
import styles from './CoopLayout.module.css'

const CoopPageContainer = ({
  size = 944,
  children,
  className,
}: PropsWithChildren<{
  size?: 944 | 894 | 794 | 'full'
  className?: string
}>) => (
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
