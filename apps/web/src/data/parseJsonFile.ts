import { readFile } from 'node:fs/promises'

export const parseJsonFile = async <T>(file: string): Promise<T> => {
  const data = await readFile(file, 'utf8')
  return JSON.parse(data) as T
}
