import { StructureEmployeuseLieuActivitePage } from '@app/web/app/inscription/(steps)/_components/structure-employeuse-lieu-activite/StructureEmployeuseLieuActivitePage'
import { metadataTitle } from '@app/web/app/metadataTitle'
import React from 'react'
import { coordinateurInscriptionSteps } from '../coordinateurInscriptionSteps'

export const metadata = {
  title: metadataTitle('Finaliser mon inscription'),
}

const Page = () => (
  <StructureEmployeuseLieuActivitePage
    backHref={coordinateurInscriptionSteps.structureEmployeuse}
    nextStep={coordinateurInscriptionSteps.lieuxActivite}
  />
)

export default Page
