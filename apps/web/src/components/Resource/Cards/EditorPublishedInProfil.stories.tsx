import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { ResourcesListWrapper } from '@app/storybook/components/ResourcesListWrapper'
import { mediumContainerStory, mobileStory } from '@app/storybook/storyHelper'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import { creatorUser, date, resource, updated } from './cardsStoriesHelpers'

export default {
  title:
    'Ressources/Cards/Ressource publiée dans un profil/Actions éditeurs (créateurs et contributeurs)',
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

// region Actions éditeurs (créateurs et contributeurs) - Brouillon
const DraftStory: Story = {
  args: {
    resource: {
      ...resource,
      baseId: null,
      base: null,
      published: null,
      lastPublished: null,
    },
    user: creatorUser,
    isContributor: true,
    isDraft: true,
  },
  render,
}

export const Draft = mediumContainerStory({
  ...DraftStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29179&t=i9GYiv7b09UnqrXx-4',
      },
    ],
  },
})
Draft.storyName = 'Brouillon'

export const DraftMobile = mobileStory({
  ...DraftStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173801&t=2gdxVbP0ENf648Yt-4',
      },
    ],
  },
})
DraftMobile.storyName = 'Brouillon (mobile)'
// endregion

// region Actions éditeurs (créateurs et contributeurs) - Brouillon modifié
const DraftUpdatedStory: Story = {
  args: {
    resource: {
      ...resource,
      baseId: null,
      base: null,
      published: null,
      lastPublished: null,
      updated,
    },
    user: creatorUser,
    isContributor: true,
    isDraft: true,
  },
  render,
}

export const DraftUpdated = mediumContainerStory({
  ...DraftUpdatedStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29182&t=i9GYiv7b09UnqrXx-4',
      },
    ],
  },
})
DraftUpdated.storyName = 'Brouillon modifié'

export const DraftUpdatedMobile = mobileStory({
  ...DraftUpdatedStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173804&t=2gdxVbP0ENf648Yt-4',
      },
    ],
  },
})
DraftUpdatedMobile.storyName = 'Brouillon modifié (mobile)'
// endregion

// region Actions éditeurs (créateurs et contributeurs) - Publiée en public
const PublishedPublicStory: Story = {
  args: {
    resource: { ...resource, baseId: null, base: null, published: date },
    user: creatorUser,
    isContributor: true,
  },
  render,
}

export const PublishedPublic = mediumContainerStory({
  ...PublishedPublicStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29185&t=i9GYiv7b09UnqrXx-4',
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
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173807&t=2gdxVbP0ENf648Yt-4',
      },
    ],
  },
})
PublishedPublicMobile.storyName = 'Publiée en public (mobile)'
// endregion

// region Actions éditeurs (créateurs et contributeurs) - Publiée en public avec mise à jour
const PublishedPublicUpdatedStory: Story = {
  args: {
    resource: {
      ...resource,
      baseId: null,
      base: null,
      published: date,
      updated,
      lastPublished: updated,
    },
    user: creatorUser,
    isContributor: true,
  },
  render,
}

export const PublishedPublicUpdated = mediumContainerStory({
  ...PublishedPublicUpdatedStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29188&t=i9GYiv7b09UnqrXx-4',
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
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173810&t=2gdxVbP0ENf648Yt-4',
      },
    ],
  },
})
PublishedPublicUpdatedMobile.storyName =
  'Publiée en public avec mise à jour (mobile)'
// endregion

// region Actions éditeurs (créateurs et contributeurs) - Publiée en public avec des modifications non publiées
const PublishedPublicNotPublishedUpdatesStory: Story = {
  args: {
    resource: {
      ...resource,
      baseId: null,
      base: null,
      published: date,
      updated,
      lastPublished: new Date('2023-01-01'),
    },
    user: creatorUser,
    isContributor: true,
  },
  render,
}

export const PublishedPublicNotPublishedUpdates = mediumContainerStory({
  ...PublishedPublicNotPublishedUpdatesStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29191&t=i9GYiv7b09UnqrXx-4',
      },
    ],
  },
})
PublishedPublicNotPublishedUpdates.storyName =
  'Publiée en public avec des modifications non publiées'

export const PublishedPublicNotPublishedUpdatesMobile = mobileStory({
  ...PublishedPublicNotPublishedUpdatesStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173813&t=2gdxVbP0ENf648Yt-4',
      },
    ],
  },
})
PublishedPublicNotPublishedUpdatesMobile.storyName =
  'Publiée en public avec des modifications non publiées (mobile)'
// endregion

// region Actions éditeurs (créateurs et contributeurs) - Publiée en privé
const PublishedPrivateStory: Story = {
  args: {
    resource: {
      ...resource,
      baseId: null,
      base: null,
      published: date,
      isPublic: false,
    },
    user: creatorUser,
    isContributor: true,
  },
  render,
}

export const PublishedPrivate = mediumContainerStory({
  ...PublishedPrivateStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29194&t=i9GYiv7b09UnqrXx-4',
      },
    ],
  },
})
PublishedPrivate.storyName = 'Publiée en privé'

export const PublishedPrivateMobile = mobileStory({
  ...PublishedPrivateStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173816&t=2gdxVbP0ENf648Yt-4',
      },
    ],
  },
})
PublishedPrivateMobile.storyName = 'Publiée en privé (mobile)'
// endregion

// region Actions éditeurs (créateurs et contributeurs) - Publiée en privé avec mise à jour
const PublishedPrivateUpdatedStory: Story = {
  args: {
    resource: {
      ...resource,
      baseId: null,
      base: null,
      published: date,
      isPublic: false,
      updated,
      lastPublished: updated,
    },
    user: creatorUser,
    isContributor: true,
  },
  render,
}

export const PublishedPrivateUpdated = mediumContainerStory({
  ...PublishedPrivateUpdatedStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29197&t=i9GYiv7b09UnqrXx-4',
      },
    ],
  },
})
PublishedPrivateUpdated.storyName = 'Publiée en public avec mise à jour'

export const PublishedPrivateUpdatedMobile = mobileStory({
  ...PublishedPrivateUpdatedStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173819&t=2gdxVbP0ENf648Yt-4',
      },
    ],
  },
})
PublishedPrivateUpdatedMobile.storyName =
  'Publiée en privé avec mise à jour (mobile)'
// endregion

// region Actions éditeurs (créateurs et contributeurs) - Publiée en privé avec des modifications non publiées
const PublishedPrivateNotPublishedUpdatesStory: Story = {
  args: {
    resource: {
      ...resource,
      baseId: null,
      base: null,
      published: date,
      isPublic: false,
      updated,
      lastPublished: new Date('2024-01-01'),
    },
    user: creatorUser,
    isContributor: true,
  },
  render,
}

export const PublishedPrivateNotPublishedUpdates = mediumContainerStory({
  ...PublishedPrivateNotPublishedUpdatesStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29200&t=i9GYiv7b09UnqrXx-4',
      },
    ],
  },
})
PublishedPrivateNotPublishedUpdates.storyName =
  'Publiée en privé avec des modifications non publiées'

export const PublishedPrivateNotPublishedUpdatesMobile = mobileStory({
  ...PublishedPrivateNotPublishedUpdatesStory,
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173822&t=2gdxVbP0ENf648Yt-4',
      },
    ],
  },
})
PublishedPrivateNotPublishedUpdatesMobile.storyName =
  'Publiée en privé avec des modifications non publiées (mobile)'
// endregion
