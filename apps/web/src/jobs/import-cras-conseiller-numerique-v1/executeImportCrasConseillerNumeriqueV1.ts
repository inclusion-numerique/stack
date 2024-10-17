import { output } from '@app/web/jobs/output'
import type { ImportCrasConseillerNumeriqueV1Job } from '@app/web/jobs/import-cras-conseiller-numerique-v1/ImportCrasConseillerNumeriqueV1Job'
import {
  firstV1CrasMonth,
  importCrasConseillerNumeriqueV1,
} from '@app/web/external-apis/conseiller-numerique/importCrasConseillerNumeriqueV1'
import { addMonths } from 'date-fns'

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

export const executeImportCrasConseillerNumeriqueV1 = async ({
  payload: { createdAtSince, conseillerNumeriqueId, createdAtUntil },
}: ImportCrasConseillerNumeriqueV1Job) => {
  output.log(`import-cras-conseiller-numerique-v1: importing`)

  // If there is a conseillerNumeriqueId, we import all related cras at once
  if (conseillerNumeriqueId) {
    const result = await importCrasConseillerNumeriqueV1({
      conseillerNumeriqueId,
      createdAtSince: createdAtSince ? new Date(createdAtSince) : undefined,
      createdAtUntil: createdAtUntil ? new Date(createdAtUntil) : undefined,
    })
    output.log(
      `import-cras-conseiller-numerique-v1: imported all ${result.cras.length} cras for ${conseillerNumeriqueId}`,
    )
    return result
  }

  // Else we need to import month by month to avoid memory issues

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
      conseillerNumeriqueId,
      createdAtSince: batchSince,
      createdAtUntil: batchUntil,
    })

    output.log(
      `import-cras-conseiller-numerique-v1: imported ${monthResult.empty ? 0 : monthResult.cras.length} cras in ${month.toISOString().slice(0, 7)}`,
    )
  }

  return result
}
