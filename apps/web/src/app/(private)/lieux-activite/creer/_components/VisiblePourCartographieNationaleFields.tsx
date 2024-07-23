'use client'

import React, { ReactNode } from 'react'
import { UseFormReturn } from 'react-hook-form'
import ToggleFormField from '@app/ui/components/Form/ToggleFormField'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { CreerLieuActiviteData } from '@app/web/app/lieu-activite/CreerLieuActiviteValidation'

const VisiblePourCartographieNationaleFields = ({
  form: { control, formState, watch },
  className,
  children,
}: {
  form: UseFormReturn<CreerLieuActiviteData>
  className: string
  children?: ReactNode
}) => {
  const visiblePourCartographieNationale = watch(
    'visiblePourCartographieNationale',
  )

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

export default withTrpc(VisiblePourCartographieNationaleFields)
