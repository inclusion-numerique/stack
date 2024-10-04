import path from 'node:path'
import { getDirname } from '@app/config/dirname'

export const staticDirectory = () => {
  let dirname = getDirname(import.meta.url)
  console.log(dirname)
  console.log('CWD', process.cwd())
  // TODO Different execution environments built / dev / e2e do not have the same dirname relative to staticDirectory

  if (dirname.includes('apps/web')) {
    const root = dirname.split('apps/web')[0]
    dirname = path.resolve(root, 'apps/web/src')
    console.log('APPS WEB dir', dirname)
  }

  return path.resolve(dirname, '../private-static')
}

export const staticFile = (filename: string) =>
  path.resolve(staticDirectory(), filename)
