import { s3 } from '@app/web/server/s3/s3'
import { afterBucket } from './storageMigrationBuckets'
import {
  CopyObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3'

export const migrateStorageFile = async ({
  beforeBucket,
  before,
  after,
}: {
  beforeBucket: string
  before: string
  after: string
}) => {
  const result = await s3.send(
    new CopyObjectCommand({
      Bucket: afterBucket,
      Key: after,
      CopySource: `/${beforeBucket}/${encodeURIComponent(before)}`,
      MetadataDirective: 'COPY', // conserve ContentType + Metadata
      ACL: 'public-read',
    }),
  )

  return result
}
