'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import EditCard from '@app/web/components/EditCard'
import {
  StructureInformationsPratiquesCommandValidation,
  StructureInformationsPratiquesData,
} from '@app/web/app/structure/StructureInformationsPratiquesCommandValidation'
import { InformationsPratiquesInputs } from './InformationsPratiquesInputs'
import { InformationsPratiquesView } from './InformationsPratiquesView'

export const InformationsPratiquesEditCard = (props: {
  lieuItinerant?: boolean | null
  siteWeb?: string | null
  ficheAccesLibre?: string | null
  horaires?: string | null
}) => {
  const form = useForm<StructureInformationsPratiquesData>({
    resolver: zodResolver(StructureInformationsPratiquesCommandValidation),
    defaultValues: props,
  })

  return (
    <EditCard
      contentSeparator={false}
      noBorder
      id="informations-pratiques"
      title="Informations pratiques"
      description="Horaires, accès et site internet du lieu."
      titleAs="h2"
      form={form}
      mutation={async (data) => {
        console.log(data)
      }}
      edition={<InformationsPratiquesInputs form={form} />}
      view={<InformationsPratiquesView {...props} />}
    />
  )
}
