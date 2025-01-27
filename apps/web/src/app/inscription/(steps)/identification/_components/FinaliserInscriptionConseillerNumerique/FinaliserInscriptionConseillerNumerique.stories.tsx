import { Meta, StoryObj } from '@storybook/react'
import { FinaliserInscriptionConseillerNumerique } from './FinaliserInscriptionConseillerNumerique'

export default {
  title: 'Inscription/Finaliser inscription conseiller',
  component: FinaliserInscriptionConseillerNumerique,
} as Meta<typeof FinaliserInscriptionConseillerNumerique>

type Story = StoryObj<typeof FinaliserInscriptionConseillerNumerique>

export const ConseillerNumeriqueTrouve: Story = {
  args: {
    user: { email: 'john-doe@acme.fr', id: '1' },
    checkedProfilInscription: 'conseiller-numerique',
  },
}
ConseillerNumeriqueTrouve.storyName = 'Conseiller numérique identifié'

export const CoordinateurConseillerNumeriqueTrouve: Story = {
  args: {
    user: { email: 'john-doe@acme.fr', id: '1' },
    checkedProfilInscription: 'coordinateur',
  },
}
CoordinateurConseillerNumeriqueTrouve.storyName =
  'Coordinateur de conseiller numérique identifié'

export const MediateurTrouve: Story = {
  args: {
    user: { email: 'john-doe@acme.fr', id: '1' },
    checkedProfilInscription: 'mediateur',
  },
}
MediateurTrouve.storyName = 'Médiateur'
