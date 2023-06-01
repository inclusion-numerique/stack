import { load } from 'cheerio'
import type { Cheerio, Element } from 'cheerio'

const cleanMetadataString = (string_: string | undefined | null) => {
  const trimmed = string_?.trim()
  if (!trimmed) {
    return null
  }
  return trimmed
    .replaceAll(/(\r\n|\n|\r)/gm, ' ')
    .replaceAll(/\s+/g, ' ')
    .replaceAll(' :', ' :')
    .replaceAll(' !', ' !')
    .replaceAll(' ?', ' ?')
    .trim()
}

const getTitle = (head: Cheerio<Element>) => {
  const titleMeta = head.find('meta[name="title"], meta[property="og:title"]')
  if (titleMeta.length > 0) {
    return cleanMetadataString(titleMeta.attr('content'))
  }

  const title = head.find('title')

  return cleanMetadataString(title.contents().toString())
}

const getDescription = (head: Cheerio<Element>) => {
  const descriptionMeta = head.find(
    'meta[name="description"], meta[property="og:description"]',
  )

  return cleanMetadataString(descriptionMeta.attr('content'))
}

const getImageUrl = (head: Cheerio<Element>) => {
  const ogImage = head.find(
    'meta[property="og:image"], meta[name="twitter:image:src"]',
  )
  return ogImage.attr('content') ?? null
}

export const getMetadataFromDocument = (document: string) => {
  const head = load(document)('head')

  return {
    title: getTitle(head),
    description: getDescription(head),
    imageUrl: getImageUrl(head),
  }
}

export type Metadata = ReturnType<typeof getMetadataFromDocument>
