'use client'

import { withTrpc } from '@app/web/components/trpc/withTrpc'
import SiretFormField from '@app/web/siret/SiretFormField'
import { useForm } from 'react-hook-form'

const AdministrationCheckSiret = () => {
  const form = useForm<{ siret: string; nom: string }>()

  return (
    <form>
      <SiretFormField
        form={form}
        siretNamePath="nom"
        siretPath="siret"
        label="Numéro de SIRET"
      />
    </form>
  )
}

export default withTrpc(AdministrationCheckSiret)
