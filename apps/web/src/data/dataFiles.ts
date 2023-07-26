import { resolve } from 'node:path'

const webApplicationRoot = () => {
  const cwd = process.cwd()

  if (cwd.endsWith('apps/web')) {
    return cwd
  }

  return resolve(cwd, 'apps/web')
}

export const getDataFilePath = (fileName: string) =>
  resolve(webApplicationRoot(), 'public/data', fileName)
