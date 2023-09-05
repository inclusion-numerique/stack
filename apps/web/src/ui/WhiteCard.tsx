import { PropsWithChildren } from 'react'
import classNames from 'classnames'
import styles from './WhiteCard.module.css'

const WhiteCard = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div className={classNames(styles.card, className)}>{children}</div>
)

export default WhiteCard
