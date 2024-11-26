'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import type { DefaultValues } from 'react-hook-form'
import type { CraIndividuelData } from '@app/web/cra/CraIndividuelValidation'
import { encodeSerializableState } from '@app/web/utils/encodeSerializableState'
import type { CraCollectifData } from '@app/web/cra/CraCollectifValidation'
import type { CraDemarcheAdministrativeData } from '@app/web/cra/CraDemarcheAdministrativeValidation'

const ModalNavigationButton = ({
  children,
  illustration,
  onClick,
  className,
}: {
  children: ReactNode
  illustration: string
  className?: string
  onClick?: () => void
}) => (
  <button
    type="button"
    onClick={onClick}
    className={classNames(
      'fr-p-0 fr-mt-4v fr-width-full fr-border-radius--8 fr-border fr-flex fr-link--no-underline',
      className,
    )}
  >
    <div className="fr-background-alt--blue-france fr-p-4v fr-border-radius-left--8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="fr-display-block" alt="" src={illustration} />
    </div>
    <div className="fr-p-5v fr-flex fr-align-items-center fr-align-self-center fr-text--medium fr-height-full">
      {children}
    </div>
  </button>
)

const CreateCraModalContent = ({
  atelier = true,
  craDefaultValues,
  onClose,
  retour,
}: {
  atelier?: boolean
  craDefaultValues?:
    | DefaultValues<CraIndividuelData>
    | DefaultValues<CraCollectifData>
    | DefaultValues<CraDemarcheAdministrativeData>
  onClose: () => void
  retour?: string
}) => {
  const { push, prefetch } = useRouter()
  const navigateTo = (path: string) => {
    if (craDefaultValues) {
      push(
        `${path}?v=${encodeSerializableState(craDefaultValues)}${retour ? `&retour=${retour}` : ''}`,
      )
    } else {
      push(retour ? `${path}?retour=${retour}` : path)
    }
    onClose()
  }

  useEffect(() => {
    prefetch('/coop/mes-activites/cra/individuel')
    prefetch('/coop/mes-activites/cra/collectif')
    prefetch('/coop/mes-activites/cra/administratif')
  }, [prefetch])

  return (
    <>
      <p className="fr-text--xl">
        Quel type d’accompagnement avez-vous réalisé&nbsp;?
      </p>
      <ModalNavigationButton
        illustration="/images/iconographie/accompagnement-individuel.svg"
        onClick={() => navigateTo('/coop/mes-activites/cra/individuel')}
      >
        Accompagnement individuel
      </ModalNavigationButton>

      {atelier && (
        <ModalNavigationButton
          illustration="/images/iconographie/accompagnement-collectif.svg"
          onClick={() => navigateTo('/coop/mes-activites/cra/collectif')}
        >
          Ateliers collectif
        </ModalNavigationButton>
      )}

      <ModalNavigationButton
        illustration="/images/iconographie/demarche-administrative.svg"
        onClick={() => navigateTo('/coop/mes-activites/cra/administratif')}
      >
        Aide aux démarches administratives
      </ModalNavigationButton>
    </>
  )
}

export default CreateCraModalContent
