'use client'

import React, { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import ToggleSwitch from '@codegouvfr/react-dsfr/ToggleSwitch'
import { createToast } from '@app/ui/toast/createToast'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

const VisiblePourCartographieNationaleFields = ({
  id,
  visiblePourCartographieNationale,
  onChange,
  className,
  canChangeVisibility = true,
  children,
}: {
  id: string
  visiblePourCartographieNationale: boolean
  onChange?: (visible: boolean) => void
  className: string
  canChangeVisibility?: boolean
  children?: ReactNode
}) => {
  const router = useRouter()
  const mutate =
    trpc.lieuActivite.updateVisiblePourCartographieNationale.useMutation()

  const handleChange = async () => {
    try {
      await mutate.mutateAsync({
        id,
        visiblePourCartographieNationale: !visiblePourCartographieNationale,
      })
      router.refresh()
      createToast({
        priority: 'success',
        message: (
          <>
            Le lieu d’activité{' '}
            <strong>
              {visiblePourCartographieNationale
                ? 'n’est pas visible'
                : 'est visible'}
            </strong>{' '}
            sur la cartographie
          </>
        ),
      })

      onChange?.(!visiblePourCartographieNationale)
    } catch {
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de la configuration de la visibilité du lieu d’activité sur la cartographie',
      })
    }
  }

  return (
    <>
      {canChangeVisibility && (
        <div className={className}>
          <ToggleSwitch
            inputTitle="Visibilité du lieu d’activité sur la cartographie"
            disabled={mutate.isPending}
            checked={visiblePourCartographieNationale}
            label={
              <span className="fr-text--medium fr-my-auto">
                Rendre mon lieu d’activité visible sur la cartographie
              </span>
            }
            labelPosition="left"
            showCheckedHint
            onChange={handleChange}
          />
        </div>
      )}

      {visiblePourCartographieNationale && (
        <>
          {canChangeVisibility && <hr className="fr-separator-1px" />}
          {children}
        </>
      )}
    </>
  )
}

export default withTrpc(VisiblePourCartographieNationaleFields)
