'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import EditCard from '@app/web/components/EditCard'
import {
  TypesDePublicsAccueillisCommandValidation,
  TypesDePublicsAccueillisData,
} from '@app/web/app/structure/TypesDePublicsAccueillisCommandValidation'
import { TypesDePublicsAccueillisInputs } from './TypesDePublicsAccueillisInputs'
import { TypesDePublicsAccueillisView } from './TypesDePublicsAccueillisView'

export const TypesDePublicsAccueillisEditCard = (props: {
  priseEnChargeSpecifique: string[]
  toutPublic: boolean
  publicsSpecifiquementAdresses: string[]
}) => {
  const form = useForm<TypesDePublicsAccueillisData>({
    resolver: zodResolver(TypesDePublicsAccueillisCommandValidation),
    defaultValues: props,
  })

  return (
    <EditCard
      noBorder
      contentSeparator={false}
      id="types-publics-accueillis"
      title="Types de publics accueillis"
      description="Indiquez si ce lieu accueille des publics spécifiques."
      titleAs="h3"
      form={form}
      mutation={async (data) => {
        console.log(data)
      }}
      edition={<TypesDePublicsAccueillisInputs form={form} />}
      view={<TypesDePublicsAccueillisView {...props} />}
    />
  )
}
