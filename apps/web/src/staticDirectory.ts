import path from 'node:path'
import { getDirname } from '@app/config/dirname'

// XXX We need to find a more robust way to do this
export const staticDirectory = () => {
  console.log('STATIC DIR DIRNAME', getDirname(import.meta.url))
  console.log('STATIC DIR CWD', process.cwd())

  // For local and e2e execution environments
  const cwd = process.cwd()
  if (cwd.includes('apps/web')) {
    return path.resolve(cwd.split('apps/web')[0], 'apps/web/private-static')
  }
  return path.resolve(cwd, './private-static')
}

export const staticFile = (filename: string) =>
  path.resolve(staticDirectory(), filename)
