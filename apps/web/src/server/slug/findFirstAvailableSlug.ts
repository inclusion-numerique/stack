import { prismaClient } from '@app/web/prismaClient'

/**
 * ⚠️ Slug argument must be sanitized before calling this function (with createSlug() )
 */
export const findFirstAvailableSlug = async (
  slug: string,
  table: 'bases' | 'resources' | 'profiles' | 'collections',
) => {
  const suffixedSlug = `${slug}-`

  const result = await prismaClient.$queryRawUnsafe<{ slug: string }[]>(`
      WITH input AS (
        SELECT '${slug}'::text AS slug, 
               '${suffixedSlug}'::text AS suffixed
        )
      SELECT i.slug
      FROM input i
      LEFT JOIN "${table}" a USING (slug)
      WHERE a.slug IS NULL -- doesn't exist yet.
      UNION ALL
      ( -- parentheses required
          SELECT i.suffixed || COALESCE(right(a.slug, length(i.suffixed) * -1)::int + 1, 1)
          FROM input i
            LEFT JOIN "${table}" a 
              ON a.slug LIKE (i.suffixed || '%') -- match up to last "-"
              AND right(a.slug, length(i.suffixed) * -1) ~ '^\\d+$' -- suffix numbers only
          ORDER BY right(a.slug, length(i.suffixed) * -1)::int DESC
      )
      LIMIT 1;
  `)

  if (!result || result.length !== 1) {
    throw new Error('Could not find available slug')
  }

  return result[0].slug
}
