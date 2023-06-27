'use client'

import classNames from 'classnames'
import { useRouter } from 'next/navigation'

const HeaderBackLink = ({
  backLink,
  href,
}: {
  backLink: string
  href?: string
}) => {
  const router = useRouter()
  const onClick = () => {
    if (href) {
      router.push(href)
      return
    }
    router.back()
  }
  return (
    <button
      type="button"
      className={classNames(
        'fr-btn',
        'fr-btn--sm',
        'fr-btn--tertiary-no-outline',
      )}
      onClick={onClick}
    >
      <span className="fr-icon-arrow-left-line fr-icon--sm fr-mr-1w" />
      {backLink}
    </button>
  )
}

export default HeaderBackLink
