import type { ZodType } from 'zod'
import type { infer as zodInfer } from 'zod/lib/types'

export type ZodFunctionOptions<Parameters extends ZodType, Result = unknown> = {
  name: string
  parameters: Parameters
  function?: (args: zodInfer<Parameters>) => Result | Promise<Result>
  description?: string | undefined
}
