import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import MesActivitesListeLayout from '@app/web/app/coop/mes-activites/(liste)/MesActivitesListeLayout'
import MesActivitesListePage from '@app/web/app/coop/mes-activites/(liste)/MesActivitesListePage'
import { ActivitesListPageData } from '@app/web/app/coop/mes-activites/(liste)/getActivitesListPageData'
import MesActivitesListeEmptyPage from '@app/web/app/coop/mes-activites/(liste)/MesActivitesListeEmptyPage'
import { activitesForModalStories } from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsModalStoriesData'

const TemplateListe = ({ data }: { data: ActivitesListPageData }) => (
  <MesActivitesListeLayout vue="liste">
    <MesActivitesListePage data={Promise.resolve(data)} />
  </MesActivitesListeLayout>
)

const TemplateEmpty = () => (
  <MesActivitesListeLayout vue="liste" empty>
    <MesActivitesListeEmptyPage />
  </MesActivitesListeLayout>
)

const meta: Meta<typeof MesActivitesListePage> = {
  title: 'Activités/Liste/Cards',
  component: MesActivitesListePage,
}

export default meta

type Story = StoryObj<typeof TemplateListe>

export const SansActivites: Story = {
  name: 'Sans activités',
  render: () => <TemplateEmpty />,
  args: {},
}

const dataAvecActivites = {
  searchParams: {},
  mediateurId: '1',
  searchResult: {
    matchesCount: activitesForModalStories.length,
    moreResults: 0,
    totalPages: 1,
    activites: activitesForModalStories,
  },
  activiteDates: {
    first: new Date('2024-03-02'),
    last: new Date('2024-08-30'),
  },
} satisfies ActivitesListPageData

export const AvecActivites: Story = {
  name: 'Avec activités',
  render: (args) => <TemplateListe {...args} />,
  args: {
    data: dataAvecActivites,
  },
}
