import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const generateMetadata = (): Metadata => {
  redirect('/assistant/chat')
}

const Page = () => null
export default Page
