import React from 'react'
import Details from '@app/web/components/Base/Details'
import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'

const BaseAProposPage = async ({ params }: { params: { slug: string } }) => {
  const { base } = await getBasePageContext(params.slug)

  return <Details base={base} />
}

export default BaseAProposPage
