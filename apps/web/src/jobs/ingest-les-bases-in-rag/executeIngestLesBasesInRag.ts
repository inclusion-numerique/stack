import { request } from 'undici'
import pThrottle from 'p-throttle'
import type { IngestLesBasesInRagJob } from '@app/web/jobs/ingest-les-bases-in-rag/ingestLesBasesInRagJob'
import { runPromisesSequentially } from '@app/web/utils/runPromisesSequentially'
import { prismaClient } from '@app/web/prismaClient'
import { ragSources } from '@app/web/assistant/rag/sources'
import { insertMarkdownRagChunks } from '@app/web/assistant/rag/insertMarkdownRagChunks'
import { output } from '@app/web/jobs/output'
import { checkIfRagDocumentExists } from '@app/web/assistant/rag/checkIfRagDocumentExists'

type ApiV1BasesResponse = {
  data: {
    id: string
    slug: string
    created: string
    updated: string
    deleted: string | null
    is_public: boolean
    title: string | null // Null if not public or deleted
    url: string | null // Null if not public or deleted
  }[]
}

export type ApiV1ResourcesResponse = {
  data: {
    id: string
    slug: string
    title: string | null // null if not publicly visible
    deleted: string | null
    created: string
    updated: string
    is_public: boolean
    published: string | null
    url: string | null // null if not publicly visible
  }[]
}

const lesBasesHost = 'https://lesbases.anct.gouv.fr'
// const lesBasesHost = 'http://localhost:3000'

const baseShouldBeIncludedInRag = (base: ApiV1BasesResponse['data'][number]) =>
  base.deleted === null && base.is_public

const resourceShouldBeIncludedInRag = (
  resource: ApiV1ResourcesResponse['data'][number],
) =>
  resource.deleted === null && resource.is_public && resource.published !== null

const fetchJson = async <T>(url: string): Promise<T> => {
  const { body } = await request(url)
  const json = await body.json()
  return json as T
}

const fetchMarkdown = async (url: string): Promise<string> => {
  const { body } = await request(url)
  const text = await body.text()
  return text
}

const fetchMarkdownThrottle = pThrottle({
  limit: 5,
  interval: 250,
})

const throttledFetchMarkdown = fetchMarkdownThrottle(fetchMarkdown)

export const executeIngestLesBasesInRag = async (
  _job: IngestLesBasesInRagJob,
) => {
  const [basesResponse, resourcesResponse] = await Promise.all([
    fetchJson<ApiV1BasesResponse>(`${lesBasesHost}/api/v1/bases`).catch(
      (error) => {
        output.error('Could not fetch bases')
        throw error
      },
    ),
    fetchJson<ApiV1ResourcesResponse>(`${lesBasesHost}/api/v1/resources`).catch(
      (error) => {
        output.error('Could not fetch resources')
        throw error
      },
    ),
  ])

  const bases = basesResponse.data
  const resources = resourcesResponse.data

  if (bases.length < 100) {
    throw new Error(
      `Not enough bases to ingest, check that there is no error in the bases API`,
    )
  }

  if (resources.length < 1000) {
    throw new Error(
      `Not enough resources to ingest, check that there is no error in the resources API`,
    )
  }

  output.log(
    `Found ${bases.length} bases and ${resources.length} resources to ingest`,
  )

  await runPromisesSequentially(
    resources.map(async (resource) => {
      if (!resourceShouldBeIncludedInRag(resource)) {
        const exists = await checkIfRagDocumentExists({
          type: 'ressource',
          source: ragSources.lesBases,
          sourceId: resource.id,
        })

        if (exists) {
          await prismaClient.ragDocumentChunk.deleteMany({
            where: {
              source: ragSources.lesBases,
              type: 'ressource',
              sourceId: resource.id,
            },
          })

          output.log(`Deleted resource ${resource.slug}`)
        } else {
          output.log(`Resource ${resource.slug} skipped (non public)`)
        }

        return
      }
      const markdownResponse = await throttledFetchMarkdown(
        `${resource.url}/markdown`,
      )

      const { unchanged, insertedChunks, deletedOutdatedChunks } =
        await insertMarkdownRagChunks({
          source: ragSources.lesBases,
          type: 'ressource',
          sourceId: resource.id,
          content: markdownResponse,
          url: resource.url ?? undefined,
        })

      output.log(
        `Resource ${resource.slug}: ${unchanged ? '✅ unchanged' : `${insertedChunks} inserted, ${deletedOutdatedChunks} deleted`}`,
      )
    }),
  )

  await runPromisesSequentially(
    bases.map(async (base) => {
      if (!baseShouldBeIncludedInRag(base)) {
        const exists = await checkIfRagDocumentExists({
          type: 'base',
          source: ragSources.lesBases,
          sourceId: base.id,
        })

        if (exists) {
          await prismaClient.ragDocumentChunk.deleteMany({
            where: {
              source: ragSources.lesBases,
              type: 'base',
              sourceId: base.id,
            },
          })

          output.log(`Deleted base ${base.slug}`)
        } else {
          output.log(`Base ${base.slug} skipped (non public)`)
        }

        return
      }
      const markdownResponse = await throttledFetchMarkdown(
        `${base.url}/markdown`,
      )

      const { unchanged, insertedChunks, deletedOutdatedChunks } =
        await insertMarkdownRagChunks({
          source: ragSources.lesBases,
          type: 'base',
          sourceId: base.id,
          content: markdownResponse,
          url: base.url ?? undefined,
        })

      output.log(
        `Base ${base.slug}: ${unchanged ? '✅ unchanged' : `${insertedChunks} inserted, ${deletedOutdatedChunks} deleted`}`,
      )
    }),
  )

  output.log(
    `😊 Finished ingesting ${bases.length} bases and ${resources.length} resources`,
  )
  return {
    success: true,
  }
}
