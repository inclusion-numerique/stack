import { metadataTitle } from '@app/web/app/metadataTitle'
import {
  profileInscriptionFromSlug,
  ProfileInscriptionSlug,
} from '@app/web/inscription/profilInscription'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { checkInscriptionConseillerNumerique } from '@app/web/app/inscription/checkInscriptionConseillerNumerique'
import { getLieuxActiviteForInscription } from '@app/web/app/inscription/getLieuxActiviteForInscription'
import { InscriptionRole } from './_components/inscriptionRole'
import LogoCoop from '@app/web/components/LogoCoop'
import ProfilEtCguForm from '@app/web/app/inscription/(steps)/(profil-et-cgu)/ProfilEtCguForm'

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
    !check && user.checkConseillerNumeriqueInscription
      ? user
      : await checkInscriptionConseillerNumerique({ user, profil })

  const lieuxActivite = user.mediateur?.conseillerNumerique
    ? await getLieuxActiviteForInscription({ mediateurId: user.mediateur.id })
    : []

  const role = userRole(checkedUser)

  return (
    <div className="fr-mb-32v fr-p-12v fr-width-full fr-border-radius--8 fr-background-default--grey fr-mt-32v">
      <div className="fr-flex fr-direction-column fr-align-items-center">
        <LogoCoop />
        <h1 className="fr-h3 fr-text-title--blue-france fr-mt-10v fr-mb-2v fr-text--center">
          Inscription à La Coop de la médiation numérique
        </h1>
        <p className="fr-text--xl fr-mb-0 fr-text--center">
          Nous avons besoin de connaître votre poste&nbsp;:
        </p>
      </div>
      <ProfilEtCguForm />
    </div>
  )
}

export default IntroPage
