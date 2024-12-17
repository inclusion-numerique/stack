import React from 'react'
import dynamic from 'next/dynamic'

export const noSsr = <P>(component: React.ComponentType<P>) =>
  dynamic(() => Promise.resolve(component), {
    ssr: false,
  })
