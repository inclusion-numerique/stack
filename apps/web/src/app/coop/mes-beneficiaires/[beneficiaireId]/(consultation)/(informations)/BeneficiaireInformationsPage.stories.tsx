import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  beneficiaireMaximaleMediateurAvecActivite,
  beneficiaireMinimaleMediateurAvecActivite,
} from '@app/fixtures/beneficiaires'
import { expect, within } from '@storybook/test'
import type { BeneficiaireInformationsPageData } from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/(informations)/getBeneficiaireInformationsPageData'
import ViewBeneficiaireLayout from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/ViewBeneficiaireLayout'
import ViewBeneficiaireInformationsPage from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/(informations)/ViewBeneficiaireInformationsPage'
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
    activites: 0,
  },
} satisfies BeneficiaireInformationsPageData['beneficiaire']

const sansInformations = {
  beneficiaire: beneficiaireSansInformations,
  thematiquesCounts: [],
  displayName: getBeneficiaireDisplayName(beneficiaireSansInformations),
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
    activites: 6,
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
  displayName: getBeneficiaireDisplayName(beneficiaireAvecInformations),
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
