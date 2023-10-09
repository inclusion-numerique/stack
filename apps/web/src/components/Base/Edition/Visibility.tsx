'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import ResourceBaseRichRadioElement from '@app/web/components/Resource/ResourceBaseRichRadioElement'
import { BasePrivacyTag, PrivacyTag } from '@app/web/components/PrivacyTags'
import EditCard from '@app/web/components/EditCard'
import {
  UpdateBaseVisibilityCommand,
  UpdateBaseVisibilityCommandValidation,
} from '@app/web/server/bases/updateBase'
import { BasePageData } from '@app/web/server/bases/getBase'

const {
  Component: PrivateModal,
  open: openPrivateModal,
  close: closePrivateModal,
} = createModal({
  id: 'private',
  isOpenedByDefault: false,
})

const Visibility = ({
  base,
  className,
}: {
  base: BasePageData
  className?: string
}) => {
  const router = useRouter()
  const [visibility, setVisibility] = useState<UpdateBaseVisibilityCommand>({
    isPublic: base.isPublic,
  })
  const form = useForm<UpdateBaseVisibilityCommand>({
    resolver: zodResolver(UpdateBaseVisibilityCommandValidation),
    defaultValues: {
      isPublic: base.isPublic,
    },
  })
  const mutate = trpc.base.mutate.useMutation()
  const hasPublicResources = base.resources.some(
    (resource) => resource.isPublic,
  )

  return (
    <>
      {hasPublicResources && (
        <PrivateModal
          title={
            <>
              <span className="fr-icon-arrow-right-line" /> Rendre privée ma
              base
            </>
          }
          buttons={[
            {
              title: 'Annuler',
              priority: 'secondary',
              doClosesModal: true,
              children: 'Annuler',
              disabled: mutate.isLoading,
              type: 'button',
            },
            {
              title: 'Continuer',
              children: 'Continuer',
              type: 'button',
              disabled: mutate.isLoading,
              nativeButtonProps: {
                'data-testid': 'visibility-modal-continue-button',
              },
              onClick: async () => {
                await mutate.mutateAsync({ id: base.id, data: visibility })
                router.refresh()
                closePrivateModal()
              },
            },
          ]}
        >
          Votre base et l’ensemble des ressources et collections publiques lui
          appartenant seront également privés et ne seront plus visible du
          public, mis à part des éventuels contributeurs invités sur vos
          ressources.
        </PrivateModal>
      )}
      <EditCard
        id="visibilite"
        noRefresh
        mutation={async (data) => {
          if (data.isPublic || !hasPublicResources) {
            await mutate.mutateAsync({ id: base.id, data })
            router.refresh()
          } else {
            setVisibility(data)
            openPrivateModal()
          }
        }}
        className={className}
        title="Visibilité de la base"
        description="Choisissez la visibilité de votre base."
        form={form}
        edition={
          <Controller
            control={form.control}
            name="isPublic"
            render={({
              field: { onChange, name, value },
              fieldState: { error },
            }) => (
              <fieldset
                className="fr-fieldset"
                id="radio-rich"
                aria-labelledby="radio-rich-legend radio-rich-messages"
              >
                <ResourceBaseRichRadioElement
                  id="radio-base-public"
                  data-testid="visibility-radio-base-public"
                  name={name}
                  value={
                    value === undefined || value === null
                      ? null
                      : value.toString()
                  }
                  radioValue="true"
                  onChange={() => {
                    onChange(true)
                  }}
                >
                  <div className="fr-mr-1w">
                    Base publique
                    <p className="fr-text--xs fr-hint-text fr-mb-0">
                      Visible par tous les visiteurs.
                    </p>
                  </div>
                  <PrivacyTag isPublic />
                </ResourceBaseRichRadioElement>
                <ResourceBaseRichRadioElement
                  id="radio-base-private"
                  data-testid="visibility-radio-base-private"
                  name={name}
                  value={
                    value === undefined || value === null
                      ? null
                      : value.toString()
                  }
                  radioValue="false"
                  onChange={() => {
                    onChange(false)
                  }}
                >
                  <div className="fr-mr-1w">
                    Base privée
                    <p className="fr-text--xs fr-hint-text fr-mb-0">
                      Accessible uniquement aux membres et aux administrateurs
                      que vous inviterez.
                    </p>
                  </div>
                  <PrivacyTag />
                </ResourceBaseRichRadioElement>
                {error && <p className="fr-error-text">{error.message}</p>}
              </fieldset>
            )}
          />
        }
        view={
          <>
            <p className="fr-text--sm" data-testid="base-visibility">
              {base.isPublic
                ? 'Votre base est publique. Vous pouvez passez votre base en privée si vous le souhaitez.'
                : 'Votre base est privée. Vous pouvez passez votre base en publique si vous le souhaitez.'}
            </p>
            <BasePrivacyTag isPublic={base.isPublic} />
          </>
        }
      />
    </>
  )
}

export default withTrpc(Visibility)