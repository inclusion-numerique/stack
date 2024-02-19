import React from 'react'
import { getDashboardData } from '@app/web/data/getDashboardData'
import DashboardContent from '@app/web/components/Dashboard/DashboardContent'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async () => {
  const data = await getDashboardData({ national: true })

  return <DashboardContent data={data} />
}

export default Page
