import React from 'react'
import { getDashboardData } from '@app/web/data/getDashboardData'
import DashboardContent from '@app/web/components/Dashboard/DashboardContent'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  const data = await getDashboardData({ codeDepartement })

  return <DashboardContent data={data} />
}

export default Page
