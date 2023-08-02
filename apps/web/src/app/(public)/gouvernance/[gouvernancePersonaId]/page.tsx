import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  GouvernancePersonaId,
  gouvernancePersonas,
} from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import GouvernancePersonaSignup from '@app/web/app/(public)/gouvernance/GouvernancePersonaSignup'

export const revalidate = 0

export const generateMetadata = ({
  params: { gouvernancePersonaId },
}: {
  params: { gouvernancePersonaId: GouvernancePersonaId }
}): Metadata => {
  if (!(gouvernancePersonaId in gouvernancePersonas)) {
    notFound()
    return {}
  }
  return {
    title: gouvernancePersonas[gouvernancePersonaId].title,
  }
}

const CommuneGouvernanceSignupPage = ({
  params: { gouvernancePersonaId },
}: {
  params: { gouvernancePersonaId: GouvernancePersonaId }
}) => (
  <GouvernancePersonaSignup
    gouvernance={gouvernancePersonas[gouvernancePersonaId]}
  />
)

export default CommuneGouvernanceSignupPage
