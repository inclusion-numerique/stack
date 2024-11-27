import { Meta, StoryObj } from '@storybook/react'
import { MesStatistiquesPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/getMesStatistiquesPageData'
import { quantifiedSharesFromFixedValues } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/statistiquesFixturesHelpers'
import {
  genreLabels,
  statutSocialLabels,
  trancheAgeLabels,
} from '@app/web/beneficiaire/beneficiaire'
import {
  dureeAccompagnementParDefautLabels,
  materielLabels,
  thematiqueDemarcheAdministrativeLabels,
  thematiqueLabels,
  typeActiviteLabels,
  typeLieuLabels,
} from '@app/web/cra/cra'
import { MesStatistiques } from './MesStatistiques'

const statistiquesPageData = {
  activiteDates: {
    first: new Date('2024-03-02'),
    last: new Date('2024-08-30'),
  },
  accompagnementsParJour: [
    { label: '01/08', count: 8 },
    { label: '02/08', count: 7 },
    { label: '03/08', count: 9 },
    { label: '04/08', count: 6 },
    { label: '05/08', count: 9 },
    { label: '06/08', count: 0 },
    { label: '07/08', count: 0 },
    { label: '08/08', count: 9 },
    { label: '09/08', count: 5 },
    { label: '10/08', count: 40 },
    { label: '11/08', count: 6 },
    { label: '12/08', count: 7 },
    { label: '13/08', count: 0 },
    { label: '14/08', count: 0 },
    { label: '15/08', count: 8 },
    { label: '16/08', count: 9 },
    { label: '17/08', count: 6 },
    { label: '18/08', count: 7 },
    { label: '19/08', count: 9 },
    { label: '20/08', count: 0 },
    { label: '21/08', count: 0 },
    { label: '22/08', count: 9 },
    { label: '23/08', count: 7 },
    { label: '24/08', count: 8 },
    { label: '25/08', count: 6 },
    { label: '26/08', count: 9 },
    { label: '27/08', count: 0 },
    { label: '28/08', count: 0 },
    { label: '29/08', count: 10 },
    { label: '30/08', count: 9 },
  ],
  accompagnementsParMois: [
    { label: 'Mars', count: 305 },
    { label: 'Avr.', count: 275 },
    { label: 'Mai', count: 320 },
    { label: 'Juin', count: 330 },
    { label: 'Juil.', count: 340 },
    { label: 'Août', count: 350 },
  ],
  totalCounts: {
    accompagnements: {
      total: 3300,
      individuels: {
        total: 1650,
        proportion: 50,
      },
      collectifs: {
        total: 1350,
        proportion: 40,
      },
      demarches: {
        total: 300,
        proportion: 10,
      },
    },
    activites: {
      total: 1000,
      individuels: {
        total: 500,
        proportion: 50,
      },
      collectifs: {
        total: 400,
        proportion: 40,
        participants: 2500,
      },
      demarches: {
        total: 100,
        proportion: 10,
      },
    },
    beneficiaires: {
      total: 550,
      anonymes: 120,
      suivis: 430,
    },
  },
  activites: {
    total: 1000,
    typeActivites: quantifiedSharesFromFixedValues({
      enumObject: typeActiviteLabels,
      fixedValues: [400, 350, 250],
    }),
    thematiques: quantifiedSharesFromFixedValues({
      enumObject: thematiqueLabels,
      fixedValues: [80, 100, 90, 70, 60, 40, 30, 20, 25, 10, 10, 10, 10, 5],
    }),
    thematiquesDemarches: quantifiedSharesFromFixedValues({
      enumObject: thematiqueDemarcheAdministrativeLabels,
      fixedValues: [100, 90, 80, 60, 50, 40, 30, 20, 10, 10],
    }),
    materiels: quantifiedSharesFromFixedValues({
      enumObject: materielLabels,
      fixedValues: [300, 200, 150, 120, 230],
    }),
    typeLieu: quantifiedSharesFromFixedValues({
      enumObject: typeLieuLabels,
      fixedValues: [250, 450, 50, 250],
    }),
    durees: quantifiedSharesFromFixedValues({
      enumObject: dureeAccompagnementParDefautLabels,
      fixedValues: [300, 400, 200, 100],
    }),
  },
  beneficiaires: {
    total: 550,
    genres: quantifiedSharesFromFixedValues({
      enumObject: genreLabels,
      fixedValues: [70, 80, 400],
    }),
    trancheAges: quantifiedSharesFromFixedValues({
      enumObject: trancheAgeLabels,
      fixedValues: [50, 60, 80, 100, 120, 140, 200],
    }),
    statutsSocial: quantifiedSharesFromFixedValues({
      enumObject: statutSocialLabels,
      fixedValues: [50, 60, 70, 80, 290],
    }),
    communes: [
      {
        nom: 'Paris',
        codeInsee: '75056',
        codePostal: '75000',
        count: 50,
        label: 'Paris',
        proportion: 20,
      },
      {
        nom: 'Lyon',
        codeInsee: '69123',
        codePostal: '69000',
        count: 30,
        label: 'Lyon',
        proportion: 12,
      },
      {
        nom: 'Marseille',
        codeInsee: '13055',
        codePostal: '13000',
        count: 40,
        label: 'Marseille',
        proportion: 16,
      },
      {
        nom: 'Nice',
        codeInsee: '06088',
        codePostal: '06000',
        count: 20,
        label: 'Nice',
        proportion: 8,
      },
    ],
  },
  structures: [
    {
      id: '1',
      nom: 'Structure A',
      commune: 'Paris',
      codePostal: '75000',
      codeInsee: '75056',
      count: 120,
      label: 'Structure A',
      proportion: 40,
    },
    {
      id: '2',
      nom: 'Structure B',
      commune: 'Lyon',
      codePostal: '69000',
      codeInsee: '69123',
      count: 80,
      label: 'Structure B',
      proportion: 30,
    },
    {
      id: '3',
      nom: 'Structure C',
      commune: 'Marseille',
      codePostal: '13000',
      codeInsee: '13055',
      count: 50,
      label: 'Structure C',
      proportion: 17,
    },
    {
      id: '4',
      nom: 'Structure D',
      commune: 'Nice',
      codePostal: '06000',
      codeInsee: '06088',
      count: 50,
      label: 'Structure D',
      proportion: 17,
    },
  ],
  activitesFilters: {},
  communesOptions: [],
  departementsOptions: [],
  initialBeneficiairesOptions: [],
  initialMediateursOptions: [],
  lieuxActiviteOptions: [],
} satisfies MesStatistiquesPageData

export default {
  title: 'Mes statistiques',
  component: MesStatistiques,
} as Meta<typeof MesStatistiques>

type Story = StoryObj<typeof MesStatistiques>

export const Statistiques: Story = {
  storyName: 'Statistiques',
  args: {
    ...statistiquesPageData,
    codeInsee: '75101',
  },
}
