import type { BaseForMarkdown } from '@app/web/bases/getBaseForMarkdown'

/**
 * Converts a public base to markdown
 */
export const baseToMarkdown = ({
  id,
  title,
  slug,
  description,
  department,
  email,
  emailIsPublic,
  website,
  facebook,
  twitter,
  linkedin,
  created,
  updated,
  coverImage,
}: BaseForMarkdown): string => {
  const parts: string[] = []

  parts.push(`# ${title}`)

  return parts.join('\n')
}
