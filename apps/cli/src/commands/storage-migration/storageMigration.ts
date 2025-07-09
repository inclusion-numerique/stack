import { output } from '@app/cli/output'
import { projectTitle } from '@app/config/config'
import { listStorageItems } from '@app/web/features/uploads/migration/listStorageItems'
import { migrateStorageFile } from '@app/web/features/uploads/migration/migrateStorageFile'
import {
  beforeLegacyBucket,
  beforeMainBucket,
} from '@app/web/features/uploads/migration/storageMigrationBuckets'
import { Command } from '@commander-js/extra-typings'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { chunk } from 'lodash-es'

export const migrateStorage = new Command()
  .command('storage-migration:migrate')
  .action(async () => {
    const allItems = await listStorageItems()

    output(`Already migrated: ${allItems.afterItems.items.length}`)
    output(`Legacy items total: ${allItems.legacyItems.items.length}`)
    output(
      `-> Legacy items to migrate: ${allItems.legacyItemsToMigrate.length}`,
    )
    output(`Main items total: ${allItems.mainItems.items.length}`)
    output(`-> Main items to migrate: ${allItems.mainItemsToMigrate.length}`)

    const testRunMain = allItems.mainItemsToMigrate.slice(0, 3)

    const chunkSize = 10

    // First we migrate legacy items
    const legacyItemsChunks = chunk(allItems.legacyItemsToMigrate, chunkSize)
    for (const itemsChunkIndex in legacyItemsChunks) {
      const items = legacyItemsChunks[itemsChunkIndex]
      await Promise.all(
        items.map(async (item, itemIndex) => {
          await migrateStorageFile({
            beforeBucket: beforeLegacyBucket,
            before: item.item.Key,
            after: item.afterKey,
          })
          output(
            `legacy ${
              Number.parseInt(itemsChunkIndex, 10) * chunkSize + itemIndex + 1
            }/${allItems.legacyItemsToMigrate.length} migrated ${item.item.Key} to ${item.afterKey}`,
          )
        }),
      )
    }

    for (const item of testRunMain) {
      await migrateStorageFile({
        beforeBucket: beforeMainBucket,
        before: item.item.Key,
        after: item.afterKey,
      })
      output(`migrated ${item.item.Key} to ${item.afterKey}`)
    }
  })
