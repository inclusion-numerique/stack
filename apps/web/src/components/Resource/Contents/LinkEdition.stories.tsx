import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import { EditContentCommandValidation } from '@app/web/server/resources/feature/EditContent'
import { ContentPayload } from '@app/web/server/resources/feature/Content'
import LinkEdition from './LinkEdition'

export default {
  title: 'Ressource/Content/Link/Edition',
  component: LinkEdition,
} as Meta<typeof LinkEdition>

type Story = StoryObj<typeof LinkEdition>

const Template = () => {
  const form = useForm<ContentPayload>({
    resolver: zodResolver(EditContentCommandValidation),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      title: 'Titre du lien',
    },
  })

  return (
    <form>
      <LinkEdition form={form} />
    </form>
  )
}

export const Default: Story = {
  name: 'Edition',
  render: () => <Template />,
}
