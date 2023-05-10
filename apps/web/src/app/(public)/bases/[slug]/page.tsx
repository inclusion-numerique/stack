import { notFound } from 'next/navigation'
import React from 'react'
import { basePageQuery } from '@app/web/app/(public)/bases/[slug]/basePageQuery'
import Breadcrumbs from '@app/web/components/Breadcrumbs'

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
