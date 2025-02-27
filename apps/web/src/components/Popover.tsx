'use client'

import { Popover as RadixPopover } from 'radix-ui'
import { ReactNode, useState } from 'react'

export const Popover = ({
  open,
  onOpenChange,
  onInteractOutside,
  onEscapeKeyDown,
  trigger,
  children,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onInteractOutside?: (
    event: CustomEvent<{
      originalEvent: FocusEvent
    }>,
  ) => void
  trigger: ReactNode
  children: ReactNode
}) => {
  const [internalOpen, setInternalOpen] = useState(open ?? false)
  const isControlled = open !== undefined

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) setInternalOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }

  const currentOpen = isControlled ? open : internalOpen

  return (
    <RadixPopover.Root open={currentOpen} onOpenChange={handleOpenChange}>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          onEscapeKeyDown={onEscapeKeyDown}
          onInteractOutside={onInteractOutside}
          align="start"
          className="fr-background-default--grey fr-tile--shadow fr-rounded-md fr-mt-4v fr-p-8v fr-border-radius--8"
        >
          {children}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
}
