import React from 'react'
import Members from '@app/web/components/Base/Members/Members'
import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'

const BaseMembersPage = async ({ params }: { params: { slug: string } }) => {
  const { authorizations, base } = await getBasePageContext(params.slug)

  return (
    <Members
      base={base}
      isMember={authorizations.isMember}
      isAdmin={authorizations.isAdmin}
    />
  )
}

export default BaseMembersPage
