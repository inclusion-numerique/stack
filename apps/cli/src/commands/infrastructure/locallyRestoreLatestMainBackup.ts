// eslint-disable-next-line unicorn/prevent-abbreviations
import { promisify } from 'node:util'
import { exec as callbackExec } from 'node:child_process'
import { resolve as pathResolve } from 'node:path'
import { createWriteStream } from 'node:fs'
import { Command } from '@commander-js/extra-typings'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { varDirectory } from '@app/config/varDirectory'
import { createVarDirectory } from '@app/config/createVarDirectory'
import { output } from '@app/cli/output'

const exec = promisify(callbackExec)

const mainBackupFile = pathResolve(
  varDirectory,
  `${process.env.BACKUP_DATABASE_NAME}_backup.dump.sql`,
)

type ScalewayDatabaseBackup = {
  id: string
  instance_id: string
  database_name: string
  name: string
  status:
    | 'unknown'
    | 'creating'
    | 'ready'
    | 'restoring'
    | 'deleting'
    | 'error'
    | 'exporting'
    | 'locked'
  size: number
  expires_at: string
  created_at: string
  updated_at: string
  instance_name: string
  download_url: string | null
  download_url_expires_at: string | null
  same_region: boolean
  region: string
}

export const locallyRestoreLatestMainBackup = new Command(
  'backup:locally-restore-latest-main',
)
  .description(
    'Restore the latest main backup from Scaleway to the local (DATABASE_URL env var) database ',
  )
  .action(async () => {
    const databaseInstanceId = process.env.DATABASE_INSTANCE_ID ?? ''
    const backupDatabaseName = process.env.BACKUP_DATABASE_NAME ?? ''
    const secretKey = process.env.SCW_SECRET_KEY ?? ''
    const databaseUrl = process.env.DATABASE_URL ?? ''
    const databaseUrlObject = new URL(databaseUrl ?? '')
    const user = databaseUrlObject.username
    const database = databaseUrlObject.pathname.split('/')[1]
    const host = databaseUrlObject.hostname

    const variables = {
      databaseInstanceId,
      backupDatabaseName,
      secretKey,
      databaseUrl,
      user,
      database,
      host,
    }

    // Check that all above variables are not empty
    for (const [key, value] of Object.entries(variables)) {
      if (!value) {
        throw new Error(`Missing env var ${key}`)
      }
    }

    // Replace database (path) with "postgres" for connecting to the postgres database and execute admin commands
    const posgresDatabaseUrl = new URL(databaseUrl)
    posgresDatabaseUrl.pathname = '/postgres'

    const client = axios.create({
      baseURL: 'https://api.scaleway.com/rdb/v1/regions/fr-par',
      headers: {
        'X-Auth-Token': process.env.SCW_SECRET_KEY,
      },
    })
    axiosRetry(client, {
      retries: 3,
      retryDelay: (retryCount) => retryCount * 3000,
    })

    output('Listing backups')
    const backups = await client.get<{
      database_backups: ScalewayDatabaseBackup[]
    }>('/backups', {
      params: {
        order_by: 'created_at_desc',
        page_size: 5,
        instance_id: databaseInstanceId,
        database_name: backupDatabaseName,
      },
    })

    if (backups.data.database_backups.length === 0) {
      throw new Error('No backups found')
    }
    const elligibleBackups = backups.data.database_backups.filter(
      ({ status }) => status === 'ready' || status === 'exporting',
    )

    if (elligibleBackups.length === 0) {
      throw new Error('Invalid status for all backups')
    }

    let latestBackup = elligibleBackups[0]

    output(
      `Found latest backup : ${latestBackup.name} - ${latestBackup.created_at}`,
    )

    if (latestBackup.download_url) {
      output('Backup already exported')
    } else {
      output('Exporting backup')
      // It takes some time, status should be 'exporting' for a while
      const exportResponse = await client.post<ScalewayDatabaseBackup>(
        `/backups/${latestBackup.id}/export`,
      )

      latestBackup = exportResponse.data
    }

    let waitCount = 0
    while (!latestBackup.download_url) {
      if (waitCount > 10) {
        throw new Error('Timeout waiting for backup export')
      }
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => {
        setTimeout(resolve, 3000)
      })
      // eslint-disable-next-line no-await-in-loop
      const statusResponse = await client.get<ScalewayDatabaseBackup>(
        `/backups/${latestBackup.id}`,
      )
      latestBackup = statusResponse.data
      waitCount += 1
    }

    if (!latestBackup.download_url) {
      throw new Error('No download url available')
    }

    output(`Backup is ready for download at ${latestBackup.download_url}`)
    output(`Downloading backup to ${mainBackupFile}`)

    createVarDirectory()

    const downloadResponse = await axios.get<NodeJS.ReadableStream>(
      latestBackup.download_url,
      {
        // Downloading as stream to keep encoding of pgdump file (binary) and avoid memory issues
        responseType: 'stream',
      },
    )

    const writeStream = createWriteStream(mainBackupFile)

    downloadResponse.data.pipe(writeStream)

    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve)
      writeStream.on('error', reject)
    })

    output('Closing connections to database')

    await exec(
      `psql ${posgresDatabaseUrl.toString()} -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '${database}' AND pid <> pg_backend_pid();"`,
    )

    output('Dropping and recreating database')

    await exec(
      `psql ${posgresDatabaseUrl.toString()} -c 'DROP DATABASE IF EXISTS "${database}";'`,
    )

    await exec(
      `psql ${posgresDatabaseUrl.toString()} -c 'CREATE DATABASE "${database}";'`,
    )

    output('Restoring database from backup file')
    await exec(
      `pg_restore --no-owner --no-acl -d ${databaseUrl} < ${mainBackupFile}`,
      {
        maxBuffer: 5 * 1024 * 1024,
      },
    )

    output(`Granting all privileges to "${user}" role`)
    await exec(
      `psql ${posgresDatabaseUrl.toString()} -c 'GRANT ALL PRIVILEGES ON DATABASE "${database}" TO "${user}";'`,
    )

    output(`Restoring database to ${host}/${database} for "${user}" role`)
  })
