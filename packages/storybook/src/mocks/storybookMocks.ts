import * as externalImageLoaderModule from '@app/web/utils/externalImageLoader'
import * as uploadedImageLoader from '@app/web/utils/uploadedImageLoader'
import { uploadedImageLoaderMock } from '@app/storybook/mocks/uploadedImageLoaderMock'
import { externalImageLoaderMock } from '@app/storybook/mocks/externalImageLoaderMock'

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
    externalImageLoaderMock,
  )
  mockModule(
    uploadedImageLoader,
    'uploadedImageLoader',
    uploadedImageLoaderMock,
  )
}
