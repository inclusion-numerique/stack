import z from 'zod'

export const VisiblePourCartographieNationaleShape = {
  visiblePourCartographieNationale: z.boolean().default(false),
}

export const VisiblePourCartographieNationaleValidation = z.object({
  id: z.string().uuid(),
  ...VisiblePourCartographieNationaleShape,
})

export type VisiblePourCartographieNationaleData = z.infer<
  typeof VisiblePourCartographieNationaleValidation
>
