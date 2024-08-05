import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import type { BeneficiaireInformationsData } from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(informations)/getBeneficiaireInformationsData'
import ViewBeneficiaireLayout from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/ViewBeneficiaireLayout'
import ViewBeneficiaireInformationsPage from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(informations)/ViewBeneficiaireInformationsPage'
import { v4 } from 'uuid'

const Template = ({ data }: { data: BeneficiaireInformationsData }) => {
  return (
    <ViewBeneficiaireLayout beneficiaire={data.beneficiaire}>
      <ViewBeneficiaireInformationsPage data={data} />
    </ViewBeneficiaireLayout>
  )
}

const meta: Meta<typeof ViewBeneficiaireInformationsPage> = {
  title: 'Mes bénéficiaires/Consultation/Informations',
  component: ViewBeneficiaireInformationsPage,
}

export default meta

type Story = StoryObj<typeof ViewBeneficiaireInformationsPage>

const beneficiaireSansInformations = {
  id: v4(),
  prenom: 'Jeanne',
  nom: 'Mouline',
  anneeNaissance: null,
  email: null,
  _count: {
    crasIndividuels: 0,
    crasDemarchesAdministratives: 0,
    participationsAteliersCollectifs: 0,
  },
} satisfies BeneficiaireInformationsData['beneficiaire']

const sansInformations = {
  beneficiaire: beneficiaireSansInformations,
  thematiquesCounts: {
    thematiquesAdministratif: [],
    thematiquesCollectif: [],
    thematiquesIndividuel: [],
  },
  displayName: 'Jeanne Mouline',
  totalCrasCount: 0,
} satisfies BeneficiaireInformationsData

export const SansInformations: Story = {
  name: 'Sans informations',
  render: (args) => <Template {...args} />,
  args: {
    data: sansInformations,
  },
}
