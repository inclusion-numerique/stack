import { PropsWithChildren } from 'react'
import { Spinner } from '@app/web/ui/Spinner'
import styles from './LoadingSection.module.css'

const LoadingSection = ({ children }: PropsWithChildren) => (
  <section data-testid="loading-section" className={styles.container}>
    <div className={styles.row}>
      <Spinner size="small" /> <p className={styles.title}>Chargement</p>
    </div>
    {children}
  </section>
)

export default LoadingSection
