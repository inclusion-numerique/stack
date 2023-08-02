import Link from 'next/link'
import { GouvernancePersona } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import styles from './GouvernancePersonaCta.module.css'

const GouvernancePersonaCta = ({
  gouvernance: { id, title, cta },
}: {
  gouvernance: GouvernancePersona
}) => (
  <Link href={`/gouvernance/${id}`} className={styles.card}>
    <div className={styles.content}>
      <h3>{title}</h3>
      <p>{cta}</p>
    </div>
    <div className={styles.iconContainer}>
      <span className="fr-icon-arrow-right-line" />
    </div>
  </Link>
)
export default GouvernancePersonaCta
