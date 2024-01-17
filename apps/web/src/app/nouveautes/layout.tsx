import { PropsWithChildren } from 'react'
import AddOpenedOnboardingCookie from '@app/web/app/nouveautes/AddOpenedOnboardingCookie'
import styles from './NouveautesLayout.module.css'

const NouveautesLayout = ({ children }: PropsWithChildren) => (
  <>
    <div className={styles.container}>{children}</div>
    <AddOpenedOnboardingCookie />
  </>
)

export default NouveautesLayout
