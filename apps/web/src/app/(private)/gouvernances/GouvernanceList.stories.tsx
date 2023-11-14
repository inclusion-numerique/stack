import { Tabs } from '@codegouvfr/react-dsfr/Tabs'
import React, { ComponentProps } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { v4 } from 'uuid'
import { ListeGouvernance } from '@app/web/app/(private)/gouvernances/getListeGouvernances'
import GouvernanceList from '@app/web/app/(private)/gouvernances/GouvernanceList'

const meta: Meta<typeof GouvernanceList> = {
  title: 'Gouvernances / Liste',
  component: GouvernanceList,
}

export default meta

type Story = StoryObj<typeof Tabs>

const Template = (props: ComponentProps<typeof GouvernanceList>) => (
  <div className="fr-container fr-mb-20v">
    <GouvernanceList {...props} />
  </div>
)

const jeanDupont = {
  id: v4(),
  name: 'Jean Dupont',
  email: 'jean.dupont@test.test',
}

const jeanneBiche = {
  id: v4(),
  name: 'Jeanne Biche',
  email: 'jeanne.biche@test.test',
}

const now = new Date()
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)

const gouvernancesPressenties: ListeGouvernance = [
  {
    id: v4(),
    creation: now,
    modification: now,
    derniereModificationPar: jeanDupont,
    createur: jeanDupont,
    v2Enregistree: null,
    departement: {
      codeRegion: '84',
      code: '69',
      nom: 'Rhône',
    },
    organisationsRecruteusesCoordinateurs: [],
    noteDeContexte: '<p>Des phrases qui expliquent le contexte</p>',
    besoinsEnIngenierieFinanciere: null,
    v1Perimetre: 'region',
    v1PorteurRegion: {
      nom: 'Auvergne-Rhône-Alpes',
      code: '84',
    },
    v1PorteurDepartement: null,
    v1PorteurEpci: null,
    v1PorteurSiretInformations: null,
  },
  {
    id: v4(),
    creation: now,
    modification: tomorrow,
    createur: jeanDupont,
    derniereModificationPar: jeanneBiche,
    v2Enregistree: null,
    departement: {
      codeRegion: '84',
      code: '69',
      nom: 'Rhône',
    },
    organisationsRecruteusesCoordinateurs: [],
    noteDeContexte: '<p>Des phrases qui expliquent le contexte</p>',
    besoinsEnIngenierieFinanciere: null,
    v1Perimetre: 'region',
    v1PorteurRegion: {
      nom: 'Auvergne-Rhône-Alpes',
      code: '84',
    },
    v1PorteurDepartement: null,
    v1PorteurEpci: null,
    v1PorteurSiretInformations: null,
  },
]

const gouvernancesProposees: ListeGouvernance = [
  {
    id: v4(),
    creation: now,
    modification: now,
    derniereModificationPar: jeanDupont,
    createur: jeanDupont,
    v2Enregistree: now,
    departement: {
      codeRegion: '84',
      code: '69',
      nom: 'Rhône',
    },
    organisationsRecruteusesCoordinateurs: [],
    noteDeContexte: '<p>Des phrases qui expliquent le contexte</p>',
    besoinsEnIngenierieFinanciere: null,
    v1Perimetre: 'region',
    v1PorteurRegion: {
      nom: 'Auvergne-Rhône-Alpes',
      code: '84',
    },
    v1PorteurDepartement: null,
    v1PorteurEpci: null,
    v1PorteurSiretInformations: null,
  },
  {
    id: v4(),
    creation: now,
    modification: tomorrow,
    createur: jeanDupont,
    derniereModificationPar: jeanneBiche,
    v2Enregistree: tomorrow,
    departement: {
      codeRegion: '84',
      code: '69',
      nom: 'Rhône',
    },
    organisationsRecruteusesCoordinateurs: [],
    noteDeContexte: '<p>Des phrases qui expliquent le contexte</p>',
    besoinsEnIngenierieFinanciere: null,
    v1Perimetre: 'region',
    v1PorteurRegion: {
      nom: 'Auvergne-Rhône-Alpes',
      code: '84',
    },
    v1PorteurDepartement: null,
    v1PorteurEpci: null,
    v1PorteurSiretInformations: null,
  },
]

export const National2Types: Story = {
  render: () => (
    <Template
      scope={{ national: true }}
      gouvernances={[...gouvernancesPressenties, ...gouvernancesProposees]}
    />
  ),
}

export const RegionalPressenties: Story = {
  render: () => (
    <Template
      scope={{ codeRegion: '84' }}
      gouvernances={gouvernancesPressenties}
    />
  ),
}

export const RegionalVide: Story = {
  render: () => <Template scope={{ codeRegion: '84' }} gouvernances={[]} />,
}

export const DepartementalVide: Story = {
  render: () => (
    <Template scope={{ codeDepartement: '69' }} gouvernances={[]} />
  ),
}

export const DepartementalPressenties: Story = {
  render: () => (
    <Template
      scope={{ codeDepartement: '69' }}
      gouvernances={gouvernancesPressenties}
    />
  ),
}

export const Departemental2Types: Story = {
  render: () => (
    <Template
      scope={{ codeDepartement: '69' }}
      gouvernances={[...gouvernancesPressenties, ...gouvernancesProposees]}
    />
  ),
}

export const DepartementalProposees: Story = {
  render: () => (
    <Template
      scope={{ codeDepartement: '69' }}
      gouvernances={gouvernancesProposees}
    />
  ),
}
