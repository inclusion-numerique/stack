import { addWeeks } from 'date-fns'
import * as Sentry from '@sentry/nextjs'
import { output } from '@app/web/jobs/output'
import type { ImportCrasConseillerNumeriqueV1Job } from '@app/web/jobs/import-cras-conseiller-numerique-v1/ImportCrasConseillerNumeriqueV1Job'
import {
  firstV1CrasMonth,
  importCrasConseillerNumeriqueV1,
} from '@app/web/external-apis/conseiller-numerique/importCrasConseillerNumeriqueV1'
import { vacuumAnalyzeConseillerNumeriqueV1Cras } from '@app/web/external-apis/conseiller-numerique/conseillersNumeriquesCraQueries'
import { prismaClient } from '@app/web/prismaClient'
import { dateAsDay } from '@app/web/utils/dateAsDay'

const createWeeksArrays = ({ from, until }: { from: Date; until: Date }) => {
  const firstWeek = new Date(
    from.getFullYear(),
    from.getMonth(),
    from.getDate(),
  )
  const lastWeek = new Date(
    until.getFullYear(),
    until.getMonth(),
    until.getDate(),
  )

  const weeksArray = []
  let currentWeek = firstWeek
  while (currentWeek <= lastWeek) {
    weeksArray.push(currentWeek)
    currentWeek = addWeeks(currentWeek, 1)
  }

  return weeksArray
}

const cleanupAfterImport = async () => {
  await vacuumAnalyzeConseillerNumeriqueV1Cras()
}

const importCrasConseillerNumeriqueV1ByWeeks = async () => {
  // Reset table
  await prismaClient.craConseillerNumeriqueV1.deleteMany({})

  const weeks = createWeeksArrays({
    from: firstV1CrasMonth,
    until: new Date(),
  })

  const result = {
    totalImported: 0,
    weeks: weeks.length,
    from: dateAsDay(firstV1CrasMonth),
    until: dateAsDay(new Date()),
  }

  for (const week of weeks) {
    const batchSince = week
    const batchUntil = addWeeks(week, 1)
    output.log(
      `import-cras-conseiller-numerique-v1: importing week ${batchSince.toISOString().slice(0, 10)}`,
    )
    // eslint-disable-next-line no-await-in-loop
    const weekResult = await importCrasConseillerNumeriqueV1({
      createdAtSince: batchSince,
      createdAtUntil: batchUntil,
    })

    result.totalImported += weekResult.created

    output.log(
      `import-cras-conseiller-numerique-v1: imported ${weekResult.empty ? 0 : weekResult.cras.length} cras in ${week.toISOString().slice(0, 10)}`,
    )
  }

  await cleanupAfterImport()

  output.log(
    `import-cras-conseiller-numerique-v1: finished importing ${result.totalImported} cras in ${result.weeks} weeks from ${result.from} to ${result.until}`,
  )

  return result
}

/**
 * Wrapper to launch the execution asynchronously
 */
export const executeImportCrasConseillerNumeriqueV1 = (
  _job: ImportCrasConseillerNumeriqueV1Job,
) => {
  output.log(`import-cras-conseiller-numerique-v1: importing`)

  // Async execution
  importCrasConseillerNumeriqueV1ByWeeks().catch((error) => {
    if (Sentry.captureException) {
      Sentry.captureException(error)
    }
    console.error(error)
  })

  return Promise.resolve({})
}
