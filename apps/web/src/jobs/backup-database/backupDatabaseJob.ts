import z from 'zod'

export const BackupDatabaseJobValidation = z.object({
  name: z.literal('backup-database'),
  payload: z.object({
    databaseName: z.string(),
    type: z.enum(['weekly', 'daily', 'hourly']),
  }),
})

export type BackupDatabaseJob = z.infer<typeof BackupDatabaseJobValidation>
