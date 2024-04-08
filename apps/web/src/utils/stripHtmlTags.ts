export const stripHtmlTags = (html: string) => html.replaceAll(/<[^>]*>?/gm, '')
