import { output } from '@app/cli/output'
import { projectTitle } from '@app/config/config'
import { listStorageItems } from '@app/web/features/uploads/migration/listStorageItems'
import { migrateStorageFile } from '@app/web/features/uploads/migration/migrateStorageFile'
import {
  afterBucket,
  beforeMainBucket,
} from '@app/web/features/uploads/migration/storageMigrationBuckets'
import { s3 } from '@app/web/server/s3/s3'
import { CopyObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { Command } from '@commander-js/extra-typings'
import axios from 'axios'
import axiosRetry from 'axios-retry'

const copyFromBucketSame = afterBucket
const copyFromBucketDifferent = 'la-base-developer-unsafe-uploads'
const copyFromKey = 'delete-this.png'
const copyToBucket = afterBucket
const copyToKey = 'delete-this-copy.png'

const migrationCopyBucket = beforeMainBucket
const migrationCopyKey =
  'user/010ba393-75bf-4627-ad2a-969ab9fc71d1/bZ_Hout6CvFwTOkUMIVdN_guide pratique du numérique pour ordinateur - débutant windows 11.pdf'
const migrationCopyAfterKey =
  'main/user/010ba393-75bf-4627-ad2a-969ab9fc71d1/bZ_Hout6CvFwTOkUMIVdN_guide pratique du numérique pour ordinateur - débutant windows 11.pdf'

export const migrateStorageDebug = new Command()
  .command('storage-migration:debug')
  .argument('<type>', 'debug type')
  .action(async (type: string) => {
    if (type === 'copy-same-bucket') {
      await s3.send(
        new CopyObjectCommand({
          Bucket: copyToBucket,
          Key: copyToKey,
          CopySource: `/${copyFromBucketSame}/${encodeURIComponent(copyFromKey)}`,
          MetadataDirective: 'COPY', // conserve ContentType + Metadata
          ACL: 'public-read',
        }),
      )
      output(
        `copied ${copyFromBucketSame}/${copyFromKey} to ${copyToBucket}/${copyToKey}`,
      )

      return
    }

    if (type === 'copy-different-bucket') {
      const result = await s3.send(
        new CopyObjectCommand({
          Bucket: copyToBucket,
          Key: copyToKey,
          CopySource: `/${copyFromBucketDifferent}/${encodeURIComponent(copyFromKey)}`,
          MetadataDirective: 'COPY', // conserve ContentType + Metadata
          ACL: 'public-read',
        }),
      )
      console.log('result', result)
      const copiedItemInfo = await s3.send(
        new HeadObjectCommand({
          Bucket: copyToBucket,
          Key: copyToKey,
        }),
      )
      console.log('copiedItemInfo', copiedItemInfo)
      output(
        `copied ${copyFromBucketDifferent}/${copyFromKey} to ${copyToBucket}/${copyToKey}`,
      )

      return
    }

    if (type === 'migrate-copy') {
      const result = await s3.send(
        new CopyObjectCommand({
          Bucket: afterBucket,
          Key: migrationCopyAfterKey,
          CopySource: `/${migrationCopyBucket}/${encodeURIComponent(migrationCopyKey)}`,
          MetadataDirective: 'COPY', // conserve ContentType + Metadata
          ACL: 'public-read',
        }),
      )
      console.log('result', result)
      const copiedItemInfo = await s3.send(
        new HeadObjectCommand({
          Bucket: afterBucket,
          Key: migrationCopyAfterKey,
        }),
      )
      console.log('copiedItemInfo', copiedItemInfo)
      output(
        `copied ${migrationCopyBucket}/${migrationCopyKey} to ${afterBucket}/${migrationCopyAfterKey}`,
      )

      return
    }

    if (type === 'list-with-details') {
      await listStorageItems()
      output(
        'Detailed listing completed. Check console output for ACL analysis.',
      )
      return
    }

    throw new Error(`Unknown or missing debug type: "${type}"`)
  })
