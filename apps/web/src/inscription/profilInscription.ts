import type { ProfilInscription } from '@prisma/client'
import { SessionUser } from '@app/web/auth/sessionUser'

export const profileInscriptionSlugs = {
  ConseillerNumerique: 'conseiller-numerique',
  Coordinateur: 'coordinateur',
  Mediateur: 'mediateur',
} as const satisfies { [key in ProfilInscription]: string }

export type ProfileInscriptionSlug =
  (typeof profileInscriptionSlugs)[ProfilInscription]

export const profileInscriptionFromSlug = {
  'conseiller-numerique': 'ConseillerNumerique',
  coordinateur: 'Coordinateur',
  mediateur: 'Mediateur',
} as const satisfies { [key in ProfileInscriptionSlug]: ProfilInscription }

export const profileInscriptionLabels: { [key in ProfilInscription]: string } =
  {
    ConseillerNumerique: 'Conseiller numérique',
    Coordinateur: 'Coordinateur',
    Mediateur: 'Médiateur numérique',
  }

export const computeUserProfile = (
  user: Pick<SessionUser, 'mediateur' | 'coordinateur'>,
): ProfilInscription => {
  if (user.coordinateur) {
    return 'Coordinateur'
  }

  if (user?.mediateur?.conseillerNumerique) {
    return 'ConseillerNumerique'
  }

  return 'Mediateur'
}
