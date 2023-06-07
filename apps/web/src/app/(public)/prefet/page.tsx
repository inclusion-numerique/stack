import { redirect } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import PrefetPage from '@app/web/components/Prefet/Page'

const Page = async () => {
  const user = await getSessionUser()
  if (!user) {
    redirect('/connexion?suivant=/prefet')
  }

  return <PrefetPage user={user} />
}

export default Page
