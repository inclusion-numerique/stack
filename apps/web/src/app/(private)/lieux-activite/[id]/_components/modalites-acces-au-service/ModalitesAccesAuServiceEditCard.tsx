'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import EditCard from '@app/web/components/EditCard'
import {
  ModalitesAccesAuServiceCommandValidation,
  ModalitesAccesAuServiceData,
} from '@app/web/app/structure/ModalitesAccesAuServiceCommandValidation'
import { ModalitesAccesAuServiceInputs } from './ModalitesAccesAuServiceInputs'
import { ModalitesAccesAuServiceView } from './ModalitesAccesAuServiceView'

export const ModalitesAccesAuServiceEditCard = (props: {
  fraisACharge: string[]
  modalitesAcces?: {
    surPlace?: boolean | null
    parTelephone?: boolean | null
    parMail?: boolean | null
    numeroTelephone?: string | null
    adresseMail?: string | null
  }
}) => {
  const form = useForm<ModalitesAccesAuServiceData>({
    resolver: zodResolver(ModalitesAccesAuServiceCommandValidation),
    defaultValues: props,
  })

  return (
    <EditCard
      noBorder
      contentSeparator={false}
      id="modalites-acces-au-service"
      title="Modalités d’accès au service"
      description="Indiquez comment bénéficier des services d’inclusion numérique."
      titleAs="h3"
      form={form}
      mutation={async (data) => {
        console.log(data)
      }}
      edition={<ModalitesAccesAuServiceInputs form={form} />}
      view={<ModalitesAccesAuServiceView {...props} />}
    />
  )
}
