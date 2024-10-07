import path from 'node:path'

// XXX We need to find a more robust way to do this, cwd seems fragile
export const staticDirectory = () => {
  // Static directory will depend on cwd as import.meta.url is resolved during build
  const cwd = process.cwd()
  if (cwd.includes('apps/web')) {
    return path.resolve(cwd.split('apps/web')[0], 'apps/web/private-static')
  }
  return path.resolve(cwd, './private-static')
}

export const staticFile = (filename: string) =>
  path.resolve(staticDirectory(), filename)
