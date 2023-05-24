import axios from 'axios'
import { JSDOM } from 'jsdom'
import z from 'zod'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'

const MetaDataValidation = z.object({
  url: z.string().url(),
})

const getTitle = (document: Document) => {
  const title = document.querySelector('title')
  if (title) {
    return title.textContent
  }
  const metaTitle = document.querySelector('meta[name="title"]')
  if (metaTitle) {
    return metaTitle.getAttribute('content')
  }

  const ogTitle = document.querySelector('meta[name="og:title"]')
  return ogTitle?.getAttribute('content')
}

const getDescription = (document: Document) => {
  const description = document.querySelector('meta[name="description"]')
  if (description) {
    return description.getAttribute('content')
  }

  const ogDescription = document.querySelector('meta[name="og:description"]')
  return ogDescription?.getAttribute('content')
}

export const metaDataRouter = router({
  get: protectedProcedure.input(MetaDataValidation).query(async ({ input }) => {
    const response = await axios.get<string>(input.url)
    const {
      window: { document },
    } = new JSDOM(response.data)

    return {
      title: getTitle(document) || '',
      description: getDescription(document) || '',
    }
  }),
})
