import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  beneficiaireMaximaleMediateurAvecActivite,
  beneficiaireMinimaleMediateurAvecActivite,
} from '@app/fixtures/beneficiaires'
import ViewBeneficiaireLayout from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/ViewBeneficiaireLayout'
import ViewBeneficiaireAccompagnementsPage from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/accompagnements/ViewBeneficiaireAccompagnementsPage'
import { BeneficiaireAccompagnementsPageData } from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/accompagnements/getBeneficiaireAccompagnementsPageData'

const Template = ({ data }: { data: BeneficiaireAccompagnementsPageData }) => (
  <ViewBeneficiaireLayout beneficiaire={data.beneficiaire}>
    <ViewBeneficiaireAccompagnementsPage data={data} />
  </ViewBeneficiaireLayout>
)

const meta: Meta<typeof ViewBeneficiaireAccompagnementsPage> = {
  title: 'Mes bénéficiaires/Consultation/Accompagnements',
  component: ViewBeneficiaireAccompagnementsPage,
}

export default meta

type Story = StoryObj<typeof ViewBeneficiaireAccompagnementsPage>

const beneficiaireSansAccompagnements = {
  ...beneficiaireMinimaleMediateurAvecActivite,
  _count: {
    crasIndividuels: 0,
    crasDemarchesAdministratives: 0,
    participationsAteliersCollectifs: 0,
  },
} satisfies BeneficiaireAccompagnementsPageData['beneficiaire']

const sansAccompagnements = {
  beneficiaire: beneficiaireSansAccompagnements,
  totalCrasCount: 0,
  activitesByDate: [],
} satisfies BeneficiaireAccompagnementsPageData

export const SansAccompagnements: Story = {
  name: 'Sans accompagnements',
  render: (args) => <Template {...args} />,
  args: {
    data: sansAccompagnements,
  },
}

const beneficiaireAvecAccompagnements = {
  ...beneficiaireMaximaleMediateurAvecActivite,
  _count: {
    crasIndividuels: 2,
    crasDemarchesAdministratives: 1,
    participationsAteliersCollectifs: 3,
  },
} satisfies BeneficiaireAccompagnementsPageData['beneficiaire']

const avecAccompagnements = {
  beneficiaire: beneficiaireAvecAccompagnements,
  totalCrasCount: 6,
  activitesByDate: [
    {
      activites: [
        {
          id: '1',
          date: new Date('2024-07-07T00:00:00.000Z'),
          niveau: 'Intermediaire',
          thematiques: ['ReseauxSociaux', 'CultureNumerique'],
          type: 'collectif',
          titreAtelier: 'Vos données personnelles sur instagram et facebook',
        },
      ],
      date: '2024-07-07',
    },
    {
      activites: [
        {
          id: '2',
          autonomie: 'EntierementAccompagne',
          date: new Date('2024-07-05T00:00:00.000Z'),
          thematiques: ['Email', 'Parentalite'],
          type: 'individuel',
        },
        {
          id: '3',
          autonomie: null,
          date: new Date('2024-07-05T00:00:00.000Z'),
          thematiques: [
            'Email',
            'Sante',
            'BanqueEtAchatsEnLigne',
            'PrendreEnMainDuMateriel',
            'InsertionProfessionnelle',
            'NavigationSurInternet',
            'CreerAvecLeNumerique',
            'ScolariteEtNumerique',
          ],
          type: 'individuel',
        },
        {
          id: '4',
          autonomie: 'Autonome',
          date: new Date('2024-07-05T00:00:00.000Z'),
          thematiques: ['SocialSante', 'Logement'],
          type: 'demarche',
        },
        {
          id: '5',
          autonomie: null,
          date: new Date('2024-07-05T00:00:00.000Z'),
          thematiques: ['SocialSante', 'Justice'],
          type: 'demarche',
        },
        {
          id: '6',
          date: new Date('2024-07-05T00:00:00.000Z'),
          niveau: 'Debutant',
          thematiques: [
            'Email',
            'ReseauxSociaux',
            'BanqueEtAchatsEnLigne',
            'PrendreEnMainDuMateriel',
            'InsertionProfessionnelle',
            'NavigationSurInternet',
            'CreerAvecLeNumerique',
            'ScolariteEtNumerique',
          ],
          type: 'collectif',
          titreAtelier: null,
        },
      ],
      date: '2024-07-05',
    },
  ],
} satisfies BeneficiaireAccompagnementsPageData

export const AvecAccompagnements: Story = {
  name: 'Avec accompagnements',
  render: (args) => <Template {...args} />,
  args: {
    data: avecAccompagnements,
  },
}
