'use client'

import React, {
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useRef,
} from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'

const hasKey = (
  event: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
): event is React.KeyboardEvent<HTMLDivElement> =>
  Object.prototype.hasOwnProperty.call(event, 'key')

export const Dropdown = ({
  id,
  control,
  children,
  alignRight = false,
  title,
  priority,
  size,
}: {
  id: string
  control: ReactNode
  children: ReactNode
  alignRight?: boolean
  title?: string
  priority?: ButtonProps['priority']
  size?: ButtonProps['size']
}) => {
  const formattedId = id.replace('-', '_')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const collapseRef = useRef<HTMLDivElement>(null)

  const onClickOrEnterInsideDropdown = (
    event: KeyboardEvent<HTMLDivElement> | ReactMouseEvent<HTMLDivElement>,
  ) => {
    if (hasKey(event) && (event.key === 'Tab' || event.key === 'Shift')) return

    if (event.target instanceof HTMLAnchorElement) {
      buttonRef.current?.click()
    }
  }

  useOnClickOutside(collapseRef, (event) => {
    if (
      event.target instanceof HTMLElement &&
      buttonRef.current?.contains(event.target)
    ) {
      return
    }

    if (buttonRef.current?.getAttribute('aria-expanded') !== 'true') {
      return
    }

    buttonRef.current.click()
  })

  return (
    <div className="fr-dropdown">
      <Button
        className="fr-dropdown__btn"
        priority={priority}
        title={title}
        type="button"
        size={size}
        aria-expanded="false"
        aria-controls={formattedId}
        ref={buttonRef}
      >
        {control}
      </Button>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        role="navigation"
        className="fr-collapse fr-dropdown__pane fr-mr-1v"
        style={{ [alignRight ? 'right' : 'left']: 0 }}
        id={formattedId}
        ref={collapseRef}
        onClick={onClickOrEnterInsideDropdown}
        onKeyDown={onClickOrEnterInsideDropdown}
      >
        {children}
      </div>
    </div>
  )
}
