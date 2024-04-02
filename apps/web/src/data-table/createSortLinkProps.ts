import type { SortDirection } from '@app/web/app/(with-navigation)/administration/SortLink'

export const createSortLinkProps = <
  T extends { tri?: string; ordre?: SortDirection },
  V extends { tri?: string; ordre?: SortDirection },
>({
  sortParams,
  searchParams,
  isDefault = false,
  baseHref,
}: {
  searchParams: T
  sortParams: V
  isDefault?: boolean
  baseHref: string
}) => {
  const params = {
    ...searchParams,
    ...sortParams,
  }

  const isActive =
    (!searchParams.tri && isDefault) || searchParams.tri === sortParams.tri

  const ordre = isActive
    ? searchParams.ordre === 'desc'
      ? 'asc'
      : 'desc'
    : 'asc'

  const props = {
    ...params,
    isActive,
    ordre,
  }

  const href = `${baseHref}?${new URLSearchParams({
    ...params,
    ordre,
  }).toString()}`

  return { ...props, href }
}
