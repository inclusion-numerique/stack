import { PropsWithChildren } from 'react'
import styles from './OnboardingLayout.module.css'

const OnboardingLayout = ({ children }: PropsWithChildren) => (
  <div className={styles.container}>{children}</div>
)

export default OnboardingLayout
