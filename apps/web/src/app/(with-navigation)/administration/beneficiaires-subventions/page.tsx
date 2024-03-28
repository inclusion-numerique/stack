import React from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = ({ searchParams }: { searchParams: { todo: true } }) => (
  <h2>TODO {JSON.stringify(searchParams)}</h2>
)

export default Page
