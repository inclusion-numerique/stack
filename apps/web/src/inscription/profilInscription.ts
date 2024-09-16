import type { ProfilInscription } from '@prisma/client'
import { SessionUser } from '@app/web/auth/sessionUser'
import { labelsToOptions } from '@app/ui/components/Form/utils/options'

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
    Mediateur: 'Médiateur·rice numérique professionnel·le',
    ConseillerNumerique: 'Conseiller·ère numérique',
    Coordinateur: 'Coordinateur·rice de conseillers numériques',
  }

export const profileInscriptionValues = Object.keys(
  profileInscriptionLabels,
) as [ProfilInscription, ...ProfilInscription[]]

export const profileInscriptionOptions = labelsToOptions(
  profileInscriptionLabels,
)

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
