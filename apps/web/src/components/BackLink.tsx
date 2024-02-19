import Link from 'next/link'
import classNames from 'classnames'

const BackLink = ({
  href,
  label = 'Retour',
  className,
}: {
  href: string
  label?: string
  className?: string
}) => (
  <Link
    href={href}
    prefetch={false}
    className={classNames('fr-link', className)}
    data-testid="backlink"
  >
    <span className="fr-icon-arrow-left-line fr-icon--sm" /> {label}
  </Link>
)

export default BackLink
