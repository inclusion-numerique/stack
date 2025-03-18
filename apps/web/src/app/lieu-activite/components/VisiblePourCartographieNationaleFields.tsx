'use client'

import { createToast } from '@app/ui/toast/createToast'
import { servicesStructureLabels } from '@app/web/app/structure/optionsStructure'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import ToggleSwitch from '@codegouvfr/react-dsfr/ToggleSwitch'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'

const DEFAULT_SERVICES = [
  servicesStructureLabels['Aide aux démarches administratives'],
  servicesStructureLabels['Maîtrise des outils numériques du quotidien'],
  servicesStructureLabels['Insertion professionnelle via le numérique'],
  servicesStructureLabels['Utilisation sécurisée du numérique'],
  servicesStructureLabels['Parentalité et éducation avec le numérique'],
  servicesStructureLabels['Loisirs et créations numériques'],
  servicesStructureLabels['Comprehension du monde numérique'],
]

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
  const mutateCartographieNationaleVisibility =
    trpc.lieuActivite.updateVisiblePourCartographieNationale.useMutation()

  const mutateServicesEtAccompagnement =
    trpc.lieuActivite.updateServicesEtAccompagnement.useMutation()

  const handleChange = async () => {
    try {
      if (!visiblePourCartographieNationale) {
        await mutateServicesEtAccompagnement.mutateAsync({
          id,
          services: DEFAULT_SERVICES,
          modalitesAccompagnement: [],
        })
      }

      await mutateCartographieNationaleVisibility.mutateAsync({
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
            disabled={mutateCartographieNationaleVisibility.isPending}
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
