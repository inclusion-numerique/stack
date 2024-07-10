'use client'

import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { CreateCraModalDefinition } from '@app/web/app/coop/mon-activite/CreateCraModalDefinition'

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

const CreateCraModal = () => {
  const { push } = useRouter()
  const navigateTo = (path: string) => {
    push(path)
    CreateCraModalDefinition.close()
  }
  return (
    <CreateCraModalDefinition.Component title="Compléter un compte-rendu d’activité">
      <p className="fr-text--xl">
        Quel type d’accompagnement avez-vous réalisé&nbsp;?
      </p>
      <ModalNavigationButton
        illustration="/images/iconographie/accompagnement-individuel.svg"
        onClick={() => navigateTo('/coop/mon-activite/cra/individuel')}
      >
        Accompagnement individuel
      </ModalNavigationButton>

      <ModalNavigationButton
        className="wip-outline"
        illustration="/images/iconographie/accompagnement-collectif.svg"
        onClick={() => navigateTo('/coop/mon-activite/cra/atelier')}
      >
        Atelier collectif de médiation numérique
      </ModalNavigationButton>

      <ModalNavigationButton
        className="wip-outline"
        illustration="/images/iconographie/demarche-administrative.svg"
        onClick={() => navigateTo('/coop/mon-activite/cra/administratif')}
      >
        Aide aux démarches administratives
      </ModalNavigationButton>
    </CreateCraModalDefinition.Component>
  )
}

export default CreateCraModal
