import { logToFile } from './logToFile'
import childProcess from 'node:child_process'

// Execute node subprocess using pnpm -F e2e task <task> <JSON.stringify(input)>
const executeTask = (task: string, input: unknown) => {
  // TODO This do not execute the executor
  // const taskCommand = `pnpm -F e2e task ${task} ${JSON.stringify(input)}`
  // const taskCommand = 'which pnpm'
  const taskCommand = String.raw`echo {\"yolo\":true}`
  logToFile({ task, input, taskCommand })

  return new Promise((resolve, reject) => {
    childProcess.exec(taskCommand, (error, stdout) => {
      if (error) {
        logToFile({ errorOutput: error })
        reject(error)
        return
      }
      logToFile({ output: stdout.trim() })
      resolve(JSON.parse(stdout.trim()))
    })
  })
}

export const taskManager = new Proxy(
  {},
  {
    get: (_, property) => (input: unknown) =>
      executeTask(property as string, input),
  },
)
