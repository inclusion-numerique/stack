'use client'

import CustomSelect from '@app/ui/components/CustomSelect/CustomSelect'
import { BeneficiaireOption } from '@app/web/beneficiaire/BeneficiaireOption'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'
import FilterTag from '@app/web/components/filters/FilterTag'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { useBeneficiaireSearch } from '@app/web/hooks/useBeneficiaireSearch'
import { ReactNode, useState } from 'react'

export type BeneficiaireFilterValue = string // uuid of the beneficiaire

export type BeneficiaireFilterOnChange = (
  value: BeneficiaireFilterValue | null,
) => void

const BeneficiaireFilter = ({
  onChange,
  defaultValue,
  initialBeneficiairesOptions,
}: {
  onChange: BeneficiaireFilterOnChange
  defaultValue?: string
  initialBeneficiairesOptions: BeneficiaireOption[]
}) => {
  const { initialOptions, loadOptions } = useBeneficiaireSearch({
    initialBeneficiairesOptions,
  })

  const [beneficiaire, setBeneficiaire] = useState<BeneficiaireOption | null>(
    defaultValue
      ? (initialBeneficiairesOptions.find(
          (option) => option.value?.id === defaultValue,
        ) ?? null)
      : null,
  )

  const onClear = () => {
    onChange(null)
    setBeneficiaire(null)
  }

  const valueLabel = (option: BeneficiaireOption | null): ReactNode =>
    option?.value ? getBeneficiaireDisplayName(option.value) : null

  const onSelectChange = (option: BeneficiaireOption | null) => {
    setBeneficiaire(option)
    onChange(option?.value?.id ?? null)
  }

  return (
    <FilterTag
      value={beneficiaire}
      valueLabel={valueLabel}
      onClear={onClear}
      label="Bénéficiaire"
    >
      <div style={{ width: 460 }}>
        <CustomSelect
          instanceId="beneficiaire-filter-search"
          placeholder="Rechercher parmi vos bénéficiaires enregistrés"
          className="fr-mb-2v fr-mt-3v"
          loadOptions={loadOptions}
          defaultOptions={initialOptions}
          onChange={onSelectChange}
        />
      </div>
    </FilterTag>
  )
}

export default withTrpc(BeneficiaireFilter)
