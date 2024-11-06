import React from 'react'
import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { OutilPageData } from '../outilPageData'
import { Outil } from './Outil'

const importPageDataFor = async (slug: string): Promise<OutilPageData> =>
  import(`../_data/${slug}.json`).then(
    (module: { default: OutilPageData }) => module.default,
  )

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> => {
  const pageData: OutilPageData = await importPageDataFor(params.slug)

  return {
    title: metadataTitle(`${pageData.title} - Mes outils`),
  }
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const pageData: OutilPageData = await importPageDataFor(params.slug)

  return <Outil {...pageData} />
}

export default Page
