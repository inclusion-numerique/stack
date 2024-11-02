export const isEmptySearchParams = (searchParams: Record<string, unknown>) =>
  Object.values(searchParams).every(
    (value) => value == null || value === undefined || value === '',
  )
