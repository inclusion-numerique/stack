import { redirect } from 'next/navigation'
import { getSessionUser } from '@stack/web/auth/getSessionUser'
import { Breadcrumbs } from '@stack/web/components/Breadcrumbs'
import { getServerUrl } from '@stack/web/utils/baseUrl'
import { Verify } from '@stack/web/app/(public)/connexion/verification/Verify'

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
