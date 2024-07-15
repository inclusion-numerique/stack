'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import EditCard from '@app/web/components/EditCard'
import {
  ServicesEtAccompagnementCommandValidation,
  ServicesEtAccompagnementData,
} from '@app/web/app/structure/ServicesEtAccompagnementCommandValidation'
import { ServicesEtAccompagnementInputs } from './ServicesEtAccompagnementInputs'
import { ServicesEtAccompagnementView } from './ServicesEtAccompagnementView'

export const ServicesEtAccompagnementEditCard = (props: {
  services: string[]
  modalitesAccompagnement: string[]
}) => {
  const form = useForm<ServicesEtAccompagnementData>({
    resolver: zodResolver(ServicesEtAccompagnementCommandValidation),
    defaultValues: props,
  })

  return (
    <EditCard
      noBorder
      contentSeparator={false}
      id="services-et-accompagnement"
      title="Services & types d’accompagnement"
      description="Renseignez ici les services et les types d’accompagnements proposés dans ce lieu."
      titleAs="h3"
      form={form}
      mutation={async (data) => {
        console.log(data)
      }}
      edition={<ServicesEtAccompagnementInputs form={form} />}
      view={<ServicesEtAccompagnementView {...props} />}
    />
  )
}
