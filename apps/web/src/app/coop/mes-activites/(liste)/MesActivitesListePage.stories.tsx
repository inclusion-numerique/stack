import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import MesActivitesListeLayout from '@app/web/app/coop/mes-activites/(liste)/MesActivitesListeLayout'
import MesActivitesListePage from '@app/web/app/coop/mes-activites/(liste)/MesActivitesListePage'
import { ActivitesListPageData } from '@app/web/app/coop/mes-activites/(liste)/getActivitesListPageData'
import MesActivitesListeEmptyPage from '@app/web/app/coop/mes-activites/(liste)/MesActivitesListeEmptyPage'

const TemplateListe = ({ data }: { data: ActivitesListPageData }) => (
  <MesActivitesListeLayout activitesCount={data.searchResult.matchesCount}>
    <MesActivitesListePage data={data} />
  </MesActivitesListeLayout>
)

const TemplateEmpty = () => (
  <MesActivitesListeLayout activitesCount={0}>
    <MesActivitesListeEmptyPage />
  </MesActivitesListeLayout>
)

const meta: Meta<typeof MesActivitesListePage> = {
  title: 'Mes bénéficiaires/Liste',
  component: MesActivitesListePage,
}

export default meta

type Story = StoryObj<typeof MesActivitesListePage>

export const SansActivites: Story = {
  name: 'Sans bénéficiaires',
  render: () => <TemplateEmpty />,
  args: {},
}

const activite = {
  id: '1',
  prenom: 'Jean',
  nom: 'Dupont',
  creation: new Date(),
  communeResidence: null,
  mediateurId: '1',
  adresse: null,
  anneeNaissance: null,
  craDemarchesAdministrativesCount: 1,
  craIndividuelsCount: 2,
  participationsAteliersCollectifsCount: 3,
  totalCrasCount: 6,
  email: null,
  pasDeTelephone: null,
  genre: null,
  notes: null,
  statutSocial: null,
  telephone: null,
  trancheAge: null,
} satisfies ActivitesListPageData['searchResult']['activites'][number]

const dataAvecActivites = {
  searchParams: {},
  mediateurId: '1',
  searchResult: {
    matchesCount: 2,
    moreResults: 0,
    totalPages: 1,
    activites: [
      {
        ...activite,
      },
      {
        ...activite,
        id: '2',
        prenom: 'Marie',
        nom: 'Durand',
        anneeNaissance: 1980,
      },
      {
        ...activite,
        id: '3',
        prenom: 'Paul',
        nom: 'Martin',
        participationsAteliersCollectifsCount: 0,
        craDemarchesAdministrativesCount: 0,
        craIndividuelsCount: 0,
        totalCrasCount: 0,
      },
    ],
  },
} satisfies ActivitesListPageData

export const AvecActivites: Story = {
  name: 'Avec bénéficiaires',
  render: (args) => <TemplateListe {...args} />,
  args: {
    data: dataAvecActivites,
  },
}
