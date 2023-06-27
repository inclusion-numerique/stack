import React, { PropsWithChildren } from 'react'
import { notFound } from 'next/navigation'
import PublicFooter from '@app/web/app/(public)/PublicFooter'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Header from '@app/web/components/Header'
import { getDepartementGeoJson } from '@app/web/utils/map/departementGeoJson'

const PublicLayout = async ({
  children,
  params: { departementCode },
}: PropsWithChildren<{
  params: { departementCode: string }
}>) => {
  const user = await getSessionUser()
  const department = getDepartementGeoJson({ code: departementCode })
  if (!department) {
    notFound()
    return null
  }
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <Header
        user={user}
        prefet
        backLink={`Retour au tableau de bord ${department.name}`}
        backLinkHref={`/prefet/${department.code}`}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
      <PublicFooter />
    </div>
  )
}

export default PublicLayout
