'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import EditCard from '@app/web/components/EditCard'
import {
  DescriptionCommandValidation,
  DescriptionData,
} from '@app/web/app/structure/DescriptionCommandValidation'
import { DescriptionView } from './DescriptionView'

export const DescriptionEditCard = (props: {
  typologies?: string[] | null
  presentationResume?: string | null
  presentationDetail?: string | null
}) => {
  const form = useForm<DescriptionData>({
    resolver: zodResolver(DescriptionCommandValidation),
    defaultValues: props,
  })

  return (
    <EditCard
      noBorder
      contentSeparator={false}
      id="informations-generales"
      title="Description du lieu"
      description="Décrivez ici le lieu et les activités qu’il propose."
      titleAs="h3"
      form={form}
      mutation={async (data) => {
        console.log(data)
      }}
      edition={<>Edit mode</>}
      view={<DescriptionView {...props} />}
    />
  )
}
