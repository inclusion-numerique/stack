import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { trpc } from '@app/web/trpc'
import { FeedbackBadge } from './FeedbackBadge'
import { ReadMore } from './ReadMore'

const {
  Component: DeleteModal,
  close: closeDeleteModal,
  buttonProps: deleteModalNativeButtonProps,
} = createModal({
  id: `delete-resource-feedback`,
  isOpenedByDefault: false,
})

const ResourceFeedback = ({
  feedback,
  isOwner,
  canSendMail,
  onEdit,
}: {
  feedback: {
    resourceId: string
    created: Date
    updated: Date
    sentBy: {
      image: { id: string; altText: string | null } | null
      firstName: string | null
      lastName: string | null
      name: string | null
      email: string | null
    }
    comment: string | null
    rating: number
  }
  isOwner: boolean
  canSendMail: boolean
  onEdit: () => void
}) => {
  const router = useRouter()
  const mutate = trpc.resource.deleteFeedback.useMutation()
  const isLoading = mutate.isPending

  const onDelete = async () => {
    try {
      await mutate.mutateAsync({ resourceId: feedback.resourceId })

      closeDeleteModal()
      router.refresh()

      createToast({
        priority: 'success',
        message: 'Avis supprimé',
      })
    } catch {
      createToast({
        priority: 'error',
        message: "Votre avis n'a pas pu être supprimé",
      })
    }
  }

  return (
    <article data-testid="resource-feedback">
      <div className="fr-border fr-border-radius--8 fr-p-4w fr-mb-3w">
        <div className="fr-flex fr-justify-content-space-between">
          <div className="fr-flex fr-align-items-center fr-flex-gap-3v">
            <RoundProfileImage user={feedback.sentBy} />
            <div className="fr-flex fr-align-items-baseline fr-direction-md-row fr-direction-column">
              <span className="fr-text--bold">{feedback.sentBy.name}</span>
              <span className="fr-unhidden-md fr-hidden fr-mx-1w">·</span>
              <span className="fr-text--xs fr-mb-0 fr-text-mention--grey fr-flex-grow-1">
                {feedback.created.getTime() === feedback.updated.getTime() ? (
                  <>
                    Avis&nbsp;publié&nbsp;le&nbsp;
                    {dateAsDay(feedback.created)}
                  </>
                ) : (
                  <>
                    Avis&nbsp;modifié&nbsp;le&nbsp;
                    {dateAsDay(feedback.updated)}
                  </>
                )}
              </span>
            </div>
          </div>
          {canSendMail && feedback.sentBy.email && (
            <Link
              className="fr-btn fr-btn--tertiary-no-outline fr-icon-mail-line fr-btn--icon-right"
              href={`mailto:${feedback.sentBy.email}`}
            >
              Contacter
            </Link>
          )}
          {isOwner && (
            <ButtonsGroup
              inlineLayoutWhen="always"
              buttons={[
                {
                  type: 'button',
                  size: 'small',
                  priority: 'tertiary no outline',
                  className: 'fr-pr-0 fr-pl-1w fr-my-0 fr-py-0',
                  iconId: 'fr-icon-edit-line',
                  title: "Modifier l'avis",
                  onClick: onEdit,
                },
                {
                  type: 'button',
                  size: 'small',
                  priority: 'tertiary no outline',
                  className: 'fr-pr-0 fr-pl-1w fr-my-0 fr-py-0',
                  nativeButtonProps: deleteModalNativeButtonProps,
                  iconId: 'fr-icon-delete-bin-line',
                  title: "Supprimer l'avis",
                },
              ]}
            />
          )}
        </div>
        <div className="fr-mt-2w">
          <FeedbackBadge value={feedback.rating} />
        </div>
        {feedback.comment && (
          <p className="fr-mt-2w fr-mb-0">
            <ReadMore limit={610}>{feedback.comment}</ReadMore>
          </p>
        )}
      </div>
      <DeleteModal
        title="Supprimer votre avis"
        buttons={[
          {
            children: 'Annuler',
            priority: 'secondary',
            disabled: isLoading,
            onClick: closeDeleteModal,
          },
          {
            children: 'Supprimer',
            ...buttonLoadingClassname(isLoading, 'fr-btn--danger'),
            onClick: onDelete,
          },
        ]}
      >
        Êtes-vous sûr de vouloir supprimer votre avis sur cette ressource ?
      </DeleteModal>
    </article>
  )
}

export default withTrpc(ResourceFeedback)
