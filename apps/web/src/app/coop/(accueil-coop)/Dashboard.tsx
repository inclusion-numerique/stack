import React from 'react'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import CoopPageContainer from '../CoopPageContainer'
import {
  ActionsRapides,
  DernieresActivites,
  InformationsCoop,
  Statistiques,
  Support,
} from './_sections'

export const Dashboard = ({
  firstName,
  name,
  email,
  statistiques,
}: {
  firstName: string | null
  name: string | null
  email: string
  statistiques: {
    accompagnementBeneficiaires: {
      dernierMois: {
        accompagnements: number
        beneficiaires: number
        anonymes: number
      }
      derniereSemaine: {
        accompagnements: number
        beneficiaires: number
        anonymes: number
      }
    }
    modalitesAccompagnement: {
      dernierMois: {
        label: string
        count: number
        participants: number
      }[]
      derniereSemaine: {
        label: string
        count: number
        participants: number
      }[]
    }
  }
}) => (
  <CoopPageContainer size={794}>
    <SkipLinksPortal links={defaultSkipLinks} />
    <main id={contentId}>
      <h1 className="fr-text-title--blue-france fr-mt-10v">
        👋 Bonjour {firstName || name || email}
      </h1>
      <section className="fr-my-6w">
        <ActionsRapides />
      </section>
      <section className="fr-my-6w">
        <Statistiques {...statistiques} />
      </section>
      <section className="fr-my-6w">
        <DernieresActivites />
      </section>
      <hr className="fr-separator-1px" />
      <section className="fr-my-6w">
        <InformationsCoop />
      </section>
      <section className="fr-flex-xl fr-flex-gap-4v fr-background-alt--blue-france fr-p-4w fr-border-radius--16">
        <Support />
      </section>
    </main>
  </CoopPageContainer>
)
