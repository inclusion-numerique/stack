import Notice from '@codegouvfr/react-dsfr/Notice'
import Link from 'next/link'
import React from 'react'

export const ComingSoon = ({ text }: { text: string }) => (
  <Notice
    className="fr-notice--new fr-notice--flex fr-mb-3w"
    title={
      <span className="fr-text--regular">
        <span className="fr-text-default--grey fr-text--bold fr-display-block">
          Prochaines évolutions à venir !
        </span>
        <span className="fr-display-block fr-text--sm fr-my-1v">
          {text}. 
          <Link
            className="fr-link fr-text--sm"
            href="https://incubateurdesterritoires.notion.site/105744bf03dd80349c26e76cd8459eac?v=8949acfdde544d12860f5c0ca89af72f"
            target="_blank"
          >
            En savoir plus sur les prochaines évolutions de la plateforme
          </Link>
        </span>
      </span>
    }
  />
)
