import z from 'zod'

export const VisiblePourCartographieNationaleCommandValidation = z.object({
  visiblePourCartographieNationale: z.boolean().default(false),
})

export type VisiblePourCartographieNationaleData = z.infer<
  typeof VisiblePourCartographieNationaleCommandValidation
>
