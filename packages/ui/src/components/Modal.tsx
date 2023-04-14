import React, { ReactNode } from 'react'
import { UiComponentProps } from '../utils/uiComponentProps'
import Button from './Button'

type ModalProps = {
  buttonLabel: string
  title: string
  modalId?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  buttons?: React.ReactElement<typeof Button>[]
  open?: boolean
}

const sizes = {
  sm: 'fr-col-12 fr-col-md-4',
  md: 'fr-col-12 fr-col-md-8 fr-col-lg-6',
  lg: 'fr-col-12 fr-col-md-8',
}

const Modal = ({
  buttonLabel,
  modalId,
  title,
  children,
  size = 'md',
  buttons,
  open,
}: UiComponentProps & ModalProps) => {
  const id = `fr-modal-${modalId || 1}`
  return (
    <>
      <button
        type="button"
        className="fr-btn"
        data-fr-opened={open || 'false'}
        aria-controls={id}
      >
        {buttonLabel}
      </button>
      <dialog
        aria-labelledby={`title-${id}`}
        id={id}
        className="fr-modal"
        open={open}
      >
        <div className="fr-container fr-container--fluid fr-container-md">
          <div className="fr-grid-row fr-grid-row--center">
            <div className={sizes[size]}>
              <div className="fr-modal__body">
                <div className="fr-modal__header">
                  <button
                    type="button"
                    className="fr-link--close fr-link"
                    title="Fermer la fenêtre modale"
                    aria-controls={id}
                  >
                    Fermer
                  </button>
                </div>
                <div className="fr-modal__content">
                  <h1 id={`title-${id}`} className="fr-modal__title">
                    <span className="fr-fi-arrow-right-line fr-fi--lg" />
                    {title}
                  </h1>
                  {children}
                </div>
                {buttons && (
                  <div className="fr-modal__footer">
                    <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left">
                      {buttons.map((button) => (
                        <li key={button.key}>{button}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default Modal
