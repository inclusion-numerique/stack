import z from 'zod'

import { SiretInfoValidation } from '@app/web/siret/siretValidation'

export const StructureValidation = z.object({
  siret: SiretInfoValidation,
})

export type StructureData = z.infer<typeof StructureValidation>
