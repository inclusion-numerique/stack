import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getOutilsPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-outils/[slug]/outilsPageData'
import { Outil } from './Outil'

export const generateMetadata = ({
  params,
}: {
  params: { slug: string }
}): Metadata | null => {
  const pageData = getOutilsPageData(params.slug)
  if (!pageData) {
    notFound()
    return null
  }

  return {
    title: metadataTitle(`${pageData.title} - Mes outils`),
  }
}

const Page = ({ params }: { params: { slug: string } }) => {
  const pageData = getOutilsPageData(params.slug)

  if (!pageData) {
    notFound()
    return null
  }

  return <Outil {...pageData} />
}

export default Page
