import { PropsWithChildren } from 'react'

export const LabelAndValue = ({
  value,
  children,
}: PropsWithChildren<{
  value: string | null | number | undefined
}>) => {
  if (value === null || value === undefined) {
    return null
  }
  return (
    <li>
      {children}&nbsp;: <strong>{value}</strong>
    </li>
  )
}
