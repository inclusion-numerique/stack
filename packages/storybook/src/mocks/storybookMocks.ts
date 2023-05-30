import * as externalImageLoaderModule from '@app/web/utils/externalImageLoader'

const mockModule = <T, E extends keyof T>(
  module: T,
  element: E,
  value: T[E],
) => {
  Object.defineProperty(module, element, {
    configurable: true,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    value,
  })
}

export const setupMocks = () => {
  mockModule(
    externalImageLoaderModule,
    'externalImageLoader',
    ({ src }: { src: string }) => src,
  )
}
