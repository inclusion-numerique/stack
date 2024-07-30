import 'jest'
import 'jest-extended'
import 'jest-extended/all'
import path from 'node:path'
import { TextDecoder, TextEncoder } from 'node:util'
import * as dotenv from 'dotenv'
import '@testing-library/jest-dom'

dotenv.config({
  // eslint-disable-next-line unicorn/prefer-module
  path: path.resolve(__dirname, '../.env'),
})

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as never
