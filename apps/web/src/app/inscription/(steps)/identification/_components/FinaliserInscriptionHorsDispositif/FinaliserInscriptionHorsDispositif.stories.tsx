import type { Meta, StoryObj } from '@storybook/react'
import { FinaliserInscriptionHorsDispositif } from './FinaliserInscriptionHorsDispositif'

export default {
  title: 'Inscription/Finaliser inscription médiateur',
  component: FinaliserInscriptionHorsDispositif,
} as Meta<typeof FinaliserInscriptionHorsDispositif>

type Story = StoryObj<typeof FinaliserInscriptionHorsDispositif>

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
