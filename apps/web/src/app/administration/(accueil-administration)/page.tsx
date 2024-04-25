import { redirect } from 'next/navigation'

const Page = () => {
  redirect('/administration/structures')
  return null
}

export default Page
