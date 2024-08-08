import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { beneficiaireMaximaleMediateurAvecActivite } from '@app/fixtures/beneficiaires'
import { BeneficiaireAccompagnementsPageData } from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/accompagnements/getBeneficiaireAccompagnementsPageData'
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

const beneficiaireAvecAccompagnements = {
  ...beneficiaireMaximaleMediateurAvecActivite,
  _count: {
    crasIndividuels: 2,
    crasDemarchesAdministratives: 1,
    participationsAteliersCollectifs: 3,
  },
} satisfies BeneficiaireAccompagnementsPageData['beneficiaire']

const beneficiaire = {
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
        participationsAteliersCollectifsCount: 0,
        craDemarchesAdministrativesCount: 0,
        craIndividuelsCount: 0,
        totalCrasCount: 0,
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
