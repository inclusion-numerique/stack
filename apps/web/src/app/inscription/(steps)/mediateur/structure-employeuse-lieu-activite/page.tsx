import { StructureEmployeuseLieuActivitePage } from '@app/web/app/inscription/(steps)/_components/structure-employeuse-lieu-activite/StructureEmployeuseLieuActivitePage'
import { metadataTitle } from '@app/web/app/metadataTitle'
import React from 'react'
import { mediateurInscriptionSteps } from '../mediateurinscriptionSteps'

export const metadata = {
  title: metadataTitle('Finaliser mon inscription'),
}

const Page = () => (
  <StructureEmployeuseLieuActivitePage
    backHref={mediateurInscriptionSteps.structureEmployeuse}
    nextStep={mediateurInscriptionSteps.lieuxActivite}
  />
)

export default Page
