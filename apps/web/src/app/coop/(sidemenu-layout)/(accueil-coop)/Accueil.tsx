import React from 'react'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import ActiviteDetailsModal from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsModal'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import { CommunicationConum } from '@app/web/app/coop/(sidemenu-layout)/(accueil-coop)/_components/CommunicationConum'
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
  isCoNum,
}: {
  firstName: string | null
  name: string | null
  hasSeenOnboarding: string | null
  email: string
  isMediateur: boolean
  isCoordinateur: boolean
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
          <Equipe mediateurs={mediateurs} />
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
      {(isCoNum || isCoordinateur) && (
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
