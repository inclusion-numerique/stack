import React, { PropsWithChildren } from 'react'
import PrivateBox from '@app/web/components/PrivateBox'
import { BaseRouteParams } from '@app/web/app/(public)/bases/[slug]/baseRouteParams'
import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'
import Header from '@app/web/components/Base/Header'
import Menu from '@app/web/components/Base/Menu'

const BaseLayout = async ({
  params,
  children,
}: PropsWithChildren<BaseRouteParams>) => {
  const { user, authorizations } = await getBasePageContext(params.slug)

  if (!authorizations.authorized) {
    return (
      <>
        <Header
          base={authorizations.base}
          isMember={authorizations.isMember}
          user={user}
        />
        <PrivateBox type="Base" />
      </>
    )
  }
  return (
    <>
      <Header
        base={authorizations.base}
        isMember={authorizations.isMember}
        user={user}
      />
      <Menu base={authorizations.base} />
      <div className="fr-container fr-container--medium fr-mb-50v">
        {children}
      </div>
    </>
  )
}

export default BaseLayout
