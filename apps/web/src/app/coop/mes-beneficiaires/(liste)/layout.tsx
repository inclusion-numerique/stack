import type { PropsWithChildren } from 'react'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { prismaClient } from '@app/web/prismaClient'
import MesBeneficiairesListeLayout from '@app/web/app/coop/mes-beneficiaires/(liste)/MesBeneficiairesListeLayout'

const MesBeneficiairesLayout = async ({ children }: PropsWithChildren) => {
  const user = await getAuthenticatedMediateur()

  const beneficiairesCount = await prismaClient.beneficiaire.count({
    where: {
      mediateurId: user.mediateur.id,
      suppression: null,
    },
  })

  return (
    <MesBeneficiairesListeLayout beneficiairesCount={beneficiairesCount}>
      {children}
    </MesBeneficiairesListeLayout>
  )
}

export default MesBeneficiairesLayout
