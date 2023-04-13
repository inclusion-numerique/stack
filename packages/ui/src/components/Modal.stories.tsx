import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import Modal from './Modal'
import Button from './Button'

const meta: Meta<typeof Modal> = {
  title: 'DSFR Component/Modal',
  component: Modal,
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  name: 'Modale simple',
  args: {
    buttonLabel: 'Ouvrir la modal',
    title: 'Titre de la modal',
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius
        tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo.
        Vestibulum aliquam hendrerit molestie. Mauris malesuada nisi sit amet
        augue accumsan tincidunt. Maecenas tincidunt, velit ac porttitor
        pulvinar, tortor eros facilisis libero, vitae commodo nunc quam et
        ligula. Ut nec ipsum sapien. Interdum et malesuada fames ac ante ipsum
        primis in faucibus. Integer id nisi nec nulla luctus lacinia non eu
        turpis. Etiam in ex imperdiet justo tincidunt egestas. Ut porttitor urna
        ac augue cursus tincidunt sit amet sed orci.
      </p>
    ),
  },
}

export const Actions: Story = {
  name: 'Modale avec zone d’action',
  args: {
    buttonLabel: 'Ouvrir la modal',
    title: 'Titre de la modal',
    buttons: [
      <Button label="Bouton primaire" key="1" />,
      <Button label="Bouton secondaire" priority="secondary" key="2" />,
    ],
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius
        tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo.
        Vestibulum aliquam hendrerit molestie. Mauris malesuada nisi sit amet
        augue accumsan tincidunt. Maecenas tincidunt, velit ac porttitor
        pulvinar, tortor eros facilisis libero, vitae commodo nunc quam et
        ligula. Ut nec ipsum sapien. Interdum et malesuada fames ac ante ipsum
        primis in faucibus. Integer id nisi nec nulla luctus lacinia non eu
        turpis. Etiam in ex imperdiet justo tincidunt egestas. Ut porttitor urna
        ac augue cursus tincidunt sit amet sed orci.
      </p>
    ),
  },
}

export const Size: Story = {
  name: 'Tailles',
  args: {
    buttonLabel: 'Ouvrir la modal',
    title: 'Titre de la modal',
    size: 'sm',
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius
        tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo.
        Vestibulum aliquam hendrerit molestie. Mauris malesuada nisi sit amet
        augue accumsan tincidunt. Maecenas tincidunt, velit ac porttitor
        pulvinar, tortor eros facilisis libero, vitae commodo nunc quam et
        ligula. Ut nec ipsum sapien. Interdum et malesuada fames ac ante ipsum
        primis in faucibus. Integer id nisi nec nulla luctus lacinia non eu
        turpis. Etiam in ex imperdiet justo tincidunt egestas. Ut porttitor urna
        ac augue cursus tincidunt sit amet sed orci.
      </p>
    ),
  },
}
