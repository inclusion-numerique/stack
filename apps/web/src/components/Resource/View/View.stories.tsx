import { Meta, StoryObj } from '@storybook/react'
import View from '@app/web/components/Resource/View/View'
import { Resource, ResourceContent } from '@app/web/server/resources'
import { testSessionUser } from '@app/web/test/testSessionUser'

const resource = {
  id: '1',
  title:
    'Titre d’une ressource sur deux ligne très longues comme comme sur deux ligne très longues',
  slug: 'titre-d-une-ressource-sur-deux-ligne-très-longues-comme-comme-sur-deux-ligne-très-longues',
  description:
    'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae turpis sed vitae vel. Venenatis adipiscing elit.',
  created: new Date('1998-07-12'),
  updated: new Date('2022-07-12'),
  base: { id: '2', title: 'Titre de la base', slug: 'titre-de-la-base' },
  createdBy: {
    id: '1',
    name: 'Nom_utilisateur long long vraiment long tellement long que ca me soule !!!',
  },
  image: null,
  contents: [
    {
      id: '1',
      type: 'Text',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies gravida posuere. Nulla ullamcorper ipsum nisi, sed volutpat arcu fringilla eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam quis risus sit amet arcu mattis sagittis. Vestibulum gravida vel leo ac mollis. Ut ex felis, maximus in accumsan sit amet, pharetra id dolor. Nam sollicitudin nunc massa, et mollis libero rutrum ut. Curabitur ultrices, augue quis convallis laoreet, sapien mauris dignissim mauris, quis ullamcorper massa magna a felis. Morbi mollis ullamcorper tellus quis dignissim. Praesent tempor eros porta odio tempus, a pretium quam elementum. Donec varius mi lobortis elit cursus hendrerit.',
    },
    {
      id: '2',
      type: 'Text',
      text: 'Ut at nulla ut metus consequat congue eget eget sem. Suspendisse euismod ante eleifend accumsan feugiat. Mauris a erat nunc. Maecenas ornare vel augue eget sagittis. Etiam ornare felis nec vehicula fermentum. Phasellus velit eros, elementum eu aliquet ut, vulputate eget urna. Phasellus molestie interdum metus, vel elementum metus fringilla ac. Sed porttitor, elit sit amet tempus volutpat, purus purus tempus risus, ac sagittis lacus nulla vel nulla.',
    },
    {
      id: '3',
      type: 'Text',
      text: 'Praesent sed felis quis lacus auctor dignissim. Sed vestibulum maximus metus ac porta. Vivamus vel laoreet leo. Sed vitae ligula vel metus luctus finibus. Donec elementum euismod nulla. Proin sodales sed urna sit amet tempor. Donec iaculis ligula justo, eu tincidunt ante iaculis quis. Fusce pretium purus dui. Morbi luctus diam ligula, eget vestibulum massa porta sed. Mauris eleifend odio euismod tortor vehicula, quis tempus lorem vulputate. Praesent dictum magna quis arcu aliquet, et pretium libero auctor. Etiam ut fringilla libero. Pellentesque sed odio porttitor, convallis est sit amet, tincidunt purus. Aenean placerat urna magna, nec bibendum arcu accumsan nec. Curabitur porttitor odio sit amet facilisis pellentesque. Sed commodo, velit eu porta consectetur, nisl metus sodales velit, in hendrerit tortor risus sed velit.',
    },
    {
      id: '4',
      type: 'Text',
      text: 'In et enim posuere, viverra justo ac, vestibulum ligula. Duis sollicitudin laoreet molestie. Duis interdum mauris dui, in pharetra dolor dignissim vitae. Cras facilisis facilisis ex. Suspendisse libero sapien, mollis a libero sit amet, placerat egestas tortor. Proin molestie est erat, non blandit enim volutpat a. Cras lacinia ante et ipsum vestibulum ultricies. Morbi pharetra iaculis congue. Quisque ut nisi orci. Pellentesque ullamcorper id ante nec vehicula. Nam nec commodo ligula, at ullamcorper odio. Donec accumsan et ipsum quis imperdiet. Donec enim tortor, eleifend nec ornare efficitur, aliquet nec nunc. Duis condimentum placerat eleifend.',
    },
    {
      id: '5',
      type: 'Text',
      text: 'Nam mauris est, pulvinar et erat a, tincidunt blandit augue. Nam congue consequat lacus, nec venenatis nisl tempor et. Nulla tempor, nulla eget scelerisque vulputate, libero urna porta ipsum, eu lacinia quam quam a diam. Aliquam nec lorem eget lorem faucibus cursus eu eu tellus. Fusce arcu dolor, pellentesque blandit orci vitae, elementum ullamcorper arcu. Ut sed metus nec elit posuere pellentesque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis eu mi tellus. Fusce est velit, consectetur non ipsum ut, dignissim facilisis felis. Duis congue metus vel risus aliquam efficitur. Duis lectus elit, ultrices quis neque placerat, congue eleifend ante. Duis mollis nec erat tempus accumsan. Nullam et congue ex, non dictum sem. Integer ut feugiat augue. In quis suscipit neque.,',
    },
    {
      id: '6',
      type: 'Text',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies gravida posuere. Nulla ullamcorper ipsum nisi, sed volutpat arcu fringilla eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam quis risus sit amet arcu mattis sagittis. Vestibulum gravida vel leo ac mollis. Ut ex felis, maximus in accumsan sit amet, pharetra id dolor. Nam sollicitudin nunc massa, et mollis libero rutrum ut. Curabitur ultrices, augue quis convallis laoreet, sapien mauris dignissim mauris, quis ullamcorper massa magna a felis. Morbi mollis ullamcorper tellus quis dignissim. Praesent tempor eros porta odio tempus, a pretium quam elementum. Donec varius mi lobortis elit cursus hendrerit.',
    },
    {
      id: '7',
      type: 'Text',
      text: 'Ut at nulla ut metus consequat congue eget eget sem. Suspendisse euismod ante eleifend accumsan feugiat. Mauris a erat nunc. Maecenas ornare vel augue eget sagittis. Etiam ornare felis nec vehicula fermentum. Phasellus velit eros, elementum eu aliquet ut, vulputate eget urna. Phasellus molestie interdum metus, vel elementum metus fringilla ac. Sed porttitor, elit sit amet tempus volutpat, purus purus tempus risus, ac sagittis lacus nulla vel nulla.',
    },
    {
      id: '8',
      type: 'Text',
      text: 'Praesent sed felis quis lacus auctor dignissim. Sed vestibulum maximus metus ac porta. Vivamus vel laoreet leo. Sed vitae ligula vel metus luctus finibus. Donec elementum euismod nulla. Proin sodales sed urna sit amet tempor. Donec iaculis ligula justo, eu tincidunt ante iaculis quis. Fusce pretium purus dui. Morbi luctus diam ligula, eget vestibulum massa porta sed. Mauris eleifend odio euismod tortor vehicula, quis tempus lorem vulputate. Praesent dictum magna quis arcu aliquet, et pretium libero auctor. Etiam ut fringilla libero. Pellentesque sed odio porttitor, convallis est sit amet, tincidunt purus. Aenean placerat urna magna, nec bibendum arcu accumsan nec. Curabitur porttitor odio sit amet facilisis pellentesque. Sed commodo, velit eu porta consectetur, nisl metus sodales velit, in hendrerit tortor risus sed velit.',
    },
    {
      id: '9',
      type: 'Text',
      text: 'In et enim posuere, viverra justo ac, vestibulum ligula. Duis sollicitudin laoreet molestie. Duis interdum mauris dui, in pharetra dolor dignissim vitae. Cras facilisis facilisis ex. Suspendisse libero sapien, mollis a libero sit amet, placerat egestas tortor. Proin molestie est erat, non blandit enim volutpat a. Cras lacinia ante et ipsum vestibulum ultricies. Morbi pharetra iaculis congue. Quisque ut nisi orci. Pellentesque ullamcorper id ante nec vehicula. Nam nec commodo ligula, at ullamcorper odio. Donec accumsan et ipsum quis imperdiet. Donec enim tortor, eleifend nec ornare efficitur, aliquet nec nunc. Duis condimentum placerat eleifend.',
    },
    {
      id: '10',
      type: 'Text',
      text: 'Nam mauris est, pulvinar et erat a, tincidunt blandit augue. Nam congue consequat lacus, nec venenatis nisl tempor et. Nulla tempor, nulla eget scelerisque vulputate, libero urna porta ipsum, eu lacinia quam quam a diam. Aliquam nec lorem eget lorem faucibus cursus eu eu tellus. Fusce arcu dolor, pellentesque blandit orci vitae, elementum ullamcorper arcu. Ut sed metus nec elit posuere pellentesque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis eu mi tellus. Fusce est velit, consectetur non ipsum ut, dignissim facilisis felis. Duis congue metus vel risus aliquam efficitur. Duis lectus elit, ultrices quis neque placerat, congue eleifend ante. Duis mollis nec erat tempus accumsan. Nullam et congue ex, non dictum sem. Integer ut feugiat augue. In quis suscipit neque.,',
    },
  ] as ResourceContent[],
  isPublic: true,
} satisfies Resource

export default {
  title: 'Ressource/View',
  component: View,
} as Meta<typeof View>

type Story = StoryObj<typeof View>

export const Default: Story = {
  name: 'Défaut',
  args: {
    resource,
  },
}

export const DefaultMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  name: 'Défaut mobile',
  args: {
    resource,
  },
}

export const ConnectedUser: Story = {
  name: 'Utilisateur connecté',
  args: {
    resource,
    user: testSessionUser,
  },
}

export const ConnectedUserMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  name: 'Utilisateur connecté mobile',
  args: {
    resource,
    user: testSessionUser,
  },
}
