import React from 'react'
import DashboardContent from '@app/web/components/Dashboard/DashboardContent'
import { getDashboardData } from '@app/web/app/(public)/donnees/getDashboardData'

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
