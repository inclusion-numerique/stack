'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  type StructureData,
  StructureValidation,
} from '@app/web/structure/StructureValidation'
import SiretFormField from '@app/web/siret/SiretFormField'

const StructureForm = ({ next }: { next: string }) => {
  const form = useForm<StructureData>({
    resolver: zodResolver(StructureValidation),
  })
  console.log('TODO redirect to next', next)
  return (
    <div>
      <h1>StructureForm</h1>
      <SiretFormField
        form={form}
        siretPath="siret.siret"
        siretNamePath="siret.nom"
      />
    </div>
  )
}

export default StructureForm
