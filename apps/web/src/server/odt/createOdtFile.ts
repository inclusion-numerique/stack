import { strToU8, zip, AsyncZippable } from 'fflate'
import { createOdtContent } from '@app/web/server/odt/createOdtContent'

export const createOdtFile = async ({
  children,
}: {
  children: string
}): Promise<Buffer> => {
  // ODT files have a predefined structure
  const contentXml = createOdtContent(children)

  // Create a ZipObj for fflate
  const zipObject: AsyncZippable = {
    'content.xml': strToU8(contentXml),
  }

  return new Promise((resolve, reject) => {
    zip(zipObject, (error, zippedData) => {
      if (error) {
        return reject(error)
      }
      resolve(Buffer.from(zippedData))
    })
  })
}
