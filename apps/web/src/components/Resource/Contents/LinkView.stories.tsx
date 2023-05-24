import { Meta, StoryObj } from '@storybook/react'
import LinkView from './LinkView'

export default {
  title: 'Ressource/Content/Link/View',
  component: LinkView,
} as Meta<typeof LinkView>

type Story = StoryObj<typeof LinkView>

export const Default: Story = {
  name: 'View',
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
    },
  },
}
