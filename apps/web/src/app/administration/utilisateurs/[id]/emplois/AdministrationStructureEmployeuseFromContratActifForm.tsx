'use client'

import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { MiseEnRelationConseillerNumeriqueV1MinimalProjection } from '@app/web/external-apis/conseiller-numerique/MiseEnRelationConseillerNumeriqueV1'
import {
  MettreAJourStructureEmployeuseDepuisContratActifData,
  MettreAJourStructureEmployeuseDepuisContratActifValidation,
} from '@app/web/server/rpc/conseillers-numerique/MettreAJourStructureEmployeuseDepuisContratActifValidation'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

const AdministrationStructureEmployeuseFromContratActifForm = ({
  user,
  miseEnRelationActive,
}: {
  user: Pick<User, 'id' | 'name'>
  miseEnRelationActive: MiseEnRelationConseillerNumeriqueV1MinimalProjection
}) => {
  const form = useForm<MettreAJourStructureEmployeuseDepuisContratActifData>({
    resolver: zodResolver(
      MettreAJourStructureEmployeuseDepuisContratActifValidation,
    ),
    defaultValues: {
      userId: user.id,
      miseEnRelation: {
        ...miseEnRelationActive,
        dateDebutDeContrat:
          miseEnRelationActive.dateDebutDeContrat ?? undefined,
        dateFinDeContrat: miseEnRelationActive.dateFinDeContrat ?? undefined,
        dateRecrutement: miseEnRelationActive.dateRecrutement ?? undefined,
      },
    },
  })

  const {
    setError,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form

  const mutation =
    trpc.conseillersNumerique.mettreAJourStructureEmployeuseDepuisContratActif.useMutation()

  const router = useRouter()

  const onSubmit = async (
    data: MettreAJourStructureEmployeuseDepuisContratActifData,
  ) => {
    try {
      await mutation.mutateAsync(data)
      createToast({
        priority: 'success',
        message: `La structure employeuse de ${user.name} a bien été mise à jour depuis le contrat actif.`,
      })
      router.push(`/administration/utilisateurs/${user.id}`)
      router.refresh()
    } catch (mutationError) {
      if (applyZodValidationMutationErrorsToForm(mutationError, setError)) {
        return
      }
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de l’enregistrement, veuillez réessayer ultérieurement.',
      })
    }
  }

  const isLoading = isSubmitting || isSubmitSuccessful

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fr-btns-group fr-btns-group--icon-left">
        <Button
          type="submit"
          priority="primary"
          iconId="fr-icon-refresh-line"
          {...buttonLoadingClassname(isLoading, 'fr-mb-0 ')}
        >
          Mettre à jour la structure employeuse à partir du contrat
        </Button>
      </div>
    </form>
  )
}

export default withTrpc(AdministrationStructureEmployeuseFromContratActifForm)
