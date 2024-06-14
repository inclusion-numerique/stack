import { CategoryCard } from './CategoryCard/CategoryCard'
import { getHomeCategoriesCount } from './getHomeCategoriesCount'

const HomeCategories = async () => {
  const categoriesCount = await getHomeCategoriesCount()
  return (
    <div className="fr-grid-row fr-grid-row--gutters">
      <div className="fr-col-md-6 fr-col-12">
        <CategoryCard
          category="Inclusion & compétences numériques"
          resourcesCount={categoriesCount[0].resourcesCount}
          thematicCount={categoriesCount[0].themes.length}
        />
      </div>
      <div className="fr-col-md-6 fr-col-12">
        <CategoryCard
          category="Culture numérique"
          resourcesCount={categoriesCount[1].resourcesCount}
          thematicCount={categoriesCount[1].themes.length}
        />
      </div>
      <div className="fr-col-md-6 fr-col-12">
        <CategoryCard
          category="Communs & souveraineté"
          resourcesCount={categoriesCount[2].resourcesCount}
          thematicCount={categoriesCount[2].themes.length}
        />
      </div>
      <div className="fr-col-md-6 fr-col-12">
        <CategoryCard
          category="Numérique & environnement"
          resourcesCount={categoriesCount[3].resourcesCount}
          thematicCount={categoriesCount[3].themes.length}
        />
      </div>
    </div>
  )
}

export default HomeCategories
