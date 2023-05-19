import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import { AddContentCommand } from '@app/web/server/resources/feature/AddContent'
import {
  EditContentCommand,
  EditContentCommandValidation,
} from '@app/web/server/resources/feature/EditContent'
import TextEdition from './TextEdition'

export default {
  title: 'Ressource/Content/Text/Edition',
  component: TextEdition,
} as Meta<typeof TextEdition>

type Story = StoryObj<typeof TextEdition>

const Template = () => {
  const form = useForm<EditContentCommand | AddContentCommand>({
    resolver: zodResolver(EditContentCommandValidation),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      name: 'EditContent',
      payload: {
        resourceId: 'resourceId',
        text: `<h2>Edit me</h2><p><b>please...</b></p><p>ps: C'est pas encore fou pour <a href="https://tiptap.dev/api/marks/link" target="_blank">les liens</a>`,
      },
    },
  })

  return (
    <form>
      <TextEdition form={form} />
    </form>
  )
}

export const Default: Story = {
  name: 'Edition',
  render: () => <Template />,
}
