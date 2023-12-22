const { resolve } = require('node:path')

const storybookMocksDirectory = resolve(__dirname, '../src/mocks')
const mockable = [
  '@app/web/utils/externalImageLoader',
  '@app/web/utils/uploadedImageLoader',
]

module.exports = async ({ config }) => {
  for (const mockableImport of mockable) {
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias[mockableImport] =
      `${storybookMocksDirectory}/emptyMock`
  }
  return config
}
