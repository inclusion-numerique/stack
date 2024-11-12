import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { OnboardingFranceNumeriqueEnsembleCoordinateur } from './OnboardingFranceNumeriqueEnsembleCoordinateur'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('En savoir plus - Mes activités'),
}

const Page = async () => {
  const user = await getAuthenticatedSessionUser()

  return user.mediateur ? (
    <OnboardingFranceNumeriqueEnsembleCoordinateur
      isConseillerNumerique={user.mediateur.conseillerNumerique?.id != null}
    />
  ) : (
    redirect('/')
  )
}

export default Page
