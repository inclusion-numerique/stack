// eslint-disable-next-line unicorn/prevent-abbreviations
import { Command } from '@commander-js/extra-typings'
import { output } from '@app/cli/output'
import axios from 'axios'
import { prismaClient } from '@app/web/prismaClient'
import { ragSources } from '@app/web/assistant/rag/sources'
import { insertMarkdownRagChunks } from '@app/web/assistant/rag/insertMarkdownRagChunks'

/**
 * Ingest bases and ressources from les-bases
 */

// const lesBasesHost = 'https://lesbases.anct.gouv.fr'
const lesBasesHost = 'http://localhost:3000'

// eslint-disable-next-line unicorn/prevent-abbreviations
export const ingestLesBasesMarkdown = new Command()
  .command('rag:ingest-les-bases-markdown')
  .action(async () => {
    const [basesResponse, resourcesResponse] = await Promise.all([
      axios.get<{
        data: {
          id: string
          title: string
          slug: string
          url: string
          deleted: string | null
        }[]
      }>(`${lesBasesHost}/api/v1/bases`),
      axios.get<{
        data: {
          id: string
          title: string
          slug: string
          url: string
          is_public: boolean
          published: string | null
          deleted: string | null
        }[]
      }>(`${lesBasesHost}/api/v1/resources`),
    ])

    const bases = basesResponse.data.data
    const resources = resourcesResponse.data.data

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

    output(
      `Found ${bases.length} bases and ${resources.length} resources to ingest`,
    )
    await Promise.all(
      bases.map(async (base) => {
        if (base.deleted) {
          await prismaClient.ragDocumentChunk.deleteMany({
            where: {
              source: ragSources.lesBases,
              type: 'base',
              sourceId: base.id,
            },
          })

          output(`Deleted base ${base.slug}`)

          return
        }
        const markdownResponse = await axios.get<string>(`${base.url}/markdown`)

        const { unchanged, insertedChunks, deletedOutdatedChunks } =
          await insertMarkdownRagChunks({
            source: ragSources.lesBases,
            type: 'base',
            sourceId: base.id,
            content: markdownResponse.data,
            url: base.url,
          })

        output(
          `Base ${base.slug}: ${unchanged ? '✅ unchanged' : `${insertedChunks} inserted, ${deletedOutdatedChunks} deleted`}`,
        )
      }),
    )
    await Promise.all(
      resources.map(async (resource) => {
        if (resource.deleted) {
          await prismaClient.ragDocumentChunk.deleteMany({
            where: {
              source: ragSources.lesBases,
              type: 'ressource',
              sourceId: resource.id,
            },
          })

          output(`Deleted resource ${resource.slug}`)

          return
        }
        const markdownResponse = await axios.get<string>(
          `${resource.url}/markdown`,
        )

        const { unchanged, insertedChunks, deletedOutdatedChunks } =
          await insertMarkdownRagChunks({
            source: ragSources.lesBases,
            type: 'ressource',
            sourceId: resource.id,
            content: markdownResponse.data,
            url: resource.url,
          })

        output(
          `Resource ${resource.slug}: ${unchanged ? '✅ unchanged' : `${insertedChunks} inserted, ${deletedOutdatedChunks} deleted`}`,
        )
      }),
    )

    output(
      `😊 Finished ingesting ${bases.length} bases and ${resources.length} resources`,
    )
  })
