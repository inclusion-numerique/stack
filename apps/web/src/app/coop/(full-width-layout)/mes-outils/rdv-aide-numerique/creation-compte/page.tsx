import RdvServicePubliqueConnexionCard from '@app/web/app/coop/(full-width-layout)/mes-outils/rdv-aide-numerique/RdvServicePubliqueConnexionCard'
import { ComingSoon } from '@app/web/app/coop/(sidemenu-layout)/mes-outils/[slug]/_components/ComingSoon'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import BackButton from '@app/web/components/BackButton'
import CreateOrUpdateRdvServicepublicAccountButton from '@app/web/rdv-service-public/CreateOrUpdateRdvServicePublicAccountButton'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RdvAideNumeriqueCreationComptePage = async () => {
  const user = await getAuthenticatedSessionUser()

  return (
    <div className="fr-mb-32v">
      <div className="fr-mb-6v fr-mt-10v">
        <BackButton href="/coop/mes-outils/rdv-aide-numerique/se-connecter">
          Retour
        </BackButton>
      </div>
      <RdvServicePubliqueConnexionCard title="Créer un compte avec ProConnect">
        <div className="fr-flex fr-direction-column fr-align-items-center">
          <Image
            className="fr-background-alt--blue-france fr-border-radius--8 fr-p-3v"
            width={64}
            height={64}
            src="/images/services/rdv-aide-numerique.svg"
            alt=""
          />
          <h1 className="fr-h3 fr-mb-6v fr-mt-6v fr-text-title--blue-france fr-text--center">
            Création d’un compte RDV&nbsp;Aide&nbsp;Numérique avec ProConnect
          </h1>
          <p className="fr-text--lg fr-mb-6v fr-text--center">
            En créant votre compte, retrouvez certaines informations issues de
            La Coop dans votre espace RDV&nbsp;Aide&nbsp;Numérique&nbsp;:
          </p>
          <p className="fr-text-mention--grey fr-mb-4v fr-text--center">
            Vos lieux d’activités dans l’onglet Lieux.
          </p>
          <p className="fr-text-mention--grey fr-mb-10v fr-text--center">
            Votre équipe sera renseigné en tant qu’organisation.
          </p>
          <ComingSoon
            className="fr-mb-10v"
            text="Vos données seront partagées entre votre profil sur La Coop de la médiation numérique et RDV Aide Numérique afin d’éviter les doubles saisies"
          />
        </div>
        <div className="fr-btns-group">
          <CreateOrUpdateRdvServicepublicAccountButton
            variant="creation"
            nextUrl="/coop/mes-outils/rdv-aide-numerique/creation-confirmation"
            user={user}
          />
        </div>
        <div className="fr-flex fr-justify-content-center fr-width-full">
          <Link
            className="fr-link fr-text--center fr-mt-2v"
            href="/coop/mes-outils/rdv-aide-numerique"
          >
            Revenir plus tard
          </Link>
        </div>
      </RdvServicePubliqueConnexionCard>
    </div>
  )
}

export default RdvAideNumeriqueCreationComptePage
