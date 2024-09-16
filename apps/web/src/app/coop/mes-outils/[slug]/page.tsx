import React from 'react'
import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'

type OutilPageData = {
  title: string
}

const importPageDataFor = async (slug: string): Promise<OutilPageData> =>
  import(`./_data/${slug}.json`).then(
    (module: { default: OutilPageData }) => module.default,
  )

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> => ({
  title: metadataTitle(
    `${(await importPageDataFor(params.slug)).title} - Mes outils`,
  ),
})

const Page = async ({ params }: { params: { slug: string } }) => {
  const pageData: OutilPageData = await importPageDataFor(params.slug)

  return (
    <>
      <h1>{pageData.title}</h1>
    </>
  )
}

export default Page
