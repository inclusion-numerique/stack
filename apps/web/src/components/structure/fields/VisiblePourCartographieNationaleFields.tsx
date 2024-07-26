'use client'

import React, { ReactNode, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import ToggleFormField from '@app/ui/components/Form/ToggleFormField'
import { CreerLieuActiviteData } from '@app/web/app/lieu-activite/CreerLieuActiviteValidation'

export const VisiblePourCartographieNationaleFields = ({
  form: { control, formState, watch },
  onChange,
  className,
  children,
}: {
  form: UseFormReturn<CreerLieuActiviteData>
  onChange?: (visible: boolean) => void
  className: string
  children?: ReactNode
}) => {
  const visiblePourCartographieNationale = watch(
    'visiblePourCartographieNationale',
  )

  useEffect(() => {
    onChange?.(visiblePourCartographieNationale)
  }, [onChange, visiblePourCartographieNationale])

  return (
    <>
      <div className={className}>
        <ToggleFormField
          className="fr-m-0"
          label={
            <span className="fr-text--medium">
              Rendre mon lieu d’activité visible sur la cartographie{' '}
            </span>
          }
          labelPosition="left"
          control={control}
          disabled={formState.isSubmitting}
          path="visiblePourCartographieNationale"
        />
      </div>
      {visiblePourCartographieNationale && children}
    </>
  )
}
