import { Meta, StoryObj } from '@storybook/react'
import { mediumContainerStory, mobileStory } from '@app/storybook/storyHelper'
import Button from '@codegouvfr/react-dsfr/Button'
import React from 'react'
import type { StructureData } from '@app/web/app/structure/StructureValidation'
import StructureCard from './StructureCard'

const structureWithSiret = {
  id: 'with-siret',
  siret: '12345678901234',
  codePostal: '75001',
  commune: 'Paris',
  adresse: '1 rue de Rivoli',
  typologies: ['TIERS_LIEUX'],
  nom: 'La structure',
  accessibilite: 'PMR',
  codeInsee: '75056',
  rna: null,
} satisfies StructureData

const structureWithRnaAndNoTypologie = {
  ...structureWithSiret,
  id: 'with-rna',
  siret: null,
  rna: 'W123456789',
  typologies: null,
} satisfies StructureData

const structureWithMultipleTypologies = {
  ...structureWithSiret,
  id: 'with-multiple-typologies',
  typologies: ['CCAS', 'CS', 'ASSO', 'TIERS_LIEUX'],
} satisfies StructureData

const structureWithoutPivotAndMultipleTypologies = {
  ...structureWithMultipleTypologies,
  id: 'without-pivot',
  siret: null,
  rna: null,
  typologies: ['PIJ_BIJ', 'TIERS_LIEUX', 'MUNI'],
} satisfies StructureData

const cases = [
  structureWithSiret,
  structureWithRnaAndNoTypologie,
  structureWithMultipleTypologies,
  structureWithoutPivotAndMultipleTypologies,
]

export default {
  title: 'Structure/Card',
  component: StructureCard,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/tHjoZOsfnmtPK9woxWkeLc/La-Coop-de-la-m%C3%A9diation-num%C3%A9rique?node-id=6309-45789',
    },
  },
} as Meta<typeof StructureCard>

type Story = StoryObj<typeof StructureCard>

const Template = () => (
  <>
    {cases.map((structure, index) => (
      <StructureCard
        structure={structure}
        key={structure.id}
        className={index > 0 ? 'fr-mt-6v' : ''}
        topRight={
          index % 2 === 0 ? (
            <Button
              type="button"
              priority="tertiary no outline"
              size="small"
              iconPosition="right"
              iconId="fr-icon-close-line"
            >
              Retirer
            </Button>
          ) : undefined
        }
        infoLinkHref={
          index % 3 === 0
            ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            : undefined
        }
      />
    ))}
  </>
)

const story: Story = {
  render: () => <Template />,
}

export const Desktop = mediumContainerStory(story)

export const Mobile = mobileStory(story)
