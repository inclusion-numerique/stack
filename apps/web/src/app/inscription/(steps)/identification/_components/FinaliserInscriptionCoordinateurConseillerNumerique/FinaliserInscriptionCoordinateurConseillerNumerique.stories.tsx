import { Meta, StoryObj } from '@storybook/react'
import { FinaliserInscriptionCoordinateurConseillerNumerique } from './FinaliserInscriptionCoordinateurConseillerNumerique'

export default {
  title: 'Inscription/Finaliser inscription coordinateur',
  component: FinaliserInscriptionCoordinateurConseillerNumerique,
} as Meta<typeof FinaliserInscriptionCoordinateurConseillerNumerique>

type Story = StoryObj<
  typeof FinaliserInscriptionCoordinateurConseillerNumerique
>

export const CoordinateurConseillerNumeriqueTrouve: Story = {
  args: {
    user: { email: 'john-doe@acme.fr', id: '1' },
    checkedProfilInscription: 'coordinateur',
  },
}
CoordinateurConseillerNumeriqueTrouve.storyName =
  'Coordinateur de conseiller numérique identifié'

export const ConseillerNumeriqueTrouve: Story = {
  args: {
    user: { email: 'john-doe@acme.fr', id: '1' },
    checkedProfilInscription: 'conseiller-numerique',
  },
}
ConseillerNumeriqueTrouve.storyName = 'Conseiller numérique identifié'

export const MediateurTrouve: Story = {
  args: {
    user: { email: 'john-doe@acme.fr', id: '1' },
    checkedProfilInscription: 'mediateur',
  },
}
MediateurTrouve.storyName = 'Médiateur'
