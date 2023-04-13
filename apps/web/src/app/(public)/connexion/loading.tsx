import { Spinner } from '@stack/web/ui/Spinner'
import { Breadcrumbs } from '@stack/web/components/Breadcrumbs'
import { AuthCard } from '@stack/web/app/(public)/connexion/AuthCard'

const AuthLoading = () => (
    <>
      <Breadcrumbs currentPage="Connexion" />
      <AuthCard>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            minHeight: 320,
            flex: 1,
          }}
        >
          <Spinner />
        </div>
      </AuthCard>
    </>
  )

export default AuthLoading
