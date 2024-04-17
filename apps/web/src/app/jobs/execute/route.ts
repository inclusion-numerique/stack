import type { NextRequest } from 'next/server'
import { JobValidation } from '@app/web/jobs/jobs'
import { executeUpdateDataInclusionStructures } from '@app/web/jobs/executeUpdateDataInclusionStructures'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const POST = async (request: NextRequest) => {
  const { body } = request

  const jobPayload = await JobValidation.parseAsync(body)

  const start = Date.now()
  switch (jobPayload.name) {
    case 'update-data-inclusion-structures': {
      await executeUpdateDataInclusionStructures(jobPayload)
      break
    }
    default: {
      throw new Error(`Unknown job name`)
    }
  }
  const done = Date.now()

  return new Response(
    JSON.stringify({
      status: 'ok',
      duration: (done - start) / 1000,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
}
