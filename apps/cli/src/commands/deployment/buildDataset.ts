import * as process from 'node:process'
import axios, { AxiosError } from 'axios'
import { Command } from '@commander-js/extra-typings'
import axiosRetry from 'axios-retry'
import { output } from '@app/cli/output'

export const buildDataset = new Command()
  .command('deployment:build-data')
  .argument('<url>', 'deployment url')
  .action(async (url) => {
    const client = axios.create({
      baseURL: url,
    })

    axiosRetry(client, {
      retries: 3,
      retryDelay: (retryCount) => retryCount * 5000,
      retryCondition: () => true,
      onRetry: (retryCount, error) => {
        output(error.message)

        output(
          `Scheduling retry ${retryCount} after error in ${retryCount * 5}s`,
        )
      },
    })

    try {
      const result = await client.post<{ status: string }>('/jobs/build-data')
      output(result.data)
    } catch (error) {
      if (error instanceof AxiosError) {
        output(error.message)
      } else {
        output(error)
      }
      process.exit(1)
    }
  })
