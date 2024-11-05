import { SessionUser } from '@app/web/auth/sessionUser'

export const isUserInscriptionEnCours = (user?: {
  role: SessionUser['role']
  inscriptionValidee: string | Date | null
}) => {
  if (!user) {
    return false
  }
  const { role, inscriptionValidee } = user

  return !inscriptionValidee && role !== 'Admin' && role !== 'Support'
}
