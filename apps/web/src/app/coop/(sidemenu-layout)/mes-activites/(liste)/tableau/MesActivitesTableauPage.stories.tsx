import MesActivitesListeEmptyPage from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/MesActivitesListeEmptyPage'
import MesActivitesListeLayout from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/MesActivitesListeLayout'
import type { ActivitesListPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/getActivitesListPageData'
import MesActivitesTableauPage from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/tableau/MesActivitesTableauPage'
import { activitesForModalStories } from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsModalStoriesData'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const TemplateTableau = ({ data }: { data: ActivitesListPageData }) => (
  <MesActivitesListeLayout vue="tableau">
    <MesActivitesTableauPage data={Promise.resolve(data)} />
  </MesActivitesListeLayout>
)

const TemplateEmpty = () => (
  <MesActivitesListeLayout vue="tableau" empty>
    <MesActivitesListeEmptyPage />
  </MesActivitesListeLayout>
)

const meta: Meta<typeof MesActivitesTableauPage> = {
  title: 'Activités/Liste/Tableau',
  component: MesActivitesTableauPage,
}

export default meta

type Story = StoryObj<typeof TemplateTableau>

export const SansActivites: Story = {
  name: 'Sans bénéficiaires',
  render: () => <TemplateEmpty />,
  args: {},
}

const dataAvecActivites = {
  searchParams: {},
  mediateurId: '1',
  isFiltered: false,
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
  render: (args) => <TemplateTableau {...args} />,
  args: {
    data: dataAvecActivites,
  },
}
