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
  className,
  children,
}: {
  id: string
  visiblePourCartographieNationale: boolean
  className: string
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
      <div className={className}>
        <ToggleSwitch
          inputTitle="Visibilité du lieu d’activité sur la cartographie"
          disabled={mutate.isPending}
          checked={visiblePourCartographieNationale}
          label={
            <span className="fr-text--medium">
              Rendre mon lieu d’activité visible sur la cartographie
            </span>
          }
          labelPosition="left"
          showCheckedHint
          onChange={handleChange}
        />
      </div>
      {visiblePourCartographieNationale && children}
    </>
  )
}

export default withTrpc(VisiblePourCartographieNationaleFields)
