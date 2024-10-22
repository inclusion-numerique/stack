import { addMonths, addWeeks } from 'date-fns'
import { output } from '@app/web/jobs/output'
import type { ImportCrasConseillerNumeriqueV1Job } from '@app/web/jobs/import-cras-conseiller-numerique-v1/ImportCrasConseillerNumeriqueV1Job'
import {
  firstV1CrasMonth,
  importCrasConseillerNumeriqueV1,
} from '@app/web/external-apis/conseiller-numerique/importCrasConseillerNumeriqueV1'
import {
  assignConseillerNumeriqueV1CrasToConseillerNumerique,
  vacuumAnalyzeConseillerNumeriqueV1Cras,
} from '@app/web/external-apis/conseiller-numerique/conseillersNumeriquesCraQueries'

const createMonthsArrays = ({ from, until }: { from: Date; until: Date }) => {
  const firstMonth = new Date(from.getFullYear(), from.getMonth(), 1)
  const lastMonth = new Date(until.getFullYear(), until.getMonth(), 1)

  const monthsArray: Date[] = []

  let currentMonth = firstMonth
  while (currentMonth <= lastMonth) {
    monthsArray.push(currentMonth)
    currentMonth = addMonths(currentMonth, 1)
  }

  return monthsArray
}

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
  await assignConseillerNumeriqueV1CrasToConseillerNumerique()
  await vacuumAnalyzeConseillerNumeriqueV1Cras()
}

export const executeImportCrasConseillerNumeriqueV1 = async ({
  payload: { createdAtSince, conseillerNumeriqueId, createdAtUntil },
}: ImportCrasConseillerNumeriqueV1Job) => {
  output.log(`import-cras-conseiller-numerique-v1: importing`)

  // If there is a conseillerNumeriqueId, we import all related cras at once
  if (conseillerNumeriqueId) {
    const result = await importCrasConseillerNumeriqueV1({
      reset: true,
      conseillerNumeriqueId,
      createdAtSince: createdAtSince ? new Date(createdAtSince) : undefined,
      createdAtUntil: createdAtUntil ? new Date(createdAtUntil) : undefined,
    })
    output.log(
      `import-cras-conseiller-numerique-v1: imported all ${result.cras.length} cras for ${conseillerNumeriqueId}`,
    )
    await cleanupAfterImport()
    return result
  }

  // Else we need to import period by period to avoid memory issues

  const byMonths = false
  const byWeeks = true

  if (byMonths) {
    const months = createMonthsArrays({
      from: createdAtSince
        ? new Date(createdAtSince)
        : new Date(firstV1CrasMonth),
      until: createdAtUntil ? new Date(createdAtUntil) : new Date(),
    })

    const result = {}

    for (const month of months) {
      const batchSince = month
      const batchUntil = addMonths(month, 1)
      output.log(
        `import-cras-conseiller-numerique-v1: importing month ${batchSince.toISOString().slice(0, 10)}`,
      )
      // eslint-disable-next-line no-await-in-loop
      const monthResult = await importCrasConseillerNumeriqueV1({
        reset: true,
        conseillerNumeriqueId,
        createdAtSince: batchSince,
        createdAtUntil: batchUntil,
      })

      output.log(
        `import-cras-conseiller-numerique-v1: imported ${monthResult.empty ? 0 : monthResult.cras.length} cras in ${month.toISOString().slice(0, 7)}`,
      )
    }

    await cleanupAfterImport()
    return result
  }

  if (byWeeks) {
    const weeks = createWeeksArrays({
      from: createdAtSince
        ? new Date(createdAtSince)
        : new Date(firstV1CrasMonth),
      until: createdAtUntil ? new Date(createdAtUntil) : new Date(),
    })

    const result = {}

    for (const week of weeks) {
      const batchSince = week
      const batchUntil = addWeeks(week, 1)
      output.log(
        `import-cras-conseiller-numerique-v1: importing week ${batchSince.toISOString().slice(0, 10)}`,
      )
      // eslint-disable-next-line no-await-in-loop
      const weekResult = await importCrasConseillerNumeriqueV1({
        reset: true,
        conseillerNumeriqueId,
        createdAtSince: batchSince,
        createdAtUntil: batchUntil,
      })

      output.log(
        `import-cras-conseiller-numerique-v1: imported ${weekResult.empty ? 0 : weekResult.cras.length} cras in ${week.toISOString().slice(0, 10)}`,
      )
    }

    await cleanupAfterImport()

    return result
  }
}
