'use client'

import { signIn } from 'next-auth/react'
import { inclusionConnectProviderId } from '@app/web/auth/inclusionConnect'
import classNames from 'classnames'
import styles from './InclusionConnectSigninButton.module.css'

export const InclusionConnectSigninButton = ({
  className,
}: {
  className?: string
}) => (
  <div className={classNames(styles.inclusionConnectSection, className)}>
    <button
      type="button"
      className={`${styles.inclusionConnectBtn} fr-btn`}
      title="S'identifier avec InclusionConnect"
      onClick={() => signIn(inclusionConnectProviderId)}
    >
      <span>
        Se connecter avec
        <strong>InclusionConnect</strong>
      </span>
    </button>

    <a
      className="fr-link--sm"
      href="https://plateforme-inclusion.notion.site/Un-compte-unique-pour-mes-services-num-riques-ded9135197654da590f5dde41d8bb68b"
      target="_blank"
      rel="noreferrer"
      title="Qu'est-ce qu'Inclusion Connect ? - nouvelle fenêtre"
    >
      En savoir plus
    </a>
  </div>
)
