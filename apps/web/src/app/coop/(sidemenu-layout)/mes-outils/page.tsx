import React from 'react'
import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { MesOutils } from './MesOutils'

export const metadata: Metadata = {
  title: metadataTitle('Mes outils'),
}

const Page = () => <MesOutils />

export default Page
