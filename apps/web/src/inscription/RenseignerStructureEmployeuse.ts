import z from 'zod'
import { SiretStructureValidation } from '@app/web/app/structure/SiretStructure'
import { profileInscriptionFromSlug } from '@app/web/inscription/profilInscription'

export const RenseignerStructureEmployeuseValidation = z.object({
  userId: z.string().uuid(),
  profil: z.nativeEnum(profileInscriptionFromSlug),
  structureEmployeuse: SiretStructureValidation,
})

export type RenseignerStructureEmployeuseData = z.infer<
  typeof RenseignerStructureEmployeuseValidation
>
