import { Meta, StoryObj } from '@storybook/react'
import DepartementDashboard from '@app/web/components/Prefet/DepartementDashboard'
import { DepartementGeoFeatures } from '@app/web/data/departements'
import { getDepartementGeoJson } from '@app/web/test/testDepartementData'
import {
  BoxData,
  BoxesData,
  DepartementDashboardData,
} from '@app/web/app/(private)/tableau-de-bord/departement/[codeDepartement]/getDepartementDashboardData'

const getFakeData = (
  departement: DepartementGeoFeatures,
): DepartementDashboardData => {
  const inclusionLocations = {
    id: 'lieux-d-inclusion-numérique',
    label: "Lieux d'inclusion numérique",
    value: 123,
    withDescription: true,
    statistics: [
      {
        id: 'typologie-de-structures',
        label: 'Typologie',
        statistics: [
          {
            id: 'public',
            label: 'Public',
            value: 43,
            collapsable: true,
            statistics: [
              { id: 'Commune', label: 'Commune', value: 12 },
              { id: 'EPCI', label: 'EPCI', value: 10 },
              { id: 'Departement', label: 'Departement', value: 2 },
              { id: 'Autre', label: 'Autre', value: 11 },
            ],
          },
          {
            id: 'Associations',
            label: 'Associations',
            value: 87,
          },
          {
            id: 'Autres acteurs privés',
            label: 'Autres acteurs privés',
            value: 24,
          },
        ],
      },
      {
        id: 'labels',
        label: 'Labels',
        statistics: [
          {
            id: 'structures-accueillant-des-cnfs',
            label: 'Structures accueillant des CNFS',
            value: 12,
          },
          {
            id: 'structures-labellisées-france-services',
            label: 'Structures labellisées France Services',
            value: 32,
          },
          {
            id: 'structures-habilitées-aidants-connect',
            label: 'Structures habilitées Aidants Connect',
            value: 76,
          },
        ],
      },
      {
        id: 'territoires-prioritaires',
        label: 'Territoires prioritaires',
        statistics: [
          {
            id: 'structures-en-quartier-prioritaire-de-la-ville-qpv',
            label: 'Structures en quartier prioritaire de la ville (QPV)',
            value: 12,
          },
          {
            id: 'structures-en-zone-de-revitalisation-rurale-zrr',
            label: 'Structures en zone de revitalisation rurale (ZRR)',
            value: 32,
          },
        ],
      },
    ],
  } satisfies BoxData

  const aidantConnectLocations = {
    id: 'aidants-numériques-identifiés',
    withDescription: true,
    label: 'Aidants Numériques identifiés',
    value: 123,
    statistics: [
      {
        id: 'conseillers',
        statistics: [
          {
            id: 'conseillers-numériques',
            label: 'Conseillers Numériques',
            value: 43,
          },
          {
            id: 'dont-conseillers-coordinateurs',
            label: 'dont Conseillers Coordinateurs',
            value: 2,
          },
          {
            id: 'aidants-habilités-à-aidant-connect',
            label: 'Aidants habilités à Aidant connect',
            value: 12,
          },
        ],
      },
    ],
  } satisfies BoxData

  const main = { inclusionLocations, aidantConnectLocations }

  const publicsAccompagnes = {
    id: 'publics-accompagnés',
    label: `Publics accompagnés`,
    description: 'Données factices',
    boxes: [
      {
        id: 'usagers-accompagnés',
        label: 'Usagers accompagnés',
        value: 123,
        statistics: [
          {
            id: 'par-des-conseillers-numériques',
            label: 'Par des Conseillers Numériques',
            value: 12,
            updated: new Date('2021-09-04'),
            source: 'conseiller-numerique.gouv.fr',
          },
          {
            id: 'par-des-aidants-habilités-à-aidants-connect',
            label: 'Par des Aidants habilités à Aidants Connect',
            value: 12,
            updated: new Date('2021-09-04'),
            source: 'aidantsconnect.beta.gouv.fr',
          },
        ],
      },
      {
        id: 'âge-des-usagers',
        label: 'Âge des usagers',
        updated: new Date('2021-09-04'),
        source: 'conseiller-numerique.gouv.fr',
        statistics: [
          { id: '60', label: '60 ans et plus', value: 20 },
          { id: '30', label: '35-60 ans', value: 15 },
          { id: '18', label: '18-35 ans', value: 5 },
          { id: '12', label: '12-18 ans', value: 50 },
          { id: '-12', label: 'Moins de 12 ans', value: 10 },
        ],
      },
      {
        id: 'statut-des-usagers',
        label: 'Statut des usagers',
        updated: new Date('2021-09-04'),
        source: 'conseiller-numerique.gouv.fr',
        statistics: [
          { id: 'nr', label: 'Non renseigné', value: 20 },
          { id: 'retraite', label: 'Retraité', value: 15 },
          { id: 'en-emploi', label: 'En emploi', value: 5 },
          { id: 'sans-emploi', label: 'Sans emploi', value: 50 },
          { id: 'scolarisee', label: 'Scolarisé(e)', value: 10 },
        ],
      },
    ],
  } satisfies BoxesData

  const accompagnements = {
    id: 'accompagnements',
    label: `Accompagnements`,
    description: 'Données factices',
    boxes: [
      {
        id: 'accompagnements',
        label: 'Accompagnements',
        value: 123,
        statistics: [
          {
            id: 'accompagnements-de-médiation-numérique',
            label: 'Accompagnements de médiation numérique',
            value: 12,
            updated: new Date('2021-09-04'),
            source: 'conseiller-numerique.gouv.fr',
          },
          {
            id: 'accompagnements-pour-réaliser-des-démarches-en-lignes',
            label: 'Accompagnements pour réaliser des démarches en lignes',
            value: 12,
            updated: new Date('2021-09-04'),
            source: 'aidantsconnect.beta.gouv.fr',
          },
        ],
      },
      {
        id: 'accompagnements-de-médiation-numérique',
        label:
          'Les 3 principaux thèmes d’accompagnements de médiation numérique',
        updated: new Date('2021-09-04'),
        source: 'conseiller-numerique.gouv.fr',
        statistics: [
          {
            id: 'prise-en-main',
            label: 'Prendre en main du matériel',
            value: 40,
          },
          { id: 'naviguation', label: 'Naviguer sur internet', value: 8 },
          { id: 'courriels', label: 'Courriels', value: 2 },
          { id: 'autres', label: 'Autres thématiques', value: 50 },
        ],
      },
      {
        id: 'réaliser-des-démarches-en-lignes',
        label:
          'Les 3 principaux thèmes d’accompagnements pour réaliser des démarches en lignes',
        updated: new Date('2021-09-04'),
        source: 'aidantsconnect.beta.gouv.fr',
        statistics: [
          { id: 'social', label: 'Social', value: 22 },
          { id: 'travail', label: 'Travail', value: 44 },
          { id: 'argent', label: 'Argent', value: 12 },
          { id: 'autres', label: 'Autres thématiques', value: 28 },
        ],
      },
    ],
  } satisfies BoxesData

  const detailed = { publicsAccompagnes, accompagnements }

  return { main, detailed, departement }
}

export default {
  title: 'Prefet/DashboardDépartement',
  component: DepartementDashboard,
} as Meta<typeof DepartementDashboard>

type Story = StoryObj<typeof DepartementDashboard>

const [rhone, paris] = [
  getDepartementGeoJson({ code: '69' }),
  getDepartementGeoJson({ code: '75' }),
]
if (!rhone || !paris) throw new Error('Departement not found')

export const Rhône: Story = {
  args: { data: getFakeData(rhone) },
}

export const Paris: Story = {
  args: { data: getFakeData(paris) },
}
