import React, { PropsWithChildren } from 'react'
import PrivateBox from '@app/web/components/PrivateBox'
import { BaseRouteParams } from '@app/web/app/(public)/bases/[slug]/baseRouteParams'
import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'
import BaseHeader from '@app/web/components/Base/BaseHeader'
import BaseMenu from '@app/web/components/Base/BaseMenu'

const BaseLayout = async ({
  params,
  children,
}: PropsWithChildren<BaseRouteParams>) => {
  const { user, authorizations } = await getBasePageContext(params.slug)

  if (!authorizations.authorized) {
    return (
      <>
        <BaseHeader
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
      <BaseHeader
        base={authorizations.base}
        isMember={authorizations.isMember}
        user={user}
      />
      <BaseMenu base={authorizations.base} />
      <div className="fr-container fr-container--medium fr-mb-50v">
        {children}
      </div>
    </>
  )
}

export default BaseLayout
