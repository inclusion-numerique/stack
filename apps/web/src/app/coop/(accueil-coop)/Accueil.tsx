import React from 'react'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import ActiviteDetailsModal from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsModal'
import CoopPageContainer from '../CoopPageContainer'
import {
  ActionsRapides,
  DernieresActivites,
  InformationsCoop,
  OnboardingInfo,
  Statistiques,
  Support,
} from './_components'
import { AccueilPageData } from './getAccueilPageData'

export const Accueil = ({
  firstName,
  name,
  email,
  statistiques,
  activites,
  hasSeenOnboarding,
}: {
  firstName: string | null
  name: string | null
  hasSeenOnboarding: string | null
  email: string
} & AccueilPageData) => (
  <CoopPageContainer size={794}>
    <SkipLinksPortal links={defaultSkipLinks} />
    <main id={contentId}>
      <h1 className="fr-text-title--blue-france fr-mt-10v">
        👋 Bonjour {firstName || name || email}
      </h1>
      <OnboardingInfo hasSeenOnboarding={hasSeenOnboarding} />
      <section className="fr-my-6w">
        <ActionsRapides />
      </section>
      <section className="fr-my-6w">
        <Statistiques {...statistiques} />
      </section>
      <section className="fr-my-6w">
        <DernieresActivites activites={activites} />
      </section>
      <hr className="fr-separator-1px" />
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
