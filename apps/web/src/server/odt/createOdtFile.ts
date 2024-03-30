import { AsyncZippable, strToU8, zip } from 'fflate'
import {
  manifestRdf,
  MetaInfManifestXml,
  metaXml,
  mimeType,
} from '@app/web/server/odt/template/template'

export const createOdtFile = async ({
  content,
  styles,
  manifest,
  meta,
  pictures,
}: {
  content: string
  styles: string
  manifest?: string
  meta?: string
  pictures: { name: string; data: Buffer }[]
}): Promise<Buffer> => {
  // Create a ZipObj for fflate
  const zipObject: AsyncZippable = {
    'META-INF/manifest.xml': strToU8(manifest ?? MetaInfManifestXml),
    'manifest.rdf': strToU8(manifestRdf),
    'meta.xml': strToU8(meta ?? metaXml),
    mimetype: strToU8(mimeType),
    'styles.xml': strToU8(styles),
    'content.xml': strToU8(content),
  }

  for (const { name, data } of pictures) {
    zipObject[`Pictures/${name}`] = data
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
