/**
 * This file is executed as a separate process using `tsx` and `child_process.exec`
 * From the parent cypress process, in taskManager.ts
 * This is mandatory as cypress does not allows for typescript paths alias to be used
 * in the main cypress process and we need our packages imported correctly in the "tasks"
 * we need to execute.
 */

import { logToFile } from '@app/e2e/support/logToFile'
import { TaskName, tasks } from '@app/e2e/tasks/tasks'
import {
  EncodedState,
  decodeSerializableState,
  encodeSerializableState,
} from '@app/web/utils/encodeSerializableState'

const taskExecutor = async () => {
  const task = process.argv[2] as TaskName
  const input = process.argv[3] as EncodedState<unknown>

  logToFile('EXECUTING TASK', { task, input })
  if (!task) {
    throw new Error('No task name provided')
  }
  if (!input) {
    throw new Error('No input provided')
  }
  const parsedInput = decodeSerializableState(input, '_empty')
  if (parsedInput === '_empty') {
    throw new Error('No valid serialized input provided')
  }

  const executor = tasks[task]
  if (!executor) {
    throw new Error(`No task executor found for ${task}`)
  }
  try {
    const result = await executor(parsedInput as never)
    console.log('Task execution result:', result)
    return result
  } catch (error) {
    console.error('Task execution failed:', error)
    logToFile({ error: error as unknown })
    process.exit(1)
  }
}

taskExecutor()
