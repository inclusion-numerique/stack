import React from 'react'
import BaseMembers from '@app/web/components/Base/Members/BaseMembers'
import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'

const BaseMembersPage = async ({ params }: { params: { slug: string } }) => {
  const { authorizations, base } = await getBasePageContext(params.slug)

  return (
    <BaseMembers
      base={base}
      isMember={authorizations.isMember}
      isAdmin={authorizations.isAdmin}
    />
  )
}

export default BaseMembersPage
