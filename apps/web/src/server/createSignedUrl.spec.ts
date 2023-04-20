import { resolve } from 'node:path'
import axios from 'axios'
import { ServerWebAppConfig } from '@app/web/webAppConfig'
import {
  createSignedGetUrl,
  createSignedUploadUrl,
} from '@app/web/server/createSignedUrl'
import { createReadStream } from 'node:fs'

describe.skip('createSignedUrl', () => {
  describe('createSignedGetUrl', () => {
    it('can createSignedUrl', async () => {
      const key = 'test/small-test-image.png'

      const { url } = await createSignedGetUrl({
        key,
        bucket: ServerWebAppConfig.S3.documentsBucket,
      })

      expect(url).toBeString()
      expect(url).toStartWith('https://')
      expect(url).toInclude('test/small-test-image.png')
      expect(url).toInclude(ServerWebAppConfig.S3.documentsBucket)
      expect(url).toInclude(key)

      // Try with system lib, should always work if url is correct
      const { status } = await axios.get(url)
      expect(status).toEqual(200)
    }, 30_000)
  })

  describe('createSignedUploadUrl', () => {
    it('canCreateSignedUrl', async () => {
      const fileName = '2022-11-test.png'
      const type = 'image/png'
      const filePath = resolve(__dirname, '../../test/small-test-image.png')

      const { url, key } = await createSignedUploadUrl({
        directory: `test/${Date.now()}`,
        bucket: ServerWebAppConfig.S3.documentsBucket,
        name: fileName,
        type,
      })

      expect(key).toBeString()
      expect(key).toInclude(fileName)
      expect(url).toBeString()
      expect(url).toStartWith('https://')
      expect(url).toInclude(ServerWebAppConfig.S3.documentsBucket)
      expect(url).toInclude(fileName)

      const { status } = await axios.put(url, {
        data: createReadStream(filePath),
      })
      expect(status).toEqual(200)
    }, 30_000)
  })
})
