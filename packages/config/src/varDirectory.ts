/* eslint unicorn/prevent-abbreviations: 0 */

import path from 'node:path'

export const varDirectory = path.resolve(__dirname, '../../../var')

export const varFile = (filename: string) =>
  path.resolve(varDirectory, filename)

export const cwdVarDirectory = path.resolve(process.cwd(), '../../var')

export const cwdVarFile = (filename: string) =>
  path.resolve(cwdVarDirectory, filename)
