import fs from 'node:fs'
import path from 'node:path'

export const logFile = path.resolve(
  import.meta.dirname,
  '../../../../var',
  'cypress.log',
)

export const logToFile = (...content: unknown[]) => {
  const timestamp = new Date().toISOString()
  fs.appendFileSync(
    logFile,
    `${timestamp} - ${JSON.stringify(content, null, 2)}\n`,
  )

  return { result: 4 }
}
