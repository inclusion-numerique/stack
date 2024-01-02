import { Meta, StoryObj } from '@storybook/react'
import { ResourceEditionState } from '../enums/ResourceEditionState'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import ResourceEditionActionBar from './ResourceEditionActionBar'

export default {
  title: 'Ressource/EditionActionBar',
  component: ResourceEditionActionBar,
  argTypes: {
    action: { action: 'clicked' },
    editionState: {
      options: [...Object.values(ResourceEditionState), null],
      control: { type: 'radio' },
    },
  },
} as Meta<typeof ResourceEditionActionBar>

type Story = StoryObj<typeof ResourceEditionActionBar>

export const Brouillon: Story = {
  args: {
    publishedState: ResourcePublishedState.DRAFT,
    editionState: ResourceEditionState.SAVED,
    unPublishedEdits: false,
  },
}

export const BrouillonEnregistrement: Story = {
  args: {
    publishedState: ResourcePublishedState.DRAFT,
    editionState: ResourceEditionState.SAVING,
    unPublishedEdits: false,
  },
}

export const BrouillonModifié: Story = {
  args: {
    publishedState: ResourcePublishedState.DRAFT,
    editionState: ResourceEditionState.SAVED,
    unPublishedEdits: true,
  },
}

export const Publique: Story = {
  args: {
    publishedState: ResourcePublishedState.PUBLIC,
    editionState: ResourceEditionState.SAVED,
    unPublishedEdits: false,
  },
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export const PrivéeEnregistrement: Story = {
  args: {
    publishedState: ResourcePublishedState.PRIVATE,
    editionState: ResourceEditionState.SAVING,
    unPublishedEdits: false,
  },
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export const PubliqueModifiée: Story = {
  args: {
    publishedState: ResourcePublishedState.PUBLIC,
    editionState: ResourceEditionState.SAVED,
    unPublishedEdits: true,
  },
}
