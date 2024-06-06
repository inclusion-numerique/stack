import z from 'zod'

export const StructureEmployeuseLieuActiviteValidation = z.object({
  userId: z.string().uuid(),
  structureEmployeuseId: z.string().uuid(),
  estLieuActivite: z.boolean(),
})

export type StructureEmployeuseLieuActiviteData = z.infer<
  typeof StructureEmployeuseLieuActiviteValidation
>
