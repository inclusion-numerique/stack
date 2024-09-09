import { Meta, StoryObj } from '@storybook/react'
import { Accueil } from './Accueil'

export default {
  title: 'Coop/Accueil',
  component: Accueil,
} as Meta<typeof Accueil>

type Story = StoryObj<typeof Accueil>

const totalCountsStats7Days = {
  activites: {
    total: 34,
    individuels: { total: 22, proportion: 0 },
    collectifs: { total: 1, proportion: 0, participants: 8 },
    demarches: { total: 11, proportion: 0 },
  },
  accompagnements: {
    total: 21,
    individuels: { total: 11, proportion: 0 },
    collectifs: { total: 2, proportion: 0 },
    demarches: { total: 8, proportion: 0 },
  },
  beneficiaires: { total: 88, suivis: 37, anonymes: 51 },
}

const totalCountsStats30Days = {
  activites: {
    total: 193,
    individuels: { total: 121, proportion: 0 },
    collectifs: { total: 4, proportion: 0, participants: 40 },
    demarches: { total: 68, proportion: 0 },
  },
  accompagnements: {
    total: 81,
    individuels: { total: 34, proportion: 0 },
    collectifs: { total: 8, proportion: 0 },
    demarches: { total: 29, proportion: 0 },
  },
  beneficiaires: { total: 256, suivis: 112, anonymes: 144 },
}

export const Statistiques: Story = {
  args: {
    firstName: 'John',
    name: 'Doe',
    email: 'john@doe.com',
    statistiques: {
      totalCountsStats7Days,
      totalCountsStats30Days,
    },
    activites: [],
  },
}
Statistiques.storyName = 'Accueil'
