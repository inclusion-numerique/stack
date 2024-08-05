import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  beneficiaireMaximaleMediateurAvecActivite,
  beneficiaireMinimaleMediateurAvecActivite,
} from '@app/fixtures/beneficiaires'
import type { BeneficiaireInformationsData } from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(informations)/getBeneficiaireInformationsData'
import ViewBeneficiaireLayout from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/ViewBeneficiaireLayout'
import ViewBeneficiaireInformationsPage from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(informations)/ViewBeneficiaireInformationsPage'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'

const Template = ({ data }: { data: BeneficiaireInformationsData }) => (
  <ViewBeneficiaireLayout beneficiaire={data.beneficiaire}>
    <ViewBeneficiaireInformationsPage data={data} />
  </ViewBeneficiaireLayout>
)

const meta: Meta<typeof ViewBeneficiaireInformationsPage> = {
  title: 'Mes bénéficiaires/Consultation/Informations',
  component: ViewBeneficiaireInformationsPage,
}

export default meta

type Story = StoryObj<typeof ViewBeneficiaireInformationsPage>

const beneficiaireSansInformations = {
  ...beneficiaireMinimaleMediateurAvecActivite,
  _count: {
    crasIndividuels: 0,
    crasDemarchesAdministratives: 0,
    participationsAteliersCollectifs: 0,
  },
} satisfies BeneficiaireInformationsData['beneficiaire']

const sansInformations = {
  beneficiaire: beneficiaireSansInformations,
  thematiquesCounts: {
    crasCollectifs: [],
    crasIndividuels: [],
    crasDemarchesAdministratives: [],
    total: [],
  },
  displayName: getBeneficiaireDisplayName(beneficiaireSansInformations),
  totalCrasCount: 0,
} satisfies BeneficiaireInformationsData

export const SansInformations: Story = {
  name: 'Sans informations',
  render: (args) => <Template {...args} />,
  args: {
    data: sansInformations,
  },
}

const beneficiaireAvecInformations = {
  ...beneficiaireMaximaleMediateurAvecActivite,
  _count: {
    crasIndividuels: 2,
    crasDemarchesAdministratives: 1,
    participationsAteliersCollectifs: 3,
  },
} satisfies BeneficiaireInformationsData['beneficiaire']

const avecInformations = {
  beneficiaire: beneficiaireAvecInformations,
  thematiquesCounts: {
    crasIndividuels: [
      {
        thematique: 'BanqueEtAchatsEnLigne',
        count: 2,
        enumValue: '',
        label: 'Banque et achats en ligne',
      },
    ],
    crasDemarchesAdministratives: [
      {
        thematique: 'ArgentImpots',
        count: 1,
        enumValue: '',
        label: 'Argent et impôts',
      },
    ],
    crasCollectifs: [
      {
        thematique: 'BanqueEtAchatsEnLigne',
        count: 1,
        enumValue: '',
        label: 'Banque et achats en ligne',
      },
      {
        thematique: 'CultureNumerique',
        count: 1,
        enumValue: '',
        label: 'Culture numérique',
      },
      {
        thematique: 'Entrepreneuriat',
        count: 1,
        enumValue: '',
        label: 'Entrepreneuriat',
      },
    ],
    total: [
      {
        thematique: 'BanqueEtAchatsEnLigne',
        count: 3,
        enumValue: '',
        label: 'Banque et achats en ligne',
      },
      {
        thematique: 'CultureNumerique',
        count: 1,
        enumValue: '',
        label: 'Culture numérique',
      },
      {
        thematique: 'Entrepreneuriat',
        count: 1,
        enumValue: '',
        label: 'Entrepreneuriat',
      },
      {
        thematique: 'ArgentImpots',
        count: 1,
        enumValue: '',
        label: 'Argent et impôts',
      },
    ],
  },
  displayName: getBeneficiaireDisplayName(beneficiaireAvecInformations),
  totalCrasCount: 6,
} satisfies BeneficiaireInformationsData

export const AvecInformations: Story = {
  name: 'Avec informations',
  render: (args) => <Template {...args} />,
  args: {
    data: avecInformations,
  },
}
