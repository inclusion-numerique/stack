import dynamic from 'next/dynamic'
import React from 'react'

export const noSsr = <P>(component: React.ComponentType<P>) =>
  dynamic(() => Promise.resolve(component), {
    ssr: false,
  })
