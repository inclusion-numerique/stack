import Link from 'next/link'
import styles from './LinkCard.module.css'

const LinkCard = ({
  text,
  title,
  href,
}: {
  href: string
  title: string
  text: string
}) => (
  <Link href={href} prefetch={false} className={styles.card}>
    <div className={styles.content}>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
    <div className={styles.iconContainer}>
      <span className="fr-icon-arrow-right-line" />
    </div>
  </Link>
)
export default LinkCard
