import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { profileInscriptionSlugs } from '@app/web/inscription/profilInscription'
import { getLieuxActiviteForInscription } from '@app/web/app/inscription/getLieuxActiviteForInscription'
import { fetchConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/fetchConseillerNumeriqueV1Data'
import { getProconnectIdToken } from '@app/web/security/getProconnectIdToken'
import { updateUserInscriptionProfileFromV1Data } from '@app/web/app/inscription/(steps)/identification/updateUserInscriptionProfileFromV1Data'
import { initializeAndimportUserDataFromV1 } from '@app/web/app/inscription/(steps)/identification/initializeAndimportUserDataFromV1'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import { FinaliserInscriptionConseiller } from './_components/FinaliserInscriptionConseiller/FinaliserInscriptionConseiller'
import { FinaliserInscriptionCoordinateur } from './_components/FinaliserInscriptionCoordinateur/FinaliserInscriptionCoordinateur'
import { FinaliserInscriptionMediateur } from './_components/FinaliserInscriptionMediateur/FinaliserInscriptionMediateur'

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

  return (
    <div className="fr-mb-32v fr-p-12v fr-width-full fr-border-radius--8 fr-background-default--grey fr-mt-32v">
      {intendedProfileInscription === 'ConseillerNumerique' && (
        <FinaliserInscriptionConseiller
          checkedProfilInscription={checkedProfilInscriptionSlug}
          user={userWithImportedData}
          lieuActiviteCount={lieuxActivite.length}
          proConnectIdTokenHint={proConnectIdTokenHint}
        />
      )}
      {intendedProfileInscription === 'Mediateur' && (
        <FinaliserInscriptionMediateur
          checkedProfilInscription={checkedProfilInscriptionSlug}
          lieuActiviteCount={lieuxActivite.length}
        />
      )}
      {intendedProfileInscription === 'Coordinateur' && (
        <FinaliserInscriptionCoordinateur
          checkedProfilInscription={checkedProfilInscriptionSlug}
          user={userWithImportedData}
          lieuActiviteCount={lieuxActivite.length}
          proConnectIdTokenHint={proConnectIdTokenHint}
        />
      )}
    </div>
  )
}

export default IdentificationPage
