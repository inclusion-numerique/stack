import { Meta, StoryObj } from '@storybook/react'
import LinkView from './LinkView'

export default {
  title: 'Ressource/Content/Link/View',
  component: LinkView,
} as Meta<typeof LinkView>

type Story = StoryObj<typeof LinkView>

export const WithImage: Story = {
  name: 'Desktop - Avec image et favicon',
  args: {
    content: {
      title: 'Titre du lien',
      showPreview: true,
      url: 'https://www.gouvernement.fr/actualite/les-resultats-de-lindex-de-legalite-professionnelle-2023',
      caption:
        'Cras gravida dolor volutpat orci eleifend, sit amet lacinia mi egestas. Vivamus non lorem vitae justo rhoncus tincidunt. Nulla pulvinar nisi vitae odio elementum, nec sollicitudin dui dapibus.',
      linkTitle: 'Programme Société Numérique - Societé Numérique',
      linkDescription:
        "Faciliter l'accès à des formations d'initiation ou de perfectionnement aux outils et usages numériques Construire une politique locale d'inclusion",
      linkImageUrl:
        'https://www.gouvernement.fr/upload/media/content/0001/05/5818ce1507999816c8ef7cd961e48d6dc5446c51.jpeg',
      linkFaviconUrl: 'https://www.gouvernement.fr/favicon.ico',
    },
  },
}

export const MobileWithImage: Story = {
  name: 'Mobile - Avec image et favicon',
  args: {
    content: {
      title: 'Titre du lien',
      showPreview: true,
      url: 'https://www.gouvernement.fr/actualite/les-resultats-de-lindex-de-legalite-professionnelle-2023',
      caption:
        'Cras gravida dolor volutpat orci eleifend, sit amet lacinia mi egestas. Vivamus non lorem vitae justo rhoncus tincidunt. Nulla pulvinar nisi vitae odio elementum, nec sollicitudin dui dapibus.',
      linkTitle: 'Programme Société Numérique - Societé Numérique',
      linkDescription:
        "Faciliter l'accès à des formations d'initiation ou de perfectionnement aux outils et usages numériques Construire une politique locale d'inclusion",
      linkImageUrl:
        'https://www.gouvernement.fr/upload/media/content/0001/05/5818ce1507999816c8ef7cd961e48d6dc5446c51.jpeg',
      linkFaviconUrl: 'https://www.gouvernement.fr/favicon.ico',
    },
  },
  parameters: {
    chromatic: { viewports: [320, 568] },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

export const WithoutImage: Story = {
  name: 'Desktop - Sans image',
  args: {
    content: {
      title: 'Titre du lien',
      showPreview: true,
      url: 'https://www.gouvernement.fr/actualite/les-resultats-de-lindex-de-legalite-professionnelle-2023',
      caption:
        'Cras gravida dolor volutpat orci eleifend, sit amet lacinia mi egestas. Vivamus non lorem vitae justo rhoncus tincidunt. Nulla pulvinar nisi vitae odio elementum, nec sollicitudin dui dapibus.',
      linkTitle: 'Programme Société Numérique - Societé Numérique',
      linkDescription:
        "Faciliter l'accès à des formations d'initiation ou de perfectionnement aux outils et usages numériques Construire une politique locale d'inclusion",
      linkImageUrl: null,
      linkFaviconUrl: null,
    },
  },
}

export const MobileWithoutImage: Story = {
  name: 'Mobile - Sans image',
  args: {
    content: {
      title: 'Titre du lien',
      showPreview: true,
      url: 'https://www.gouvernement.fr/actualite/les-resultats-de-lindex-de-legalite-professionnelle-2023',
      caption:
        'Cras gravida dolor volutpat orci eleifend, sit amet lacinia mi egestas. Vivamus non lorem vitae justo rhoncus tincidunt. Nulla pulvinar nisi vitae odio elementum, nec sollicitudin dui dapibus.',
      linkTitle: 'Programme Société Numérique - Societé Numérique',
      linkDescription:
        "Faciliter l'accès à des formations d'initiation ou de perfectionnement aux outils et usages numériques Construire une politique locale d'inclusion",
      linkImageUrl: null,
      linkFaviconUrl: null,
    },
  },
  parameters: {
    chromatic: { viewports: [320, 568] },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
