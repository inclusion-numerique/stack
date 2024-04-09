import { existsSync, mkdirSync } from 'node:fs'
import { varDirectory } from './varDirectory'

/**
 * Creates project var directory if it doesn't exist
 */
// eslint-disable-next-line unicorn/prevent-abbreviations
export const createVarDirectory = (subPath?: string) => {
  const path = subPath ? `${varDirectory}${subPath}` : varDirectory

  // Check if the directory exists synchronously
  if (!existsSync(path)) {
    // If it doesn't exist, create it synchronously
    mkdirSync(path, { recursive: true })
  }
}
