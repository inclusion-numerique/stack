import React from 'react'
import BaseDetails from '@app/web/components/Base/BaseDetails'
import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'

const BaseAProposPage = async ({ params }: { params: { slug: string } }) => {
  const { base } = await getBasePageContext(params.slug)

  return <BaseDetails base={base} />
}

export default BaseAProposPage
