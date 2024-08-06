import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  beneficiaireMaximaleMediateurAvecActivite,
  beneficiaireMinimaleMediateurAvecActivite,
} from '@app/fixtures/beneficiaires'
import { expect, within } from '@storybook/test'
import type { BeneficiaireInformationsPageData } from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(informations)/getBeneficiaireInformationsData'
import ViewBeneficiaireLayout from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/ViewBeneficiaireLayout'
import ViewBeneficiaireInformationsPage from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(informations)/ViewBeneficiaireInformationsPage'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'

const Template = ({ data }: { data: BeneficiaireInformationsPageData }) => (
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
} satisfies BeneficiaireInformationsPageData['beneficiaire']

const sansInformations = {
  beneficiaire: beneficiaireSansInformations,
  thematiquesCounts: [],
  displayName: getBeneficiaireDisplayName(beneficiaireSansInformations),
  totalCrasCount: 0,
  activites: [],
} satisfies BeneficiaireInformationsPageData

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
} satisfies BeneficiaireInformationsPageData['beneficiaire']

const avecInformations = {
  beneficiaire: beneficiaireAvecInformations,
  thematiquesCounts: [
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
  activites: [
    {
      date: '2021-09-01',
      activites: [
        {
          type: 'individuel',
          date: '2021-09-01',
          thematiques: ['BanqueEtAchatsEnLigne'],
          autonomie: 'Autonome',
        },
      ],
    },
  ],
  displayName: getBeneficiaireDisplayName(beneficiaireAvecInformations),
  totalCrasCount: 6,
} satisfies BeneficiaireInformationsPageData

export const AvecInformations: Story = {
  name: 'Avec informations',
  render: (args) => <Template {...args} />,
  args: {
    data: avecInformations,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // It finds tags with count 1 without the count
    await expect(
      canvas.getByText('Culture numérique', { selector: '.fr-tag' }),
    ).toBeInTheDocument()

    // It finds the tags with count > 1 with the count
    await expect(
      canvas.getByText(
        (_, element) =>
          element?.textContent === 'Banque et achats en ligne · 3',
        { selector: '.fr-tag' },
      ),
    ).toBeInTheDocument()
  },
}
