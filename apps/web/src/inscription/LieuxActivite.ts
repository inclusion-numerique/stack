import z from 'zod'
import { CartoNationaleStructureValidation } from '@app/web/app/structure/CartoNationaleStructure'

export const LieuxActiviteValidation = z.object({
  userId: z.string().uuid(),
  lieuxActivite: z
    .array(CartoNationaleStructureValidation, {
      required_error: 'Veuillez renseigner au moins un lieu d’activité',
    })
    .min(1, 'Veuillez renseigner au moins un lieu d’activité'),
  // Helper field only used in client form
  addLieuActiviteCartographieNationaleId: z.string().nullish(),
})

export type LieuxActiviteData = z.infer<typeof LieuxActiviteValidation>
