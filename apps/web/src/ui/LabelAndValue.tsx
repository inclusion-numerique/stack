import React, { PropsWithChildren } from 'react'
import sanitizeHtml from 'sanitize-html'
import styles from '../components/Base/Edition/BaseEdition.module.css'

export const LabelAndValue = ({
  value,
  inline = true,
  isHtml = false,
  as: Component = 'li',
  className = '',
  children,
}: PropsWithChildren<{
  value: string | null | number | undefined
  inline?: boolean
  isHtml?: boolean
  className?: string
  as?: 'li' | 'div' | 'span'
}>) => {
  if (value === null || value === undefined || value === '') {
    return null
  }
  return (
    <Component className={className}>
      {inline ? <>{children}&nbsp;:&nbsp;</> : <div>{children}</div>}
      {isHtml ? (
        <strong>{value}</strong>
      ) : (
        <strong
          className={styles.value}
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(value.toString() ?? ''),
          }}
        />
      )}
    </Component>
  )
}
