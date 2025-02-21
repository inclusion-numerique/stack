import { profileInscriptionValues } from '@app/web/inscription/profilInscription'
import z from 'zod'

export const ChoisirProfilEtAccepterCguValidation = z.object({
  userId: z.string().uuid(),
  profil: z.enum(profileInscriptionValues, {
    required_error: 'Veuillez choisir un poste',
  }),
  cguAcceptee: z
    .boolean()
    .default(false)
    .refine((data) => !!data, {
      message:
        'Pour continuer, vous devez accepter les conditions générales d’utilisation',
    }),
})

export type ChoisirProfilEtAccepterCguData = z.infer<
  typeof ChoisirProfilEtAccepterCguValidation
>
