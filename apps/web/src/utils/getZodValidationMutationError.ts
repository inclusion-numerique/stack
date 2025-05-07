import { TRPCClientError } from '@trpc/client'

export const getZodValidationMutationError = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) {
    return
  }

  if (
    !('data' in error) ||
    !error.data ||
    error.data.code !== 'BAD_REQUEST' ||
    error.data.httpStatus !== 400
  ) {
    return
  }

  try {
    const parsedMessage = JSON.parse(error.message) as {
      code: string
      message: string
      path: string[]
    }[]

    if (!Array.isArray(parsedMessage)) {
      return
    }

    return parsedMessage
  } catch {
    // Message is not valid json, this is not a zod error
  }
}
