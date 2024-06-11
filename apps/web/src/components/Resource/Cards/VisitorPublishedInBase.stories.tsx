import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { ResourcesListWrapper } from '@app/storybook/components/ResourcesListWrapper'
import { mediumContainerStory, mobileStory } from '@app/storybook/storyHelper'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import { testSessionUser } from '@app/web/test/testSessionUser'
import { date, resource, updated } from './cardsStoriesHelpers'

export default {
  title: 'Ressources/Cards/Ressource publiée dans une base/Actions visiteurs',
  component: ResourceCard,
} as Meta<typeof ResourceCard>

type Story = StoryObj<typeof ResourceCard>

const Template = (props: ComponentProps<typeof ResourceCard>) => (
  <ResourcesListWrapper>
    <ResourceCard {...props} />
  </ResourcesListWrapper>
)

const render = (props: ComponentProps<typeof ResourceCard>) => (
  <Template {...props} />
)

// region Actions visiteurs - Publiée en public
const PublishedPublicStory: Story = {
  args: {
    resource: { ...resource, published: date, lastPublished: date },
    user: testSessionUser,
    isContributor: false,
  },
  render,
}

export const PublishedPublic = mediumContainerStory({
  ...PublishedPublicStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29255&t=i9GYiv7b09UnqrXx-4',
      },
    ],
  },
})
PublishedPublic.storyName = 'Publiée en public'

export const PublishedPublicMobile = mobileStory({
  ...PublishedPublicStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10998-56871&t=2gdxVbP0ENf648Yt-4',
      },
    ],
  },
})
PublishedPublicMobile.storyName = 'Publiée en public (mobile)'
// endregion

// region Actions visiteurs - Publiée en public avec mise à jour
const PublishedPublicUpdatedStory: Story = {
  args: {
    resource: { ...resource, published: date, updated, lastPublished: updated },
    user: testSessionUser,
    isContributor: false,
  },
  render,
}

export const PublishedPublicUpdated = mediumContainerStory({
  ...PublishedPublicUpdatedStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29258&t=i9GYiv7b09UnqrXx-4',
      },
    ],
  },
})
PublishedPublicUpdated.storyName = 'Publiée en public avec mise à jour'

export const PublishedPublicUpdatedMobile = mobileStory({
  ...PublishedPublicUpdatedStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10998-56874&t=2gdxVbP0ENf648Yt-4',
      },
    ],
  },
})
PublishedPublicUpdatedMobile.storyName =
  'Publiée en public avec mise à jour (mobile)'
// endregion

// region Actions visiteurs - Publiée en privée
const PublishedPrivateStory: Story = {
  args: {
    resource: {
      ...resource,
      published: date,
      lastPublished: date,
      isPublic: false,
    },
    user: testSessionUser,
    isContributor: false,
  },
  render,
}

export const PublishedPrivate = mediumContainerStory({
  ...PublishedPrivateStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29264&t=i9GYiv7b09UnqrXx-4',
      },
    ],
  },
})
PublishedPrivate.storyName = 'Publiée en privée'

export const PublishedPrivateMobile = mobileStory({
  ...PublishedPrivateStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10998-56878&t=2gdxVbP0ENf648Yt-4',
      },
    ],
  },
})
PublishedPrivateMobile.storyName = 'Publiée en privée (mobile)'
// endregion

// region Actions visiteurs - Publiée en privée avec mise à jour
const PublishedPrivateUpdatedStory: Story = {
  args: {
    resource: {
      ...resource,
      published: date,
      updated,
      lastPublished: updated,
      isPublic: false,
    },
    user: testSessionUser,
    isContributor: false,
  },
  render,
}

export const PublishedPrivateUpdated = mediumContainerStory({
  ...PublishedPrivateUpdatedStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29267&t=i9GYiv7b09UnqrXx-4',
      },
    ],
  },
})
PublishedPrivateUpdated.storyName = 'Publiée en privée avec mise à jour'

export const PublishedPrivateUpdatedMobile = mobileStory({
  ...PublishedPrivateUpdatedStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10998-56881&t=2gdxVbP0ENf648Yt-4',
      },
    ],
  },
})
PublishedPrivateUpdatedMobile.storyName =
  'Publiée en privée avec mise à jour (mobile)'
// endregion
