import z, { RefinementCtx } from 'zod'

const errorFor = (path: string) => ({
  code: z.ZodIssueCode.custom,
  message: 'À renseigner',
  path: [path],
})

const checkIsOpen = (
  {
    isOpen,
    startTime,
    endTime,
  }: { isOpen: boolean; startTime?: string; endTime?: string },
  context: RefinementCtx,
) => {
  if (!isOpen) return
  if (!startTime) context.addIssue(errorFor('startTime'))
  if (!endTime) context.addIssue(errorFor('endTime'))
}

const OpeningHoursDayValidation = z.object({
  am: z
    .object({
      startTime: z.string().optional(),
      endTime: z.string().optional(),
      isOpen: z.boolean(),
    })
    .superRefine(checkIsOpen),
  pm: z
    .object({
      startTime: z.string().optional(),
      endTime: z.string().optional(),
      isOpen: z.boolean(),
    })
    .superRefine(checkIsOpen),
})

export const OpeningHoursValidation = z.object({
  Mo: OpeningHoursDayValidation,
  Tu: OpeningHoursDayValidation,
  We: OpeningHoursDayValidation,
  Th: OpeningHoursDayValidation,
  Fr: OpeningHoursDayValidation,
  Sa: OpeningHoursDayValidation,
  Su: OpeningHoursDayValidation,
})

export type OpeningHoursData = z.infer<typeof OpeningHoursValidation>
