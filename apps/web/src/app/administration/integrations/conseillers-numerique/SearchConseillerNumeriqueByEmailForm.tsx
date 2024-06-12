'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { useState } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import {
  SearchConseillerNumeriqueByEmailData,
  SearchConseillerNumeriqueByEmailValidation,
} from '@app/web/server/rpc/conseillers-numerique/SearchConseillerNumeriqueByEmailValidation'

const SearchConseillerNumeriqueByEmailForm = () => {
  const form = useForm<SearchConseillerNumeriqueByEmailData>({
    resolver: zodResolver(SearchConseillerNumeriqueByEmailValidation),
  })

  const mutation = trpc.conseillersNumerique.searchByEmail.useMutation()

  const [result, setResult] = useState<unknown>()

  const onSubmit = async (data: SearchConseillerNumeriqueByEmailData) => {
    const response = await mutation.mutateAsync(data)
    setResult(response)
  }

  const isLoading = mutation.isPending

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <InputFormField
        control={form.control}
        label="Rechercher un conseiller numérique par email"
        path="email"
        asterisk
        disabled={isLoading}
      />

      <Button
        type="submit"
        iconId="fr-icon-search-line"
        {...buttonLoadingClassname(isLoading, 'fr-mb-6v')}
      >
        Rechercher
      </Button>

      {mutation.isError && (
        <p className="fr-error-text">Une erreur est survenue</p>
      )}
      {result === null && <p>Aucun résultat</p>}
      {!!result && (
        <div>
          <pre className="fr-background-alt--blue-france fr-p-4v fr-border-radius--16 fr-text--xs fr-mb-0">
            {JSON.stringify(result, null, 2)}{' '}
          </pre>
        </div>
      )}
    </form>
  )
}

export default withTrpc(SearchConseillerNumeriqueByEmailForm)
