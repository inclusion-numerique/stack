import path from 'node:path'
import { getDirname } from '@app/config/dirname'

export const staticDirectory = path.resolve(
  getDirname(import.meta.url),
  '../static',
)

export const staticFile = (filename: string) =>
  path.resolve(staticDirectory, filename)
