import { PropsWithChildren } from 'react'
import classNames from 'classnames'
import styles from './WhiteCard.module.css'

const WhiteCard = ({
  children,
  className,
  id,
}: PropsWithChildren<{ className?: string; id?: string }>) => (
  <div id={id} className={classNames(styles.card, className)}>
    {children}
  </div>
)

export default WhiteCard
