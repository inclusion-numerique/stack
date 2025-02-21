import { initializeAndimportUserDataFromV1 } from '@app/web/app/inscription/(steps)/identification/initializeAndimportUserDataFromV1'
import { updateUserInscriptionProfileFromV1Data } from '@app/web/app/inscription/(steps)/identification/updateUserInscriptionProfileFromV1Data'
import { getLieuxActiviteForInscription } from '@app/web/app/inscription/getLieuxActiviteForInscription'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import BackButton from '@app/web/components/BackButton'
import { fetchConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/fetchConseillerNumeriqueV1Data'
import { profileInscriptionSlugs } from '@app/web/inscription/profilInscription'
import { getProconnectIdToken } from '@app/web/security/getProconnectIdToken'
import { redirect } from 'next/navigation'
import React from 'react'
import { FinaliserInscriptionConseillerNumerique } from './_components/FinaliserInscriptionConseillerNumerique/FinaliserInscriptionConseillerNumerique'
import { FinaliserInscriptionCoordinateurConseillerNumerique } from './_components/FinaliserInscriptionCoordinateurConseillerNumerique/FinaliserInscriptionCoordinateurConseillerNumerique'
import { FinaliserInscriptionHorsDispositif } from './_components/FinaliserInscriptionHorsDispositif/FinaliserInscriptionHorsDispositif'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: metadataTitle('Finaliser mon inscription'),
}

/**
 * Cette page :
 *  - vérifie si l’utilisateur a des données dans la base de données conseiller-numerique-v1
 *  - affiche un message d'erreur si le role ne correspond pas
 *  - importe les données de la base de données conseiller-numerique-v1 si le role correspond
 *  - créé l'objet "mediateur" si le role correspond
 */
const IdentificationPage = async () => {
  const user = await authenticateUser()

  const intendedProfileInscription = user.profilInscription

  if (!intendedProfileInscription) {
    redirect('/inscription')
    return null
  }

  const existingV1Conseiller = await fetchConseillerNumeriqueV1Data({
    email: user.email,
  })

  const profilCheckedUser = await updateUserInscriptionProfileFromV1Data({
    user,
    v1Conseiller: existingV1Conseiller,
  })

  const { checkedProfilInscription } = profilCheckedUser

  const userWithImportedData = await initializeAndimportUserDataFromV1({
    user: {
      ...profilCheckedUser,
      profilInscription: intendedProfileInscription,
    },
    v1Conseiller: existingV1Conseiller,
  })

  const lieuxActivite = user.mediateur?.conseillerNumerique
    ? await getLieuxActiviteForInscription({ mediateurId: user.mediateur.id })
    : []

  const proConnectIdTokenHint = await getProconnectIdToken(user)
  const checkedProfilInscriptionSlug =
    profileInscriptionSlugs[checkedProfilInscription]
  const intendedProfileInscriptionSlug =
    profileInscriptionSlugs[intendedProfileInscription]

  return (
    <div className="fr-mb-32v">
      <div className="fr-mb-6v fr-mt-10v">
        <BackButton href="/inscription">Précédent</BackButton>
      </div>
      <div className="fr-p-12v fr-width-full fr-border-radius--8 fr-background-default--grey">
        {intendedProfileInscription === 'ConseillerNumerique' && (
          <FinaliserInscriptionConseillerNumerique
            checkedProfilInscription={checkedProfilInscriptionSlug}
            user={userWithImportedData}
            lieuActiviteCount={lieuxActivite.length}
            proConnectIdTokenHint={proConnectIdTokenHint}
          />
        )}
        {intendedProfileInscription === 'CoordinateurConseillerNumerique' && (
          <FinaliserInscriptionCoordinateurConseillerNumerique
            checkedProfilInscription={checkedProfilInscriptionSlug}
            user={userWithImportedData}
            lieuActiviteCount={lieuxActivite.length}
            proConnectIdTokenHint={proConnectIdTokenHint}
          />
        )}
        {(intendedProfileInscription === 'Mediateur' ||
          intendedProfileInscription === 'Coordinateur') && (
          <FinaliserInscriptionHorsDispositif
            checkedProfilInscription={checkedProfilInscriptionSlug}
            intendedProfilInscription={intendedProfileInscriptionSlug}
            lieuActiviteCount={lieuxActivite.length}
          />
        )}
      </div>
    </div>
  )
}

export default IdentificationPage
