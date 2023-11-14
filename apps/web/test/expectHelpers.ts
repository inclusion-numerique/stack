/**
 * Used for @typescript-eslint/no-unsafe-assignment errors when using jest matchers in test files
 */
import { uuidRegex } from '../src/utils/uuidRegex'

export const expectDate = expect.any(Date) as Date
export const expectUuid = expect.stringMatching(uuidRegex) as string
