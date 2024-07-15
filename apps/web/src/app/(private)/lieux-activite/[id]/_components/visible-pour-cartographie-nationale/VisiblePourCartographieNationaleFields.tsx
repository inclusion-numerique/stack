'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ToggleFormField from '@app/ui/components/Form/ToggleFormField'
import {
  VisiblePourCartographieNationaleCommandValidation,
  VisiblePourCartographieNationaleData,
} from '@app/web/app/structure/VisiblePourCartographieNationaleCommandValidation'

export const VisiblePourCartographieNationaleFields = ({
  visiblePourCartographieNationale,
}: {
  visiblePourCartographieNationale: boolean
}) => {
  const form = useForm<VisiblePourCartographieNationaleData>({
    resolver: zodResolver(VisiblePourCartographieNationaleCommandValidation),
    defaultValues: {
      visiblePourCartographieNationale,
    },
  })

  const {
    control,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form

  const isLoading = isSubmitting || isSubmitSuccessful

  return (
    <ToggleFormField
      control={control}
      path="visiblePourCartographieNationale"
      disabled={isLoading}
      label={
        <span className="fr-text--medium">
          Rendre mon lieu d’activité visible sur la cartographie
        </span>
      }
      className="fr-mb-0"
      labelPosition="left"
    />
  )
}
