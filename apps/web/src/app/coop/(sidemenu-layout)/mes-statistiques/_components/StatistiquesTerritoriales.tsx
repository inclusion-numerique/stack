import Link from 'next/link'
import Notice from '@codegouvfr/react-dsfr/Notice'
import React from 'react'

export const StatistiquesTerritoriales = () => (
  <Notice
    className="fr-notice--new fr-notice--flex"
    title={
      <span className="fr-text--regular">
        <span className="fr-text-default--grey fr-text--bold fr-display-block fr-ml-1w">
          Prochaines évolutions à venir !
        </span>
        <span className="fr-display-block fr-text--sm fr-my-1v fr-ml-1w">
          Vos statistiques vont prochainement contribuer à valoriser et
          comprendre l’impact de l’inclusion numérique sur votre territoire.  
          <Link
            className="fr-link fr-text--sm"
            href="https://www.notion.so/incubateurdesterritoires/En-savoir-plus-sur-l-utilisation-des-donn-es-sur-la-Coop-de-la-m-diation-num-rique-82af14ef964b41c1bfb5cb4a01d6e40b#6052168a99a84eca9b4c12c1b905d354"
            target="_blank"
          >
            En savoir plus sur l’utilisation de vos données
          </Link>
        </span>
      </span>
    }
  />
)
