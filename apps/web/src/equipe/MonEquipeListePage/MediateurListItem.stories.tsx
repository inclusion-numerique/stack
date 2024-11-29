import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { MediateurList, MediateurListProps } from './MediateurList'
import { MediateurListItem } from './MediateurListItem'

export default {
  title: 'Équipe/Liste des médiateurs',
  component: MediateurListItem,
} as Meta<typeof MediateurListItem>

type Story = StoryObj<typeof MediateurListItem>

const Template = (props: MediateurListProps) => (
  <MediateurList mediateurs={[props]} baseHref="/" />
)

export const conseillerNumeriqueFinDeContrat: Story = {
  args: {
    firstName: 'Henri',
    lastName: 'Doe',
    email: 'henri@doe.com',
    phone: '0345678901',
    status: 'Actif',
    isConseillerNumerique: true,
    finDeContrat: '15.11.2024',
  },
  render: Template,
}
conseillerNumeriqueFinDeContrat.storyName =
  'Conseiller numérique fin de contrat'

export const ConseillerNumeriqueActif: Story = {
  args: {
    firstName: 'Alice',
    lastName: 'Doe',
    email: 'alice@doe.com',
    phone: '0456789012',
    status: 'Actif',
    isConseillerNumerique: true,
  },
  render: Template,
}
ConseillerNumeriqueActif.storyName = 'Conseiller numérique actif'

export const ConseillerNumeriqueInactif: Story = {
  args: {
    firstName: 'Olivier',
    lastName: 'Doe',
    email: 'olivier@doe.com',
    phone: '0234567890',
    status: 'Inactif depuis le 04.11.2024',
    isConseillerNumerique: true,
  },
  render: Template,
}
ConseillerNumeriqueInactif.storyName = 'Conseiller numérique inactif'

export const MediateurIvitationEnoyee: Story = {
  args: {
    firstName: 'Mary',
    lastName: 'Doe',
    email: 'mary@doe.com',
    phone: '0123456789',
    status: 'Invitation envoyée',
  },
  render: Template,
}
MediateurIvitationEnoyee.storyName = 'Invitation envoyé à un médiateur'

export const MediateurActif: Story = {
  args: {
    firstName: 'Alfred',
    lastName: 'Doe',
    email: 'alfred@doe.com',
    phone: '0678901234',
    status: 'Actif',
  },
  render: Template,
}
MediateurActif.storyName = 'Médiateur actif'

export const MediateurIvitationEnoyeeMailOnly: Story = {
  args: {
    email: 'john@doe.com',
    status: 'Invitation envoyée',
  },
  render: Template,
}
MediateurIvitationEnoyeeMailOnly.storyName =
  'Invitation envoyé à un médiateur non inscrit'
