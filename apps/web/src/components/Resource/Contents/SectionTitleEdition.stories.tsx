import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import {
  EditResourceContent,
  editResourceContentValidation,
} from '@app/web/server/rpc/resource/editContent'
import SectionTitleEdition from './SectionTitleEdition'

export default {
  title: 'Ressource/Content/SectionTitle/Edition',
  component: SectionTitleEdition,
} as Meta<typeof SectionTitleEdition>

type Story = StoryObj<typeof SectionTitleEdition>

const Template = () => {
  const form = useForm<EditResourceContent>({
    resolver: zodResolver(editResourceContentValidation),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      title: 'Hello you',
    },
  })

  return (
    <form>
      <SectionTitleEdition control={form.control} />
    </form>
  )
}

export const Default: Story = {
  name: 'Edition',
  render: () => <Template />,
}
