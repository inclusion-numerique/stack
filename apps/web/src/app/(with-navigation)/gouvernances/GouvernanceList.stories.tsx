import { Tabs } from '@codegouvfr/react-dsfr/Tabs'
import React, { ComponentProps } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { v4 } from 'uuid'
import { Decimal } from 'decimal.js'
import {
  ListeGouvernance,
  ListeGouvernanceItem,
} from '@app/web/app/(with-navigation)/gouvernances/getListeGouvernances'
import GouvernanceList from '@app/web/app/(with-navigation)/gouvernances/GouvernanceList'

const meta: Meta<typeof GouvernanceList> = {
  title: 'Gouvernances / Liste',
  component: GouvernanceList,
}

export default meta

type Story = StoryObj<typeof Tabs>

const Template = (props: ComponentProps<typeof GouvernanceList>) => (
  <div className="fr-container fr-pb-30v">
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
    noteDeContexteSubventions: null,
    noteDeContexteSubventionsEnregistree: null,
    beneficiaireDotationFormationValideEtEnvoye: null,
    beneficiaireDotationFormationAccepte: null,
    beneficiaireDotationFormationDemandeDeModification: null,
    beneficiaireDotationFormation: null,
    departement: {
      codeRegion: '84',
      code: '69',
      nom: 'Rhône',
      dotation202406: new Decimal(100_000),
    },
    organisationsRecruteusesCoordinateurs: [],
    noteDeContexte: '<p>Des phrases qui expliquent le contexte</p>',
    besoinsEnIngenierieFinanciere: null,
    feuillesDeRoute: [],
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
    noteDeContexteSubventions: null,
    noteDeContexteSubventionsEnregistree: null,
    beneficiaireDotationFormationValideEtEnvoye: null,
    beneficiaireDotationFormationAccepte: null,
    beneficiaireDotationFormationDemandeDeModification: null,
    beneficiaireDotationFormation: null,
    departement: {
      dotation202406: new Decimal(100_000),
      codeRegion: '84',
      code: '69',
      nom: 'Rhône',
    },
    organisationsRecruteusesCoordinateurs: [],
    noteDeContexte: '<p>Des phrases qui expliquent le contexte</p>',
    besoinsEnIngenierieFinanciere: null,
    feuillesDeRoute: [],
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
    noteDeContexteSubventions: null,
    noteDeContexteSubventionsEnregistree: null,
    beneficiaireDotationFormationValideEtEnvoye: null,
    beneficiaireDotationFormationAccepte: null,
    beneficiaireDotationFormationDemandeDeModification: null,
    beneficiaireDotationFormation: null,
    departement: {
      dotation202406: new Decimal(100_000),
      codeRegion: '84',
      code: '69',
      nom: 'Rhône',
    },
    organisationsRecruteusesCoordinateurs: [],
    noteDeContexte: '<p>Des phrases qui expliquent le contexte</p>',
    besoinsEnIngenierieFinanciere: null,
    feuillesDeRoute: [],
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
    noteDeContexteSubventions: null,
    noteDeContexteSubventionsEnregistree: null,
    beneficiaireDotationFormationValideEtEnvoye: null,
    beneficiaireDotationFormationAccepte: null,
    beneficiaireDotationFormationDemandeDeModification: null,
    beneficiaireDotationFormation: null,
    departement: {
      dotation202406: new Decimal(100_000),
      codeRegion: '84',
      code: '69',
      nom: 'Rhône',
    },
    organisationsRecruteusesCoordinateurs: [],
    noteDeContexte: '<p>Des phrases qui expliquent le contexte</p>',
    besoinsEnIngenierieFinanciere: {
      id: v4(),
      creation: now,
      modification: tomorrow,
      createur: jeanDupont,
      derniereModificationPar: jeanneBiche,
      selectionEnregistree: now,
    } as unknown as ListeGouvernanceItem['besoinsEnIngenierieFinanciere'],

    feuillesDeRoute: [],
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

export const DepartementalPlusieursPressenties: Story = {
  render: () => (
    <Template
      scope={{ codeDepartement: '69' }}
      gouvernances={gouvernancesPressenties}
    />
  ),
}

export const DepartementalUnePressentie: Story = {
  render: () => (
    <Template
      scope={{ codeDepartement: '69' }}
      gouvernances={[gouvernancesPressenties[0]]}
    />
  ),
}

export const Departemental2Types: Story = {
  render: () => (
    <Template
      scope={{ codeDepartement: '69' }}
      gouvernances={[...gouvernancesPressenties, gouvernancesProposees[0]]}
    />
  ),
}

export const DepartementalProposee: Story = {
  render: () => (
    <Template
      scope={{ codeDepartement: '69' }}
      gouvernances={[gouvernancesProposees[1]]}
    />
  ),
}
