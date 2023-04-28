import { Spinner } from '@app/web/ui/Spinner'
import { Breadcrumbs } from '@app/web/components/Breadcrumbs'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'

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
