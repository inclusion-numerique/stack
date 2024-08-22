import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import FilterTag from '@app/web/components/filters/FilterTag'
import PeriodFilter from '@app/web/components/filters/PeriodFilter'

const meta: Meta<typeof FilterTag> = {
  title: 'Filtres/Filtre tag',
  component: FilterTag,
}

export default meta

type Story = StoryObj<typeof FilterTag>

export const Periode: Story = {
  name: 'Période',
  render: () => (
    <PeriodFilter
      onChange={(value) => {
        console.log('onChange', value)
      }}
    />
  ),
}
