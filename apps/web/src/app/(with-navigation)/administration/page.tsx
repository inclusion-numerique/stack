import { redirect } from 'next/navigation'

export const generateMetadata = () => ({
  title: `Administration`,
})

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = () => {
  redirect('/administration/gouvernances')
  return null
}

export default Page
