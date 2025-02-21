import { CommunicationConum } from '@app/web/app/coop/(sidemenu-layout)/(accueil-coop)/_components/CommunicationConum'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import { EquipeVide } from '@app/web/app/coop/EquipeVide'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import ActiviteDetailsModal from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsModal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import React from 'react'
import {
  ActionsRapides,
  DernieresActivites,
  InformationsCoop,
  OnboardingInfo,
  Statistiques,
  Support,
} from './_components'
import { Equipe } from './_components/Equipe'
import { AccueilPageData } from './getAccueilPageDataFor'

export const Accueil = ({
  firstName,
  name,
  email,
  statistiques,
  mediateurs,
  activites,
  hasSeenOnboarding,
  isMediateur,
  isCoordinateur,
  isCoordinateurCoNum,
  isCoNum,
}: {
  firstName: string | null
  name: string | null
  hasSeenOnboarding: string | null
  email: string
  isMediateur: boolean
  isCoordinateur: boolean
  isCoordinateurCoNum: boolean
  isCoNum: boolean
} & AccueilPageData) => (
  <CoopPageContainer size={794}>
    <SkipLinksPortal links={defaultSkipLinks} />
    <main id={contentId}>
      <h1 className="fr-text-title--blue-france fr-mt-10v">
        👋 Bonjour {firstName || name || email}
      </h1>
      {isMediateur && (
        <>
          <OnboardingInfo hasSeenOnboarding={hasSeenOnboarding} />
          <section className="fr-my-6w">
            <ActionsRapides />
          </section>
        </>
      )}
      {isCoordinateur && (
        <section className="fr-my-6w">
          <h2 className="fr-h5 fr-text-mention--grey">
            <span className="ri-group-2-line fr-mr-1w" aria-hidden />
            Mon équipe
          </h2>
          {mediateurs.total > 0 ? (
            <Equipe mediateurs={mediateurs} />
          ) : (
            <EquipeVide />
          )}
        </section>
      )}
      {isMediateur && (
        <>
          <section className="fr-my-6w">
            <Statistiques {...statistiques} />
          </section>
          <section className="fr-my-6w">
            <DernieresActivites activites={activites} />
          </section>
          <hr className="fr-separator-1px" />
        </>
      )}
      {(isCoNum || isCoordinateurCoNum) && (
        <section className="fr-my-6w">
          <CommunicationConum />
        </section>
      )}
      <section className="fr-my-6w">
        <InformationsCoop />
      </section>
      <section className="fr-flex-xl fr-flex-gap-4v fr-background-alt--blue-france fr-p-4w fr-border-radius--16">
        <Support />
      </section>
    </main>
    <ActiviteDetailsModal />
  </CoopPageContainer>
)
