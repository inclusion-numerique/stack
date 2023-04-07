import { getServerUrl } from '@stack/web/utils/baseUrl'
import { getSessionUser } from '@stack/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import { Breadcrumbs } from '@stack/web/components/Breadcrumbs'
import { SigninPanel } from '@stack/web/app/(public)/connexion/login/SigninPanel'

const SigninPage = async ({
  searchParams: { error } = {},
}: {
  searchParams?: { error?: string }
}) => {
  const user = await getSessionUser()
  if (user) {
    redirect(getServerUrl('/'))
    return
  }

  return (
    <>
      <Breadcrumbs currentPage="Connexion" />
      <SigninPanel error={error} />
    </>
  )
}

export default SigninPage
