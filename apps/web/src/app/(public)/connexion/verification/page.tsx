import { redirect } from 'next/navigation'
import { getSessionUser } from '@lb/web/auth/getSessionUser'
import { Breadcrumbs } from '@lb/web/components/Breadcrumbs'
import { getServerUrl } from '@lb/web/utils/baseUrl'
import { Verify } from '@lb/web/app/(public)/connexion/verification/Verify'

const VerifyPage = async () => {
  const user = await getSessionUser()
  if (user) {
    redirect(getServerUrl('/'))
  }

  return (
    <>
      <Breadcrumbs currentPage="Connexion" />
      <Verify />
    </>
  )
}

export default VerifyPage
