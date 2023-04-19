import { Spinner } from '@lb/web/ui/Spinner'
import { Breadcrumbs } from '@lb/web/components/Breadcrumbs'
import { AuthCard } from '@lb/web/app/(public)/connexion/AuthCard'

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
