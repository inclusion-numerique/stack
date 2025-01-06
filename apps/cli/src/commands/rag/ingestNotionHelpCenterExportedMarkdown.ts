// eslint-disable-next-line unicorn/prevent-abbreviations
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { varFile } from '@app/config/varDirectory'
import slugify from 'slugify'
import { MarkdownTextSplitter } from '@langchain/textsplitters'
import { createEmbedding } from '@app/web/assistant/createEmbedding'
import { prismaClient } from '@app/web/prismaClient'
import { Command } from '@commander-js/extra-typings'
import { configureDeploymentTarget, DeploymentTargetOption } from '@app/cli/deploymentTarget'
import { output } from '@app/cli/output'

/**
 * How to export and ingest the markdown files from the help center
 *
 * Go to https://www.notion.so/incubateurdesterritoires/Centre-d-aide-de-La-Coop-de-la-m-diation-num-rique-e2db421ac63249769c1a9aa155af5f2f?pvs=4
 * Log in
 * Go to the "Export" button in the top right corner
 * Select "Markdown", Current view, Everything, Include sub-pages and Create folder for subpages
 * Download the zip file
 * Unzip the file in this repo /var/centre-aide-notion
 * Run the command with `pnpm cli rag:ingest-notion-help-center-exported-markdown`
 */

const markdownExportDirectory = varFile('centre-aide-notion')

const markdownSplitter = new MarkdownTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 0,
})

const getMarkdownFiles = (
  directory: string,
): { filename: string; absolutePath: string }[] => {
  const result: { filename: string; absolutePath: string }[] = []

  const filesAndDirectories = fs.readdirSync(directory)

  for (const item of filesAndDirectories) {
    const fullPath = path.join(directory, item)
    const stats = fs.statSync(fullPath)

    if (stats.isDirectory()) {
      result.push(...getMarkdownFiles(fullPath))
    } else if (stats.isFile() && fullPath.endsWith('.md')) {
      result.push({ filename: item, absolutePath: fullPath })
    }
  }

  return result
}

const source = 'centre-aide-notion'
const type = 'page'

const createMd5Hash = (content: string) => {
  const md5sum = crypto.createHash('md5')
  md5sum.update(content)
  return md5sum.digest('hex')
}

const createOrUpdateNotionPageEmbeddingChunks = async (file: {
  filename: string
  absolutePath: string
  url: string
  content: string
  chunks: string[]
}) => {
  const documentMd5 = createMd5Hash(file.content)

  // Delete outdated chunks
  await prismaClient.ragDocumentChunk.deleteMany({
    where: {
      source,
      sourceId: file.filename,
      documentMd5: {
        not: documentMd5,
      },
    },
  })

  // Check if chunk already exist
  const existingChunk = await prismaClient.ragDocumentChunk.findFirst({
    where: {
      source,
      sourceId: file.filename,
      documentMd5,
    },
    select: {
      id: true,
    },
  })

  if (existingChunk) {
    // No op if chunks exist with same md5 hash
    output(`✅ Chunks already exist with same md5 hash for ${file.filename}`)
    return
  }

  output(`Generating embeddings for ${file.filename}`)

  await Promise.all(
    file.chunks.map(async (content, chunkIndex) => {
      const { model, embedding } = await createEmbedding(content)

      const created = await prismaClient.ragDocumentChunk.create({
        data: {
          source,
          type,
          sourceId: file.filename,
          documentMd5,
          chunk: chunkIndex,
          content,
          url: file.url,
          embeddingModel: model,
        },
        select: {
          id: true,
        },
      })

      // Transform the number array vector in string format '[0.1, 0.2,...]'
      const embeddingVectorParam = `[${embedding.join(',')}]`

      // Prisma client do not support setting vector fields
      await prismaClient.$queryRawUnsafe(`
          UPDATE "rag_document_chunks"
          SET embedding = '${embeddingVectorParam}'::vector
          WHERE id = '${created.id}'::uuid
      `)
    }),
  )

  output(
    `Generated ${file.chunks.length} chunks embeddings for ${file.filename}`,
  )
}

/**
 * 'Enregistrer une activité le compte rendu d’activi c8fdfe72e55846cca557f270fdae8ac9.md'
 * => https://incubateurdesterritoires.notion.site/Enregistrer-une-activit-le-compte-rendu-d-activit-CRA-c8fdfe72e55846cca557f270fdae8ac9
 *
 * @param filename
 */
const absoluteNotionUrlFromFilename = (filename: string): string => {
  const baseUrl = 'https://incubateurdesterritoires.notion.site/'

  const filenameWithoutExtension = filename.replace(/\.md$/, '')

  // use slugify to change all special chars with a -
  const slugForUrl = slugify(filenameWithoutExtension, {
    lower: false,
    strict: true,
  })

  return `${baseUrl}${slugForUrl}`
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export const ingestNotionHelpCenterExportedMarkdown = new Command()
  .command('rag:ingest-notion-help-center-exported-markdown')
  .addOption(DeploymentTargetOption)
  .action(async (options) => {
    await configureDeploymentTarget(options)

    const markdownFiles = getMarkdownFiles(markdownExportDirectory).map(
      ({ filename, absolutePath }) => ({
        filename,
        absolutePath,
        url: absoluteNotionUrlFromFilename(filename),
        content: fs.readFileSync(absolutePath, 'utf8'),
      }),
    )

    if (markdownFiles.length < 5) {
      throw new Error(
        `Not enough markdown files to ingest, check that you have exported all the help center files in ${
          markdownExportDirectory
        }`,
      )
    }

    const chunkedFiles = await Promise.all(
      markdownFiles.map(async (file) => {
        const chunks = await markdownSplitter.splitText(file.content)
        return { ...file, chunks }
      }),
    )

    output(
      'Markdown Files Found:',
      markdownFiles.map(({ url }) => url),
    )

    // Remove all chunks that are no more existing
    const deleted = await prismaClient.ragDocumentChunk.deleteMany({
      where: {
        source,
        sourceId: {
          notIn: chunkedFiles.map((file) => file.filename),
        },
      },
    })

    output(
      `Deleted ${deleted.count} existing chunks for documents that no longer exist`,
    )

    await Promise.all(chunkedFiles.map(createOrUpdateNotionPageEmbeddingChunks))
  })
