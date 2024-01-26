import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'

export const revalidate = 0
export const metadata: Metadata = {
  title: metadataTitle('Profil supprimé'),
}

const ProfilSupprimePage = () => (
  <div className="fr-container landing-main-container fr-my-8w">
    <h1>Profil supprimé</h1>
    <p>Votre profil a bien été supprimé.</p>
    <a className="fr-btn" href="/">
      Page d&apos;accueil
    </a>
  </div>
)
export default ProfilSupprimePage
