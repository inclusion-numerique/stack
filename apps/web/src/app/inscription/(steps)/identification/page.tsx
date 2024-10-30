import { metadataTitle } from '@app/web/app/metadataTitle'
import {
  profileInscriptionFromSlug,
  ProfileInscriptionSlug,
} from '@app/web/inscription/profilInscription'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { getLieuxActiviteForInscription } from '@app/web/app/inscription/getLieuxActiviteForInscription'
import { importFromConseillerNumerique } from '@app/web/app/inscription/importFromConseillerNumerique/importFromConseillerNumerique'
import { findConseillerNumeriqueByEmail } from '@app/web/external-apis/conseiller-numerique/findConseillerNumeriqueByEmail'
import { FinaliserInscriptionConseiller } from './_components/FinaliserInscriptionConseiller/FinaliserInscriptionConseiller'
import { FinaliserInscriptionCoordinateur } from './_components/FinaliserInscriptionCoordinateur/FinaliserInscriptionCoordinateur'
import { FinaliserInscriptionMediateur } from './_components/FinaliserInscriptionMediateur/FinaliserInscriptionMediateur'
import { InscriptionRole } from './_components/inscriptionRole'

export const metadata = {
  title: metadataTitle('Finaliser mon inscription'),
}

const introFor =
  (profil: InscriptionRole) =>
  (role: InscriptionRole, urlProfil?: InscriptionRole) =>
    urlProfil === profil || (urlProfil == null && role === profil)

const mediateurRole = (
  mediateur: { conseillerNumerique: { id: string } | null } | null,
) => (mediateur?.conseillerNumerique ? 'conseiller-numerique' : 'mediateur')

const userRole = ({
  coordinateur,
  mediateur,
}: {
  mediateur: { conseillerNumerique: { id: string } | null } | null
  coordinateur: { id: string } | null
}) => (coordinateur == null ? mediateurRole(mediateur) : 'coordinateur')

const IntroPage = async ({
  searchParams: { profil: urlProfil, check },
}: {
  searchParams: {
    // profil is used to display warnings if user type/roles check is in an error state
    profil?: ProfileInscriptionSlug
    check?: '1'
  }
}) => {
  const user = await getAuthenticatedSessionUser()

  const profil = urlProfil
    ? profileInscriptionFromSlug[urlProfil]
    : (user.profilInscription ?? undefined)

  const checkedUser =
    !(check && user.checkConseillerNumeriqueInscription) || !profil
      ? user
      : await importFromConseillerNumerique(findConseillerNumeriqueByEmail)({
          user,
          profil,
        })

  const lieuxActivite = user.mediateur?.conseillerNumerique
    ? await getLieuxActiviteForInscription({ mediateurId: user.mediateur.id })
    : []

  const role = userRole(checkedUser)

  return (
    <div className="fr-mb-32v fr-p-12v fr-width-full fr-border-radius--8 fr-background-default--grey fr-mt-32v">
      {introFor('conseiller-numerique')(role, urlProfil) && (
        <FinaliserInscriptionConseiller
          inscriptionRole={role}
          user={user}
          lieuActiviteCount={lieuxActivite.length}
        />
      )}
      {introFor('mediateur')(role, urlProfil) && (
        <FinaliserInscriptionMediateur
          inscriptionRole={role}
          lieuActiviteCount={lieuxActivite.length}
        />
      )}
      {introFor('coordinateur')(role, urlProfil) && (
        <FinaliserInscriptionCoordinateur
          inscriptionRole={role}
          user={user}
          lieuActiviteCount={lieuxActivite.length}
        />
      )}
    </div>
  )
}

export default IntroPage
