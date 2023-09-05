import Link from 'next/link'

const BackLink = ({
  href,
  label = 'Retour',
}: {
  href: string
  label?: string
}) => (
  <Link href={href} prefetch={false} className="fr-link" data-testid="backlink">
    <span className="fr-icon-arrow-left-line fr-icon--sm" /> {label}
  </Link>
)

export default BackLink
