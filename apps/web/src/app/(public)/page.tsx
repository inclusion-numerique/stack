import Link from 'next/link'

export const revalidate = 0

const HomePage = () => (
  <div className="fr-container">
    <h1 className="fr-mt-4w">L&lsquo;outil de l&lsquo;inclusion numérique</h1>
    <Link className="fr-btn" href="/connexion?suivant=/prefet">
      Espace Préfet
    </Link>
  </div>
)

export default HomePage
