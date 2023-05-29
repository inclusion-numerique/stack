import 'jest'
import 'jest-extended'
import 'jest-extended/all'
import { resolve } from 'node:path'
import { TextDecoder, TextEncoder } from 'node:util'
import * as dotenv from 'dotenv'
import '@testing-library/jest-dom/extend-expect'

dotenv.config({
  // eslint-disable-next-line unicorn/prefer-module
  path: resolve(__dirname, '../.env'),
})

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as never
