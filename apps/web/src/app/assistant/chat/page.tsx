import { metadataTitle } from '@app/web/app/metadataTitle'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { v4 } from 'uuid'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export const generateMetadata = (): Metadata => ({
  title: metadataTitle('Assistant - Chat'),
})

/**
 * Displays the chat page without an existing chat session, it will be created on the first user message
 * and the user will be redirected to the chat session page with the threadId
 */
const Page = async () => {
  redirect(`/assistant/chat/${v4()}`)
  return null
}

export default Page
