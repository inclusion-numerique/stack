import React from 'react'
import { getDepartementOptions } from '@app/web/data/getDepartementOptions'
import AdministrationPage from '@app/web/app/(with-navigation)/administration/AdministrationPage'

export const generateMetadata = () => ({
  title: `Administration`,
})

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  const departementOptions = await getDepartementOptions()

  return (
    <AdministrationPage
      departementOptions={departementOptions}
      codeDepartement={codeDepartement}
    />
  )
}

export default Page
