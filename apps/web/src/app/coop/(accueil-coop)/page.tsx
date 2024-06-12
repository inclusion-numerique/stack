import Breadcrumbs from '@app/web/components/Breadcrumbs'

const Page = () => (
  <>
    <div className="fr-container">
      <Breadcrumbs currentPage="Tableau de bord" />
    </div>
    <div className="fr-container fr-container--medium">
      <h1 className="fr-text-title--blue-france">Bienvenue sur la coop</h1>
    </div>
  </>
)

export default Page
