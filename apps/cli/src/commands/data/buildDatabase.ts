import { Command } from '@commander-js/extra-typings'
import { buildDatabase as executeBuildDatabase } from '@app/web/data/buildDatabase/buildDatabase'

export const buildDatabase = new Command()
  .command('data:build')
  .action(async () => {
    await executeBuildDatabase()
  })
