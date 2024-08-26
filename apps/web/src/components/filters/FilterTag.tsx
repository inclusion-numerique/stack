'use client'

import {
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import Tag from '@codegouvfr/react-dsfr/Tag'
import classNames from 'classnames'
import { useOnClickOutside } from 'usehooks-ts'
import styles from './FilterTag.module.css'

type FilterTagState = 'idle' | 'open' | 'active'

const FilterTag = <T = unknown,>({
  label,
  children,
  value,
  valueLabel,
  onClear,
}: PropsWithChildren<{
  label: ReactNode
  valueLabel: (value: T) => ReactNode
  value: T | null
  onClear: () => void
}>) => {
  const [open, setOpen] = useState(false)

  const hasValue = value !== null

  const state: FilterTagState = hasValue ? 'active' : open ? 'open' : 'idle'

  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    event.preventDefault()

    if (hasValue) {
      onClear()
      return setOpen(false)
    }

    return setOpen(!open)
  }

  const iconId =
    state === 'idle'
      ? 'fr-icon-arrow-down-s-line'
      : state === 'open'
        ? 'fr-icon-arrow-up-s-line'
        : 'fr-icon-close-line'

  const buttonRef = useRef<HTMLButtonElement>(null)
  const collapseRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(collapseRef, (event) => {
    // Let the event propagate if clicked on the control button
    if (event.target === buttonRef?.current) {
      return
    }

    // Close the dropdown if open on outside click
    buttonRef.current?.click()
  })

  const activeLabel = value === null ? null : valueLabel(value)

  useEffect(() => {
    // Value changed
    if (activeLabel) {
      setOpen(false)
    }
  }, [activeLabel])

  return (
    <div className={styles.container}>
      <Tag
        ref={buttonRef}
        className={classNames(
          state === 'active' && styles.active,
          state === 'open' && styles.open,
        )}
        nativeButtonProps={{
          onClick,
        }}
      >
        {activeLabel ?? label}
        <span
          className={classNames('fr-ml-1v fr-icon--sm', iconId)}
          style={{ pointerEvents: 'none' }}
        />
      </Tag>
      {state === 'open' && (
        <div className={classNames(styles.content)} ref={collapseRef}>
          {children}
        </div>
      )}
    </div>
  )
}

export default FilterTag
