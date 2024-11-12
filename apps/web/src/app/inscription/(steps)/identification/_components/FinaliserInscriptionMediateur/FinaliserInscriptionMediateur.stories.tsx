import type { Meta, StoryObj } from '@storybook/react'
import { FinaliserInscriptionMediateur } from './FinaliserInscriptionMediateur'

export default {
  title: 'Inscription/Finaliser inscription médiateur',
  component: FinaliserInscriptionMediateur,
} as Meta<typeof FinaliserInscriptionMediateur>

type Story = StoryObj<typeof FinaliserInscriptionMediateur>

export const Mediateur: Story = {
  args: {
    checkedProfilInscription: 'mediateur',
  },
}
Mediateur.storyName = 'Médiateur'

export const ConseillerNumeriqueTrouve: Story = {
  args: {
    checkedProfilInscription: 'conseiller-numerique',
  },
}
ConseillerNumeriqueTrouve.storyName = 'Conseiller Numerique identifié'

export const CoordinateurConseillerNumeriqueTrouve: Story = {
  args: {
    checkedProfilInscription: 'coordinateur',
  },
}
CoordinateurConseillerNumeriqueTrouve.storyName =
  'Coordinateur de conseiller numérique identifié'
