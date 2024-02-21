import Link from 'next/link'
import classNames from 'classnames'
import styles from './LinkCard.module.css'

const LinkCard = ({
  text,
  title,
  href,
  icon,
}: {
  href: string
  title: string
  text: string
  icon?: string
}) => (
  <Link href={href} prefetch={false} className={styles.card}>
    {!!icon && (
      <div className={styles.iconContainer}>
        <span className={classNames(styles.icon, icon, 'fr-icon--lg')} />
      </div>
    )}
    <div className={styles.content}>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
    <div className={styles.arrowContainer}>
      <span className="fr-icon-arrow-right-line" />
    </div>
  </Link>
)
export default LinkCard
