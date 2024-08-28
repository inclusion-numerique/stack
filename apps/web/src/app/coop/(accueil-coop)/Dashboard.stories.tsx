import { Meta, StoryObj } from '@storybook/react'
import { Dashboard } from './Dashboard'

export default {
  title: 'Coop/Dashboard',
  component: Dashboard,
} as Meta<typeof Dashboard>

type Story = StoryObj<typeof Dashboard>

const accompagnementBeneficiairesDernierMois = {
  accompagnements: 329,
  beneficiaires: 477,
  anonymes: 223,
}

const accompagnementBeneficiairesDerniereSemaine = {
  accompagnements: 68,
  beneficiaires: 136,
  anonymes: 58,
}

const modalitesAccompagnementDernierMois = [
  {
    label: 'Accompagnements individuels',
    count: 121,
    participants: 0,
  },
  { label: 'Ateliers collectifs', count: 4, participants: 40 },
  {
    label: 'Aide aux démarches administratives',
    count: 68,
    participants: 0,
  },
]

const modalitesAccompagnementDerniereSemaine = [
  {
    label: 'Accompagnements individuels',
    count: 32,
    participants: 0,
  },
  { label: 'Ateliers collectifs', count: 1, participants: 8 },
  {
    label: 'Aide aux démarches administratives',
    count: 18,
    participants: 0,
  },
]

export const Statistiques: Story = {
  args: {
    firstName: 'John',
    name: 'Doe',
    email: 'john@doe.com',
    statistiques: {
      accompagnementBeneficiaires: {
        dernierMois: accompagnementBeneficiairesDernierMois,
        derniereSemaine: accompagnementBeneficiairesDerniereSemaine,
      },
      modalitesAccompagnement: {
        dernierMois: modalitesAccompagnementDernierMois,
        derniereSemaine: modalitesAccompagnementDerniereSemaine,
      },
    },
  },
}
Statistiques.storyName = 'Dashboard'
