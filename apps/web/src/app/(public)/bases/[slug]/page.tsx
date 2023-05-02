import React from 'react'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { basePageQuery } from '@app/web/app/(public)/bases/[slug]/basePageQuery'

const BasePage = async ({ params }: { params: { slug: string } }) => {
  const base = await basePageQuery(decodeURI(params.slug))
  if (!base) {
    notFound()
  }

  return (
    <>
      <Breadcrumbs
        currentPage={base.title}
        parents={[{ label: 'Bases', linkProps: { href: '/bases' } }]}
      />
      <h1>{base.title}</h1>
    </>
  )
}

export default BasePage
