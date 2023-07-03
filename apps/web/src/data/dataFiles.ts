import { resolve } from 'node:path'
import process from 'node:process'

export const getDataFilePath = (fileName: string) =>
  resolve(process.cwd(), 'public/data', fileName)
