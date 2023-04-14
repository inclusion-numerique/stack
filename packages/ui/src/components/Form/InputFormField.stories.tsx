import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod'
import { Meta, StoryObj } from '@storybook/react'
import InputFormField, { InputFormFieldProps } from './InputFormField'

const objectFormValidation = z
  .object({
    name: z.string(),
    email: z.string().email(),
    email2: z.string().email(),
  })
  .strict()
type ObjectFormData = z.infer<typeof objectFormValidation>

const Template = (
  args: Omit<InputFormFieldProps<ObjectFormData>, 'control'>,
) => {
  const form = useForm<ObjectFormData>({
    resolver: zodResolver(objectFormValidation),
    reValidateMode: 'onChange',
    mode: 'all',
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@gmail.fr',
      email2: 'john.doe',
    },
  })

  return (
    <form>
      <InputFormField control={form.control} {...args} />
    </form>
  )
}

const meta: Meta<typeof InputFormField> = {
  title: 'DSFR Component/Input Form Field',
  component: InputFormField,
}

export default meta

type Story = StoryObj<typeof InputFormField>

export const Default: Story = {
  name: 'Etat par défaut',
  render: () => <Template label="Label" path="name" />,
}

export const Success: Story = {
  name: 'Etat succès',
  render: () => <Template label="Label" path="email" valid="Email valide" />,
}

export const Error: Story = {
  name: 'Etat erreur',
  render: () => <Template label="Label" path="email2" />,
}

export const Disabled: Story = {
  name: 'Etat désactivé',
  render: () => <Template label="Label" path="name" disabled />,
}

export const Hint: Story = {
  name: "Avec texte d'aide",
  render: () => (
    <Template
      label="Label"
      path="name"
      hint="texte de description additionnel"
    />
  ),
}
