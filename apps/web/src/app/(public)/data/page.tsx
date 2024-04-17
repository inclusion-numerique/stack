import { getStructuresMetadata } from '@app/web/data/data-inclusion/dataInclusionStructures'

export const revalidate = 0

const Page = async () => {
  const data = await getStructuresMetadata()

  return <>{JSON.stringify(data, null, 2)}</>
}

export default Page
