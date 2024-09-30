/**
 * Is executed through  const taskCommand = `pnpm -F e2e task ${task} ${JSON.stringify(input)}`
 * And through Cypress.task() to execute tasks using other packages and database in cypress e2e tests
 */
import { logToFile } from '@app/e2e/support/logToFile'
import { TaskName, tasks } from '@app/e2e/tasks/tasks'

const stdOut = console.log.bind(console)
const stdError = console.error.bind(console)

// Disable console.log
Object.assign(console, {
  log: logToFile,
  error: logToFile,
  warn: logToFile,
  info: logToFile,
  debug: logToFile,
  table: logToFile,
})

const taskExecutor = async () => {
  const task = process.argv[2] as TaskName
  const input = JSON.parse(process.argv[3] as unknown as string) as unknown


  logToFile('EXECUTING TASK', { task, input })
  if (!task) {
    throw new Error('No task name provided')
  }
  if (!input) {
    throw new Error('No input provided')
  }
  const executor = tasks[task]
  if (!executor) {
    throw new Error(`No task executor found for ${task}`)
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = await executor(input as never)

  // Output result to pass to other process
  stdOut(JSON.stringify(result))
}

// eslint-disable-next-line unicorn/prefer-top-level-await
taskExecutor().catch((error) => {
  stdError(error)
  logToFile({ error: error as unknown })
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1)
})
