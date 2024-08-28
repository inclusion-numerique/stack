import React from 'react'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { Dashboard } from './Dashboard'

const Page = async () => {
  const user = await getAuthenticatedSessionUser()

  // return <Dashboard {...user} />
  return <></>
}

export default Page
