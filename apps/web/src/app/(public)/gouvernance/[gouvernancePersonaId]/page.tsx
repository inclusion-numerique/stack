import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  GouvernancePersonaId,
  gouvernancePersonas,
} from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import GouvernancePersonaSignup from '@app/web/app/(public)/gouvernance/GouvernancePersonaSignup'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Participer à l’élaboration des feuilles de routes territoriales',
} satisfies Metadata

const CommuneGouvernanceSignupPage = ({
  params: { gouvernancePersonaId },
}: {
  params: { gouvernancePersonaId: GouvernancePersonaId }
}) => {
  if (!(gouvernancePersonaId in gouvernancePersonas)) {
    notFound()
  }
  return (
    <GouvernancePersonaSignup
      gouvernance={gouvernancePersonas[gouvernancePersonaId]}
    />
  )
}

export default CommuneGouvernanceSignupPage
