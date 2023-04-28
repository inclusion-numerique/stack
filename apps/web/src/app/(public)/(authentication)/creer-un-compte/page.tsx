import { getServerUrl } from '@app/web/utils/baseUrl'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import { Breadcrumbs } from '@app/web/components/Breadcrumbs'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import { signinErrorMessage } from '@app/web/app/(public)/(authentication)/authenticationErrorMessage'

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
      <Breadcrumbs currentPage="Créer un compte" />
      <AuthCard>
        <h2>TODO</h2>
        {error ? (
          <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
            <p>{signinErrorMessage(error)}</p>
          </div>
        ) : null}
      </AuthCard>
    </>
  )
}

export default SigninPage
