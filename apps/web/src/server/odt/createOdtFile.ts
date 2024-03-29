import { AsyncZippable, strToU8, zip } from 'fflate'
import {
  contentXml,
  manifestRdf,
  MetaInfManifestXml,
  metaXml,
  mimeType,
  settingsXml,
  stylesXml,
} from '@app/web/server/odt/template/template'

export const createOdtFile = async ({
  children,
}: {
  children: string
}): Promise<Buffer> => {
  // ODT files have a predefined structure
  // const contentXml = createOdtContent(children)
  console.log('CHILDREN', children)

  // Create a ZipObj for fflate
  const zipObject: AsyncZippable = {
    'META-INF/manifest.xml': strToU8(MetaInfManifestXml),
    'manifest.rdf': strToU8(manifestRdf),
    'meta.xml': strToU8(metaXml),
    mimetype: strToU8(mimeType),
    'settings.xml': strToU8(settingsXml),
    'styles.xml': strToU8(stylesXml),
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
