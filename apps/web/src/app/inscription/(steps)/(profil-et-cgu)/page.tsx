import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import LogoCoop from '@app/web/components/LogoCoop'
import ProfilEtCguForm from '@app/web/app/inscription/(steps)/(profil-et-cgu)/ProfilEtCguForm'

export const metadata = {
  title: metadataTitle('Inscription'),
}

const IntroPage = async () => {
  const user = await authenticateUser()

  return (
    <div className="fr-mb-32v fr-p-12v fr-width-full fr-border-radius--8 fr-background-default--grey fr-mt-32v">
      <div className="fr-flex fr-direction-column fr-align-items-center">
        <LogoCoop />
        <h1 className="fr-h3 fr-text-title--blue-france fr-mt-10v fr-mb-2v fr-text--center">
          Inscription à La Coop de la médiation numérique
        </h1>
        <p className="fr-text--xl fr-mb-10v fr-text--center">
          Nous avons besoin de connaître votre poste&nbsp;:
        </p>
      </div>
      <ProfilEtCguForm userId={user.id} />
    </div>
  )
}

export default IntroPage
