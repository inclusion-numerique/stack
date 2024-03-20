import { Tabs } from '@codegouvfr/react-dsfr/Tabs'
import React, { ComponentProps } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { v4 } from 'uuid'
import { Decimal } from 'decimal.js'
import DemandeDeSubventionCard from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/DemandeDeSubventionCard'
import { DemandeSubventionForForm } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'

const meta: Meta<typeof DemandeDeSubventionCard> = {
  title: 'Gouvernances / DemandeDeSubvention / Card',
  component: DemandeDeSubventionCard,
}

export default meta

type Story = StoryObj<typeof Tabs>

const Template = (props: ComponentProps<typeof DemandeDeSubventionCard>) => (
  <div className="fr-container fr-container--800">
    <hr className="fr-separator-8v" />
    <DemandeDeSubventionCard {...props} />
    <hr className="fr-separator-8v" />
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

const pending = {
  id: v4(),
  creation: now,
  modification: now,
  derniereModificationPar: jeanDupont,
  createur: jeanDupont,

  besoins: [
    'RedigerLaFeuilleDeRoute',
    'StructurerUneFiliereDeReconditionnement',
  ],

  valideeEtEnvoyee: null,
  demandeDeModification: null,
  rejetee: null,
  acceptee: null,
  feuilleDeRoute: {
    id: v4(),
    nom: 'Changer le monde',
  },

  nomAction: 'Une action très pertinente',
  contexte: 'Contexte action',
  description: 'Description action',

  budgetGlobal: new Decimal(14_570.23),
  subventionDemandee: new Decimal(5000),
  subventionEtp: new Decimal(5000),
  subventionPrestation: new Decimal(0),
  pieceJointeBudgetKey: 'key',
  pieceJointeBudget: {
    key: 'key',
    name: 'name.pdf',
    mimeType: 'application/pdf',
    size: 10,
  },
  beneficiaires: [
    {
      id: v4(),
      subvention: new Decimal(3200),
      membreGouvernance: {
        id: v4(),
        modification: now,
        creation: now,
        region: null,
        departement: null,
        epci: {
          code: '200041188',
          nom: 'CC du Pays de Saint-Omer',
        },
        commune: null,
        nomStructure: null,
        siret: null,
        siretInformations: null,
        coporteur: false,
        formulaireGouvernanceId: v4(),
      },
    },
    {
      id: v4(),
      subvention: new Decimal(1800),
      membreGouvernance: {
        id: v4(),
        modification: now,
        creation: now,
        region: null,
        departement: null,
        epci: null,
        commune: null,
        nomStructure: 'Une association',
        siret: null,
        siretInformations: null,
        coporteur: false,
        formulaireGouvernanceId: v4(),
      },
    },
  ],
} satisfies DemandeSubventionForForm

const gouvernanceId = v4()
const codeDepartement = '69'
export const EnCoursSansContexte: Story = {
  render: () => (
    <Template
      gouvernanceId={gouvernanceId}
      codeDepartement={codeDepartement}
      canValidate={false}
      canInstruct={false}
      demandeDeSubvention={pending}
    />
  ),
}

export const EnCours: Story = {
  render: () => (
    <Template
      gouvernanceId={gouvernanceId}
      codeDepartement={codeDepartement}
      canValidate
      canInstruct={false}
      demandeDeSubvention={{
        ...pending,
        modification: tomorrow,
        derniereModificationPar: jeanneBiche,
      }}
    />
  ),
}

export const Envoyee: Story = {
  render: () => (
    <Template
      gouvernanceId={gouvernanceId}
      codeDepartement={codeDepartement}
      canValidate
      canInstruct={false}
      demandeDeSubvention={{
        ...pending,
        valideeEtEnvoyee: tomorrow,
        besoins: [
          'AppuyerLaCertificationQualiopi',
          'CoConstruireLaFeuilleDeRoute',
          'AnimerLaGouvernance',
          'CollecterDesDonneesTerritoriales',
        ],
      }}
    />
  ),
}

export const Acceptee: Story = {
  render: () => (
    <Template
      gouvernanceId={gouvernanceId}
      codeDepartement={codeDepartement}
      canValidate
      canInstruct={false}
      demandeDeSubvention={{
        ...pending,
        valideeEtEnvoyee: tomorrow,
        acceptee: tomorrow,
      }}
    />
  ),
}

export const EnCoursSansContexteAdmin: Story = {
  render: () => (
    <Template
      gouvernanceId={gouvernanceId}
      codeDepartement={codeDepartement}
      canValidate={false}
      canInstruct
      demandeDeSubvention={pending}
    />
  ),
}

export const EnCoursAdmin: Story = {
  render: () => (
    <Template
      gouvernanceId={gouvernanceId}
      codeDepartement={codeDepartement}
      canValidate
      canInstruct
      demandeDeSubvention={{
        ...pending,
        modification: tomorrow,
        derniereModificationPar: jeanneBiche,
      }}
    />
  ),
}

export const EnvoyeeAdmin: Story = {
  render: () => (
    <Template
      gouvernanceId={gouvernanceId}
      codeDepartement={codeDepartement}
      canValidate
      canInstruct
      demandeDeSubvention={{
        ...pending,
        valideeEtEnvoyee: tomorrow,
        besoins: [
          'AppuyerLaCertificationQualiopi',
          'CoConstruireLaFeuilleDeRoute',
          'AnimerLaGouvernance',
          'CollecterDesDonneesTerritoriales',
        ],
      }}
    />
  ),
}

export const AccepteeAdmin: Story = {
  render: () => (
    <Template
      gouvernanceId={gouvernanceId}
      codeDepartement={codeDepartement}
      canValidate
      canInstruct
      demandeDeSubvention={{
        ...pending,
        valideeEtEnvoyee: tomorrow,
        acceptee: tomorrow,
      }}
    />
  ),
}
