import RdvServicePubliqueConnexionCard from '@app/web/app/coop/(full-width-layout)/mes-outils/rdv-aide-numerique/RdvServicePubliqueConnexionCard'
import BackButton from '@app/web/components/BackButton'
import { rdvSigninUrl } from '@app/web/rdv-service-public/rdvUrls'
import Button from '@codegouvfr/react-dsfr/Button'
import Image from 'next/image'
import React from 'react'

const RdvAideNumeriqueSeConnecterPage = () => {
  return (
    <div className="fr-mb-32v">
      <div className="fr-mb-6v fr-mt-10v">
        <BackButton href="/coop/mes-outils/rdv-aide-numerique">
          Retour
        </BackButton>
      </div>
      <RdvServicePubliqueConnexionCard title="Se connecter avec ProConnect">
        <div className="fr-flex fr-direction-column fr-align-items-center fr-text--center">
          <Image
            className="fr-background-alt--blue-france fr-border-radius--8 fr-p-3v"
            width={64}
            height={64}
            src="/images/services/rdv-aide-numerique.svg"
            alt=""
          />
          <h1 className="fr-h3 fr-mb-2v fr-mt-6v fr-text-title--blue-france">
            Connectez-vous à RDV&nbsp;Aide&nbsp;Numérique
          </h1>
          <p className="fr-text--xl fr-mb-12v fr-text-mention--grey">
            Avez-vous déjà un compte sur RDV&nbsp;Aide&nbsp;Numérique&nbsp;?
          </p>
        </div>
        <div className="fr-btns-group">
          <Button
            linkProps={{
              href: rdvSigninUrl,
            }}
          >
            J’ai déjà un compte
          </Button>
          <Button
            linkProps={{
              href: '/coop/mes-outils/rdv-aide-numerique/creation-compte',
            }}
            priority="secondary"
            className="fr-mb-0"
          >
            Je n’ai pas de compte
          </Button>
        </div>
      </RdvServicePubliqueConnexionCard>
    </div>
  )
}

export default RdvAideNumeriqueSeConnecterPage
