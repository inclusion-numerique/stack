import { getServerUrl } from '@lb/web/utils/baseUrl'
import { getSessionUser } from '@lb/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import { Breadcrumbs } from '@lb/web/components/Breadcrumbs'
import { SigninPanel } from '@lb/web/app/(public)/connexion/login/SigninPanel'

const SigninPage = async ({
  searchParams: { error } = {},
}: {
  searchParams?: { error?: string }
}) => {
  const user = await getSessionUser()
  if (user) {
    redirect(getServerUrl('/'))
  }

  return (
    <>
      <Breadcrumbs currentPage="Connexion" />
      <SigninPanel error={error} />
    </>
  )
}

export default SigninPage
