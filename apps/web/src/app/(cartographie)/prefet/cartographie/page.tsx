import { redirect } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Cartographie from '@app/web/components/Prefet/Cartographie/Page'

const Page = async () => {
  const user = await getSessionUser()
  if (!user) {
    redirect('/connexion?suivant=/prefet')
  }

  return <Cartographie user={user} />
}

export default Page
