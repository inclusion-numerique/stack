'use client'

import {
  SegmentedControl,
  SegmentedControlProps,
} from '@codegouvfr/react-dsfr/SegmentedControl'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const SelectPeriod = ({
  param,
  segments,
}: {
  param: string
  segments: { label: string; param: string }[]
}) => {
  const appRouter = useRouter()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const onSelect = (period: string) => {
    appRouter.push(`statistiques?${createQueryString(param, period)}`)
  }

  return (
    <SegmentedControl
      hideLegend
      legend="Choix de la période"
      segments={
        segments.map((segment, index) => ({
          label: segment.label,
          nativeInputProps: {
            checked:
              searchParams?.get(param) === segment.param ||
              (searchParams?.get(param) == null && index === 1),
            onChange: () => onSelect(segment.param),
          },
        })) as unknown as SegmentedControlProps.Segments
      }
    />
  )
}

export default SelectPeriod
