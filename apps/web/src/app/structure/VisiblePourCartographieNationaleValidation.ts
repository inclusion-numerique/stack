import z from 'zod'

export const VisiblePourCartographieNationaleValidation = z.object({
  id: z.string().uuid(),
  visiblePourCartographieNationale: z.boolean().default(false),
})

export type VisiblePourCartographieNationaleData = z.infer<
  typeof VisiblePourCartographieNationaleValidation
>
