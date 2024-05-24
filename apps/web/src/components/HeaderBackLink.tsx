'use client'

import { useRouter } from 'next/navigation'

const HeaderBackLink = () => {
  const router = useRouter()
  return (
    <button
      type="button"
      className="fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-mb-4v"
      onClick={router.back}
    >
      <span className="fr-icon-arrow-left-line fr-icon--sm fr-mr-1w" />
      Retour
    </button>
  )
}

export default HeaderBackLink
