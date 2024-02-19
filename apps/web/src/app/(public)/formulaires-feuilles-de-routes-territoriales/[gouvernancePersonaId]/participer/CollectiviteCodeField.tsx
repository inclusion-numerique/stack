import { UseFormReturn } from 'react-hook-form'
import SelectFormField from '@app/ui/components/Form/SelectFormField'
import CustomSelectFormField from '@app/ui/components/Form/CustomSelectFormField'
import React from 'react'
import { Control } from 'react-hook-form/dist/types/form'
import { ParticiperData } from '@app/web/gouvernance/Participer'
import { GouvernancePersona } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import {
  emptyOptionTuple,
  OptionTuples,
  optionTuplesToOptions,
} from '@app/web/utils/options'
import RedAsterisk from '@app/web/ui/RedAsterisk'
import { trpc } from '@app/web/trpc'
import { InformationsParticipantData } from '@app/web/gouvernance/InformationsParticipant'

const CollectiviteCodeField = ({
  form,
  persona,
  optionsRegions,
  optionsDepartements,
}: {
  form:
    | UseFormReturn<ParticiperData>
    | UseFormReturn<InformationsParticipantData>
  persona: GouvernancePersona
  optionsRegions: OptionTuples
  optionsDepartements: OptionTuples
}) => {
  const label = (
    <h5>
      Renseignez votre {persona.labelTitle} <RedAsterisk />
    </h5>
  )

  const control = form.control as Control<ParticiperData>

  if (persona.id === 'conseil-regional') {
    return (
      <SelectFormField
        label={label}
        control={control}
        options={optionTuplesToOptions([emptyOptionTuple, ...optionsRegions])}
        path="codeRegion"
      />
    )
  }

  if (persona.id === 'conseil-departemental') {
    return (
      <SelectFormField
        label={label}
        control={control}
        options={optionTuplesToOptions([
          emptyOptionTuple,
          ...optionsDepartements,
        ])}
        path="codeDepartement"
      />
    )
  }

  const { client: trpcClient } = trpc.useContext()

  if (persona.id === 'epci') {
    const loadOptions = async (search: string) => {
      const result = await trpcClient.data.collectivitySearch.query({
        epci: true,
        commune: false,
        query: search,
      })

      return result.map(({ code, nom }) => ({
        label: nom,
        value: code,
      }))
    }

    return (
      <CustomSelectFormField
        label={label}
        control={control}
        path="codeEpci"
        placeholder="Rechercher votre EPCI"
        loadOptions={loadOptions}
        cacheOptions
      />
    )
  }
  if (persona.id === 'commune') {
    const loadOptions = async (search: string) => {
      const result = await trpcClient.data.collectivitySearch.query({
        epci: false,
        commune: true,
        query: search,
        limit: 25,
      })

      return result.map(({ code, nom }) => ({
        label: nom,
        value: code,
      }))
    }

    return (
      <CustomSelectFormField
        label={label}
        control={control}
        path="codeCommune"
        placeholder="Rechercher votre commune"
        loadOptions={loadOptions}
        cacheOptions
      />
    )
  }

  throw new Error('Invalid persona for setting collectivity code')
}
export default CollectiviteCodeField
