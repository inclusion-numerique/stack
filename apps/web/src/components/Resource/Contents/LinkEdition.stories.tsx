import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import { AddContentCommand } from '@app/web/server/resources/feature/AddContent'
import {
  EditContentCommand,
  EditContentCommandValidation,
} from '@app/web/server/resources/feature/EditContent'
import LinkEdition, { LinkEditionProps } from './LinkEdition'

export default {
  title: 'Ressource/Content/Link/Edition',
  component: LinkEdition,
} as Meta<typeof LinkEdition>

type Story = StoryObj<typeof LinkEdition>

const Template = ({ metaData }: Omit<LinkEditionProps, 'form'>) => {
  const form = useForm<EditContentCommand | AddContentCommand>({
    resolver: zodResolver(EditContentCommandValidation),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      name: 'EditContent',
      payload: {
        resourceId: 'resourceId',
        title: 'Titre du lien',
      },
    },
  })

  return (
    <form>
      <LinkEdition form={form} metaData={metaData} />
    </form>
  )
}

export const Default: Story = {
  name: 'Edition',
  render: (args) => <Template {...args} />,
  args: {
    metaData: null,
  },
}
