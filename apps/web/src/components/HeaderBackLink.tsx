'use client'

import classNames from 'classnames'
import { useRouter } from 'next/navigation'

const HeaderBackLink = ({ className }: { className?: string }) => {
  const router = useRouter()
  return (
    <button
      type="button"
      className={classNames(
        'fr-btn',
        'fr-btn--sm',
        'fr-btn--tertiary-no-outline',
        'fr-ml-6v',
        'fr-my-5v', // This margin ensures right height for all variants of the Header component
        className,
      )}
      onClick={router.back}
    >
      <span className="fr-icon-arrow-left-line fr-icon--sm fr-mr-1w" />
      Retour
    </button>
  )
}

export default HeaderBackLink
