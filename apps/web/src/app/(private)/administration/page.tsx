import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { checkUserAccessToGouvernanceScopeOrNavigate } from '@app/web/app/(private)/gouvernances/checkUserAccessToGouvernanceScopeOrNavigate'
import {
  getFormulairesEnCoursByDay,
  getFormulairesTerminesByDay,
  getGouvernancesByDay,
} from '@app/web/app/(private)/administration/administrationQueries'
import WorkInProgressNotice from '@app/web/components/WorkInProgressNotice'

export const generateMetadata = () => ({
  title: `Administration`,
})

export const dynamic = 'force-dynamic'
export const revalidate = 0
const Page = async () => {
  await checkUserAccessToGouvernanceScopeOrNavigate({ national: true })

  const formulairesEnCoursByDay = await getFormulairesEnCoursByDay()
  const formulairesTerminesByDay = await getFormulairesTerminesByDay()
  const gouvernancesByDay = await getGouvernancesByDay()

  console.log(formulairesEnCoursByDay)
  console.log(formulairesTerminesByDay)
  console.log(gouvernancesByDay)

  return (
    <div className="fr-container fr-pb-20v">
      <Breadcrumb
        currentPageLabel="Administration"
        segments={[
          {
            label: "Page d'accueil",
            linkProps: {
              href: '/',
            },
          },
        ]}
      />
      <WorkInProgressNotice />
      <h3 className="fr-mb-12v fr-text-title--blue-france">
        Statistiques nationales
      </h3>
      <h3 className="fr-mb-12v fr-text-title--blue-france">
        Statistiques régionales
      </h3>
      <h3 className="fr-mb-12v fr-text-title--blue-france">
        Statistiques départementales
      </h3>
    </div>
  )
}

export default Page
