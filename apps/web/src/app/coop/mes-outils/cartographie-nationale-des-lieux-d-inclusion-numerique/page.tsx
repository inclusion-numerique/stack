import React from 'react'
import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import pageData from '../_data/cartographie-nationale-des-lieux-d-inclusion-numerique.json'
import { getLieuxActiviteForCartographie } from './getLieuxActiviteForCartographie'
import { OutilCartographieNationale } from './OutilCartographieNationale'

export const metadata = {
  title: metadataTitle(`${pageData.title} - Mes outils`),
}

const onlyVisibleForCartographieNationale = ({
  structure: { visiblePourCartographieNationale },
}: {
  structure: { visiblePourCartographieNationale: boolean }
}) => visiblePourCartographieNationale

const Page = async () => {
  const user = await getSessionUser()

  if (user?.mediateur?.id == null) {
    redirect('/connexion')
  }

  const lieuxActivite = await getLieuxActiviteForCartographie(user.mediateur.id)

  return (
    <OutilCartographieNationale
      {...pageData}
      nombreDeLieuxReferences={
        lieuxActivite.filter(onlyVisibleForCartographieNationale).length
      }
      nombreDeLieuxTotal={lieuxActivite.length}
    />
  )
}

export default Page
