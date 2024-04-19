/* eslint unicorn/prevent-abbreviations: 0 */

import { resolve } from 'node:path'

export const varDirectory = resolve(__dirname, '../../../var')

export const varFile = (filename: string) => resolve(varDirectory, filename)

export const cwdVarDirectory = resolve(process.cwd(), '../../var')

export const cwdVarFile = (filename: string) =>
  resolve(cwdVarDirectory, filename)
