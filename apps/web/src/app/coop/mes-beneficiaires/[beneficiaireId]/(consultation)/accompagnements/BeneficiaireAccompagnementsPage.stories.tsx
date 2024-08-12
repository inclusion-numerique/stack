import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  beneficiaireMaximaleMediateurAvecActivite,
  beneficiaireMinimaleMediateurAvecActivite,
} from '@app/fixtures/beneficiaires'
import ViewBeneficiaireLayout from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/ViewBeneficiaireLayout'
import ViewBeneficiaireAccompagnementsPage from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/accompagnements/ViewBeneficiaireAccompagnementsPage'
import { BeneficiaireAccompagnementsPageData } from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/accompagnements/getBeneficiaireAccompagnementsPageData'
import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'

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
    activites: 0,
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
    activites: 6,
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
          type: 'collectif',
          cra: {
            id: '1',
            date: new Date('2024-07-07T00:00:00.000Z'),
            niveau: 'Intermediaire',
            thematiques: ['ReseauxSociaux', 'CultureNumerique'],
            titreAtelier: 'Vos données personnelles sur instagram et facebook',
            participantsAnonymes: {
              ...participantsAnonymesDefault,
              id: '2',
            },
            lieuAtelier: 'Autre',
            lieuAccompagnementAutreCodePostal: '69002',
            lieuAccompagnementAutreCommune: 'Lyon 2',
            lieuActivite: null,
            notes: null,
            participants: [
              {
                beneficiaire: beneficiaireAvecAccompagnements,
              },
            ],
            lieuAccompagnementAutreCodeInsee: null,
            duree: 60,
          },
        },
      ],
      date: '2024-07-07',
    },
    {
      activites: [
        {
          type: 'individuel',
          cra: {
            id: '2',
            autonomie: 'EntierementAccompagne',
            date: new Date('2024-07-05T00:00:00.000Z'),
            thematiques: ['Email', 'Parentalite'],
            duree: 60,
            lieuActivite: null,
            beneficiaire: beneficiaireAvecAccompagnements,
            notes: null,
            structureDeRedirection: null,
            orienteVersStructure: null,
            lieuAccompagnementDomicileCommune: null,
            lieuAccompagnement: 'ADistance',
            lieuAccompagnementDomicileCodePostal: null,
            lieuAccompagnementDomicileCodeInsee: null,
            materiel: [],
          },
        },
        {
          type: 'individuel',
          cra: {
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
            duree: 60,
            lieuActivite: null,
            beneficiaire: beneficiaireAvecAccompagnements,
            notes: null,
            structureDeRedirection: null,
            orienteVersStructure: null,
            lieuAccompagnementDomicileCommune: null,
            lieuAccompagnement: 'ADistance',
            lieuAccompagnementDomicileCodePostal: null,
            lieuAccompagnementDomicileCodeInsee: null,
            materiel: [],
          },
        },
        {
          type: 'demarche',
          cra: {
            id: '4',
            autonomie: 'Autonome',
            date: new Date('2024-07-05T00:00:00.000Z'),
            thematiques: ['SocialSante', 'Logement'],

            duree: 60,
            lieuActivite: null,
            beneficiaire: beneficiaireAvecAccompagnements,
            notes: null,
            precisionsDemarche: 'Demande de logement social',
            lieuAccompagnementDomicileCommune: null,
            lieuAccompagnement: 'ADistance',
            lieuAccompagnementDomicileCodePostal: null,
            lieuAccompagnementDomicileCodeInsee: null,
            structureDeRedirection: null,
            degreDeFinalisation: null,
          },
        },
        {
          type: 'demarche',
          cra: {
            id: '5',
            autonomie: null,
            date: new Date('2024-07-05T00:00:00.000Z'),
            thematiques: ['SocialSante', 'Justice'],

            duree: 60,
            lieuActivite: null,
            beneficiaire: beneficiaireAvecAccompagnements,
            notes: null,
            precisionsDemarche: null,
            lieuAccompagnementDomicileCommune: null,
            lieuAccompagnement: 'ADistance',
            lieuAccompagnementDomicileCodePostal: null,
            lieuAccompagnementDomicileCodeInsee: null,
            structureDeRedirection: null,
            degreDeFinalisation: null,
          },
        },
        {
          type: 'collectif',
          cra: {
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
            titreAtelier: null,
            participantsAnonymes: {
              ...participantsAnonymesDefault,
              id: '2',
            },
            lieuAtelier: 'Autre',
            lieuAccompagnementAutreCodePostal: '69002',
            lieuAccompagnementAutreCommune: 'Lyon 2',
            lieuActivite: null,
            notes: null,
            participants: [
              {
                beneficiaire: beneficiaireAvecAccompagnements,
              },
            ],
            lieuAccompagnementAutreCodeInsee: null,
            duree: 60,
          },
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
