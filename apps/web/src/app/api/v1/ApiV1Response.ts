export type JsonApiListResponse<T = unknown> = {
  data: T[]
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
  links: {
    self: string
    next: string | null
    prev: string | null
  }
}
