import { getServerUrl } from '@app/web/utils/baseUrl'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import { Breadcrumbs } from '@app/web/components/Breadcrumbs'
import { SigninPanel } from '@app/web/app/(public)/(authentication)/connexion/SigninPanel'

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
