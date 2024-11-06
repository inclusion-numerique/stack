'use client'

import { useRouter } from 'next/navigation'
import { DefaultValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createToast } from '@app/ui/toast/createToast'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import EditCard from '@app/web/components/EditCard'
import { siretOrRna } from '@app/web/rna/rnaValidation'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import {
  InformationsGeneralesData,
  InformationsGeneralesValidation,
} from '@app/web/app/structure/InformationsGeneralesValidation'
import { InformationsGeneralesFields } from '@app/web/components/structure/fields/InformationsGeneralesFields'
import { banDefaultValueToAdresseBanData } from '@app/web/external-apis/ban/banDefaultValueToAdresseBanData'
import { AdressBanFormFieldOption } from '@app/web/components/form/AdresseBanFormField'
import { getAdresseBanLabel } from '@app/web/external-apis/ban/adresseBanLabel'
import { InformationsGeneralesView } from './InformationsGeneralesView'

const InformationsGeneralesEditCard = (props: {
  id: string
  nom: string
  adresse: string
  commune: string
  codePostal: string
  codeInsee?: string | null
  complementAdresse?: string | null
  siret?: string | null
  rna?: string | null
}) => {
  const mutation = trpc.lieuActivite.updateInformationsGenerales.useMutation()
  const router = useRouter()

  /**
   * We need to create the form default value AdressBanData from the existing structure.
   * Also we have to create initial AdressBanData Option for the search select
   * to have it pre-populated with the existing structure data.
   */
  const { codeInsee, codePostal, commune, adresse } = props

  const adresseBanData = banDefaultValueToAdresseBanData({
    codeInsee: codeInsee ?? undefined,
    codePostal,
    commune,
    nom: adresse,
  })
  const adresseBanLabel = getAdresseBanLabel(adresseBanData)
  adresseBanData.label = adresseBanLabel

  const defaultValues = {
    ...props,
    adresseBan: adresseBanData,
  } satisfies DefaultValues<InformationsGeneralesData>

  const initialAdresseBanOption = {
    label: adresseBanLabel,
    value: adresseBanData,
  } satisfies AdressBanFormFieldOption

  const form = useForm<InformationsGeneralesData>({
    resolver: zodResolver(InformationsGeneralesValidation),
    defaultValues,
  })

  const handleMutation = async (data: InformationsGeneralesData) => {
    try {
      await mutation.mutateAsync({ ...data, ...siretOrRna(data) })

      createToast({
        priority: 'success',
        message: 'Le lieu d’activité a bien été modifié.',
      })

      router.refresh()
    } catch (mutationError) {
      if (
        applyZodValidationMutationErrorsToForm(mutationError, form.setError)
      ) {
        return
      }
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de l’enregistrement, veuillez réessayer ultérieurement.',
      })
    }
  }

  return (
    <EditCard
      noBorder
      id="informations-generales"
      title={
        <span className="fr-text-label--blue-france">
          Informations générales
        </span>
      }
      titleAs="h2"
      form={form}
      mutation={handleMutation}
      edition={
        <InformationsGeneralesFields
          className="fr-mb-4w"
          {...props}
          form={form}
          initialAdresseBanOptions={[initialAdresseBanOption]}
          adresseBanDefaultValue={initialAdresseBanOption}
        />
      }
      view={<InformationsGeneralesView {...props} />}
    />
  )
}

export default withTrpc(InformationsGeneralesEditCard)
