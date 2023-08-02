import classNames from 'classnames'
import { PropsWithChildren } from 'react'
import styles from './AuthCard.module.css'

export const AuthCard = ({ children }: PropsWithChildren) => (
  <main role="main" id="content" className={classNames(styles.card)}>
    {children}
  </main>
)
