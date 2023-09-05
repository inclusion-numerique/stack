import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod'
import { Meta, StoryObj } from '@storybook/react'
import { useOnDiff } from '@app/web/hooks/useOnDiff'
import CustomSelectFormField, {
  CustomSelectFormFieldProps,
} from '@app/ui/components/Form/CustomSelectFormField'

const options = [
  {
    label: 'Atman',
    value: 'atman',
  },
  {
    label: 'Brahman',
    value: 'brahman',
  },
  {
    label: 'Dharma',
    value: 'dharma',
  },
  {
    label: 'Karma',
    value: 'karma',
  },
  {
    label: 'Samsara',
    value: 'samsara',
  },
  {
    label: 'Moksha',
    value: 'moksha',
  },
  {
    label: 'Maya',
    value: 'maya',
  },
  {
    label: 'Vedas',
    value: 'vedas',
  },
  {
    label: 'Upanishads',
    value: 'upanishads',
  },
  {
    label: 'Yoga',
    value: 'yoga',
  },
]

const objectFormValidation = z
  .object({
    choice: z.string(),
    choiceError: z.string(),
    choiceSuccess: z.string(),
  })
  .strict()
type ObjectFormData = z.infer<typeof objectFormValidation>

const Template = <Option = { label: string; value: string }, V = unknown>({
  path,
  storyAsyncSearch,
  storyAsyncSearchError,
  ...args
}: Omit<
  CustomSelectFormFieldProps<ObjectFormData, Option, V>,
  'control' | 'options'
> & {
  storyAsyncSearch?: boolean
  storyAsyncSearchError?: boolean
}) => {
  const form = useForm<ObjectFormData>({
    resolver: zodResolver(objectFormValidation),
    reValidateMode: 'onChange',
    mode: 'all',
  })

  useOnDiff(form, () => {
    form.setValue('choiceSuccess', 'choice-2', {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    })
    form.setError('choiceError', { message: "Message d'erreur" })
  })

  const loadOptions = storyAsyncSearch
    ? async (search: string) => {
        // Fake delay to show loading state on the component
        await new Promise((resolve) =>
          // eslint-disable-next-line no-promise-executor-return
          setTimeout(() => {
            resolve(null)
          }, 2000),
        )

        if (storyAsyncSearchError) {
          throw new Error('Erreur de recherche')
        }

        return options.filter((option) =>
          option.label.toLowerCase().includes(search.toLowerCase()),
        ) as Option[]
      }
    : undefined

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        console.info('Form submited', data)
      })}
    >
      <CustomSelectFormField
        loadOptions={loadOptions}
        control={form.control}
        path={path}
        {...args}
      />
    </form>
  )
}

const meta: Meta<typeof CustomSelectFormField> = {
  title: 'DSFR Component/Form/CustomSelect',
  component: CustomSelectFormField,
}

export default meta

type Story = StoryObj<typeof CustomSelectFormField>

export const Simple: Story = {
  render: (args) => <Template {...args} path="choice" />,
  args: {
    label: 'Label',
    options,
  },
}

export const Fuzzy: Story = {
  render: (args) => <Template {...args} path="choice" />,
  args: {
    label: 'Label',
    options,
  },
}

// TODO Re-do the story for complex stuff
// Use type: 'commune' ou type: 'structure' to conditinaly render option component

export const RechercheAsynchrone: Story = {
  render: (args) => <Template storyAsyncSearch {...args} path="choice" />,
  args: {
    label: 'Label',
  },
}

export const Erreur: Story = {
  render: (args) => <Template {...args} path="choiceError" />,
  args: {
    label: 'Label',
    options,
  },
}

export const Success: Story = {
  render: (args) => <Template {...args} path="choiceSuccess" />,
  args: {
    label: 'Label',
    valid: 'Choix valide',
    options,
  },
}

export const Désactivé: Story = {
  render: (args) => <Template {...args} path="choice" />,
  args: {
    label: 'Label',
    disabled: true,
    options,
  },
}

export const TexteAide: Story = {
  render: (args) => <Template {...args} path="choice" />,
  args: {
    label: 'Label',
    hint: 'Texte de description additionnel',
    options,
  },
}
