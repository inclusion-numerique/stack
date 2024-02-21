import { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import LinkCard from '@app/web/ui/LinkCard'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Accéder aux données'),
}

const AccederAuxDonneesPage = () => (
  <>
    <div className="fr-container">
      <Breadcrumbs currentPage="Accéder aux données" />
    </div>
    <div className="fr-container fr-container--narrow fr-pb-50v">
      <h1 className="fr-h2 fr-mb-2v">Accéder aux données</h1>
      <p className="fr-text-mention--grey">
        Choisissez l’accès qui vous correspond :
      </p>

      <LinkCard
        icon="fr-icon-france-fill"
        href="/donnees/choix-du-departement"
        title="Ouvert au grand public"
        text="Retrouvez des données publiques utiles pour comprendre l’inclusion numérique sur votre territoire."
      />

      <LinkCard
        icon="fr-icon-government-fill"
        href="/connexion?role=prefecture&suivant=/donnees"
        title="Vous êtes une préfecture"
        text="Connectez-vous pour retrouver toutes les informations liés à la gouvernance dont vous êtes membre."
      />
    </div>
  </>
)

export default AccederAuxDonneesPage
