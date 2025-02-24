import { labelsToOptions } from '@app/ui/components/Form/utils/options'
import type { SessionUser } from '@app/web/auth/sessionUser'
import type { ProfilInscription } from '@prisma/client'

export const profileInscriptionSlugs = {
  ConseillerNumerique: 'conseiller-numerique',
  CoordinateurConseillerNumerique: 'coordinateur-conseiller-numerique',
  Mediateur: 'mediateur',
  Coordinateur: 'coordinateur',
} as const satisfies { [key in ProfilInscription]: string }

export type ProfileInscriptionSlug =
  (typeof profileInscriptionSlugs)[ProfilInscription]

export const profileInscriptionFromSlug = {
  'conseiller-numerique': 'ConseillerNumerique',
  'coordinateur-conseiller-numerique': 'CoordinateurConseillerNumerique',
  mediateur: 'Mediateur',
  coordinateur: 'Coordinateur',
} as const satisfies { [key in ProfileInscriptionSlug]: ProfilInscription }

export const profileInscriptionLabels = {
  Mediateur: 'Médiateur·rice numérique professionnel·le',
  Coordinateur: 'Coordinateur·rice',
}

export const profileInscriptionConseillerNumeriqueLabels = {
  ConseillerNumerique: 'Conseiller·ère numérique',
  CoordinateurConseillerNumerique:
    'Coordinateur·rice de conseillers numériques',
}

export const allProfileInscriptionLabels: {
  [key in ProfilInscription]: string
} = {
  ...profileInscriptionLabels,
  ...profileInscriptionConseillerNumeriqueLabels,
}

export const lowerCaseProfileInscriptionLabels: {
  [key in ProfilInscription]: string
} = Object.fromEntries(
  Object.entries(allProfileInscriptionLabels).map(([key, value]) => [
    key,
    value.toLowerCase(),
  ]),
) as {
  [key in ProfilInscription]: string
}

export const profileInscriptionValues = Object.keys({
  ...profileInscriptionLabels,
  ...profileInscriptionConseillerNumeriqueLabels,
}) as [ProfilInscription, ...ProfilInscription[]]

export const profileInscriptionIllustrations: {
  [key in ProfilInscription]: string
} = {
  Mediateur: '/images/iconographie/profil-mediateur.svg',
  Coordinateur: '/images/iconographie/profil-coordinateur.svg',
  ConseillerNumerique: '/images/iconographie/profil-conseiller-numerique.svg',
  CoordinateurConseillerNumerique:
    '/images/iconographie/profil-coordinateur-conseiller-numerique.svg',
}

export const profileInscriptionOptionsWithExtras = labelsToOptions(
  profileInscriptionLabels,
).map(({ label, value }) => ({
  label,
  value,
  extra: {
    illustration: profileInscriptionIllustrations[value],
  },
}))

export const profileInscriptionConseillerNumeriqueOptionsWithExtras =
  labelsToOptions(profileInscriptionConseillerNumeriqueLabels).map(
    ({ label, value }) => ({
      label,
      value,
      extra: {
        illustration: profileInscriptionIllustrations[value],
      },
    }),
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
