import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import MesActivitesListeLayout from '@app/web/app/coop/mes-activites/(liste)/MesActivitesListeLayout'
import MesActivitesTableauPage from '@app/web/app/coop/mes-activites/(liste)/tableau/MesActivitesTableauPage'
import MesActivitesListeEmptyPage from '@app/web/app/coop/mes-activites/(liste)/MesActivitesListeEmptyPage'
import type { ActivitesListPageData } from '@app/web/app/coop/mes-activites/(liste)/getActivitesListPageData'
import { activitesForModalStories } from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsModalStoriesData'

const TemplateTableau = ({ data }: { data: ActivitesListPageData }) => (
  <MesActivitesListeLayout vue="tableau">
    <MesActivitesTableauPage data={data} />
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

type Story = StoryObj<typeof MesActivitesTableauPage>

export const SansActivites: Story = {
  name: 'Sans bénéficiaires',
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
} satisfies ActivitesListPageData

export const AvecActivites: Story = {
  name: 'Avec activités',
  render: (args) => <TemplateTableau {...args} />,
  args: {
    data: dataAvecActivites,
  },
}
