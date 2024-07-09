import z from 'zod'
import { StructureCreationValidationWithSiret } from '@app/web/app/structure/StructureValidation'

export const RenseignerStructureEmployeuseValidation = z.object({
  userId: z.string().uuid(),
  structureEmployeuse: StructureCreationValidationWithSiret,
  conseillerNumeriqueId: z.string().nullish(),
})

export type RenseignerStructureEmployeuseData = z.infer<
  typeof RenseignerStructureEmployeuseValidation
>
