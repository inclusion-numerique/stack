import React, { PropsWithChildren } from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0
const PrintLayout = ({ children }: PropsWithChildren) => (
  <div id="print" style={{ flex: 1 }}>
    {children}
  </div>
)

export default PrintLayout
