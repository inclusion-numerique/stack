'use client'

import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import BackButton from '@app/web/components/BackButton'
import { UserInfoLine } from '../../_components/UserInfoLine'

const Identity = ({
  mediateurId,
  isConseillerNumerique,
  name,
  email,
  phone,
}: {
  mediateurId: string
  isConseillerNumerique: boolean
  name: string | null
  email: string
  phone: string | null
}) => {
  const {
    Component: RemoveFromTeamModal,
    close: closeRemoveFromTeamModal,
    buttonProps: removeFromTeamModalNativeButtonProps,
  } = createModal({
    id: 'remove-from-team-modal',
    isOpenedByDefault: false,
  })

  const router = useRouter()
  const mutation = trpc.mediateur.removeFromTeam.useMutation()

  return (
    <>
      <RemoveFromTeamModal
        title={`Retirer ‘${name}’ de mon équipe`}
        buttons={[
          {
            children: 'Annuler',
            priority: 'secondary',
            onClick: closeRemoveFromTeamModal,
          },
          {
            className: 'fr-background-action-high--error',
            children: 'Retirer de mon équipe',
            onClick: async () => {
              await mutation.mutateAsync({ mediateurId })
              router.push('/coop/mon-equipe')
              router.refresh()
            },
          },
        ]}
      >
        Êtes-vous sûr de vouloir retirer ce médiateur numérique de votre
        équipe&nbsp;? Vous n’aurez plus accès à ses informations de profil ainsi
        qu’à ses statistiques.
      </RemoveFromTeamModal>
      <BackButton href="/coop/mon-equipe">Retour à la liste</BackButton>
      <div className="fr-flex fr-flex-wrap fr-direction-row fr-align-items-center fr-flex-gap-4v fr-mb-6v">
        <span
          className="fr-line-height-1 fr-text-label--blue-france fr-background-alt--blue-france fr-p-4v fr-m-0 fr-border-radius--8"
          aria-hidden
        >
          {isConseillerNumerique ? (
            <img
              width="40px"
              height="40px"
              src="/images/illustrations/role/conseillers-numerique.svg"
              alt=""
            />
          ) : (
            <span
              className="ri-account-circle-line ri-2x fr-p-1v fr-display-block"
              aria-hidden
            />
          )}
        </span>
        <div className="fr-flex fr-direction-column">
          <h1 className="fr-h2 fr-page-title fr-m-0">{name}</h1>
          <div className="fr-text-mention--grey fr-text--semi-bold fr-text--sm fr-mb-0 fr-mt-2v fr-flex fr-flex-gap-2v fr-direction-md-row fr-direction-column">
            <UserInfoLine
              isConseillerNumerique={isConseillerNumerique}
              withUserIcon={false}
              email={email}
              phone={phone ?? undefined}
            />
          </div>
        </div>
      </div>
      <ButtonsGroup
        buttonsSize="small"
        buttons={[
          {
            className: 'fr-mb-0',
            children: (
              <span className="fr-flex fr-flex-gap-2v">
                <span className="ri-mail-line" aria-hidden />
                Contacter par email
              </span>
            ),
            title: 'Contacter par email - client mail',
            linkProps: { href: `mailto:${email}` },
            priority: 'tertiary',
          },
          ...((isConseillerNumerique
            ? []
            : [
                {
                  children: (
                    <span className="fr-flex fr-flex-gap-2v fr-text-default--error ">
                      <span className="ri-user-unfollow-line" aria-hidden />
                      Retirer de mon équipe
                    </span>
                  ),
                  priority: 'tertiary',
                  ...removeFromTeamModalNativeButtonProps,
                  disabled: mutation.isPending,
                  ...buttonLoadingClassname(mutation.isPending, 'fr-mb-0'),
                },
              ]) as ButtonProps[]),
        ]}
        inlineLayoutWhen="md and up"
      />
    </>
  )
}

export default withTrpc(Identity)
