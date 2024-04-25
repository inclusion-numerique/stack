'use client'

import { useForm } from 'react-hook-form'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import SiretFormField from '@app/web/siret/SiretFormField'

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
