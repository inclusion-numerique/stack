import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import MesBeneficiairesListeLayout from '@app/web/app/coop/mes-beneficiaires/(liste)/MesBeneficiairesListeLayout'
import MesBeneficiairesListePage from '@app/web/app/coop/mes-beneficiaires/(liste)/MesBeneficiairesListePage'
import { BeneficiairesListPageData } from '@app/web/app/coop/mes-beneficiaires/(liste)/getBeneficiairesListPageData'
import MesBeneficiairesListeEmptyPage from '@app/web/app/coop/mes-beneficiaires/(liste)/MesBeneficiairesListeEmptyPage'

const TemplateListe = ({ data }: { data: BeneficiairesListPageData }) => (
  <MesBeneficiairesListeLayout
    beneficiairesCount={data.searchResult.matchesCount}
  >
    <MesBeneficiairesListePage data={data} />
  </MesBeneficiairesListeLayout>
)

const TemplateEmpty = () => (
  <MesBeneficiairesListeLayout beneficiairesCount={0}>
    <MesBeneficiairesListeEmptyPage />
  </MesBeneficiairesListeLayout>
)

const meta: Meta<typeof MesBeneficiairesListePage> = {
  title: 'Mes bénéficiaires/Liste',
  component: MesBeneficiairesListePage,
}

export default meta

type Story = StoryObj<typeof MesBeneficiairesListePage>

export const SansBeneficiaires: Story = {
  name: 'Sans bénéficiaires',
  render: () => <TemplateEmpty />,
  args: {},
}

const beneficiaire = {
  id: '1',
  prenom: 'Jean',
  nom: 'Dupont',
  creation: new Date(),
  communeResidence: null,
  mediateurId: '1',
  anneeNaissance: null,
  trancheAge: null,
  _count: {
    accompagnements: 6,
  },
} satisfies BeneficiairesListPageData['searchResult']['beneficiaires'][number]

const dataAvecBeneficiaires = {
  searchParams: {},
  mediateurId: '1',
  searchResult: {
    matchesCount: 2,
    moreResults: 0,
    totalPages: 1,
    beneficiaires: [
      {
        ...beneficiaire,
      },
      {
        ...beneficiaire,
        id: '2',
        prenom: 'Marie',
        nom: 'Durand',
        anneeNaissance: 1980,
      },
      {
        ...beneficiaire,
        id: '3',
        prenom: 'Paul',
        nom: 'Martin',
        _count: {
          accompagnements: 0,
        },
      },
    ],
  },
} satisfies BeneficiairesListPageData

export const AvecBeneficiaires: Story = {
  name: 'Avec bénéficiaires',
  render: (args) => <TemplateListe {...args} />,
  args: {
    data: dataAvecBeneficiaires,
  },
}
