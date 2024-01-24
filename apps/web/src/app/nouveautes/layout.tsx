import { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import AddOpenedOnboardingCookie from '@app/web/app/nouveautes/AddOpenedOnboardingCookie'
import styles from './NouveautesLayout.module.css'

export const metadata: Metadata = {
  title: 'Les Bases - Nouveautés',
}
const NouveautesLayout = ({ children }: PropsWithChildren) => (
  <>
    <div className={styles.container}>{children}</div>
    <AddOpenedOnboardingCookie />
  </>
)

export default NouveautesLayout
