import z from 'zod'
import { profileInscriptionFromSlug } from '@app/web/inscription/profilInscription'
import { StructureCreationValidationWithSiret } from '@app/web/app/structure/StructureValidation'

export const RenseignerStructureEmployeuseValidation = z.object({
  userId: z.string().uuid(),
  profil: z.nativeEnum(profileInscriptionFromSlug),
  structureEmployeuse: StructureCreationValidationWithSiret,
  conseillerNumeriqueId: z.string().nullish(),
})

export type RenseignerStructureEmployeuseData = z.infer<
  typeof RenseignerStructureEmployeuseValidation
>
