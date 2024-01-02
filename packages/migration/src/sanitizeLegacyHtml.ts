import sanitizeHtml from 'sanitize-html'

export const sanitizeLegacyHtml = (html: string | null | undefined) => {
  const trimmed = html?.trim() ?? null
  if (!trimmed) {
    return null
  }

  return sanitizeHtml(trimmed)
}
