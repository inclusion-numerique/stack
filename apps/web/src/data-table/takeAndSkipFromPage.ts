export const takeAndSkipFromPage = ({
  pageSize,
  page: pageParameter,
}: {
  page?: number | null
  pageSize: number
}) => {
  const page = pageParameter && pageParameter > 0 ? pageParameter : 1

  return {
    take: pageSize,
    skip: (page - 1) * pageSize,
  }
}
