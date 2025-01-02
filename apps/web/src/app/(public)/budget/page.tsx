import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import { AccompagnementPieChart } from '../../coop/(sidemenu-layout)/mes-statistiques/_components/AccompagnementPieChart'
import { QuantifiedShareLegend } from '../../coop/(sidemenu-layout)/mes-statistiques/_components/QuantifiedShareLegend'
import { canauxAccompagnementColors } from '../../coop/(sidemenu-layout)/mes-statistiques/_sections/colors'
import budgetElement from './dataBudget'

export const metadata: Metadata = {
  title: metadataTitle('Budget'),
}



const BudgetPage = () => {

  // Calcul du total pour obtenir la proportion
  const totalAmount = budgetElement.reduce((sum, item) => sum + parseFloat(item.amount.replace(' ', '').replace('€', '')), 0);

  const pieChartData = budgetElement.map((item) => {
    const count = parseFloat(item.amount.replace(' ', '').replace('€', '')); // Le montant dépensé
    const proportion = count / totalAmount; // La proportion du total

    return {
      label: item.post,
      count, // Montant dépensé
      proportion, // Proportion par rapport au total
    };
  });

  // Adaptation temporaire pour `QuantifiedShareLegend`
  const legendData = pieChartData.map((item) => ({
    ...item,
    proportion: item.proportion * 100, // Conversion en pourcentage
  }));

  return (
  <div className="fr-container">
    <SkipLinksPortal links={defaultSkipLinks} />
    <Breadcrumbs currentPage="Budget" />
    <main
      id={contentId}
      className="fr-container landing-main-container fr-my-8w"
    >
      <h1 className="fr-text-title--blue-france fr-mb-2w">
        Budget
      </h1>
      <p>
        La coop de la médiation numérique est un service public numérique
        développé au sein de l’Incubateur des territoires de l’Agence Nationale
        de la Cohésion des Territoires (ANCT). C’est la raison pour laquelle
        nous sommes transparents sur les ressources allouées et la manière dont
        elles sont employées.
      </p>

      <div className="fr-col-md-10 fr-background-alt--blue-france fr-p-6w fr-border-radius--16">
        <h2 className="fr-h2 fr-text-title--blue-france">Fonctionnement</h2>
        <p>
          La coop de la médiation numérique est une stat-up d’Etat : l’équipe est
          donc portée par une intrapreneuse agent public qui est responsable du
          service numérique développé au sein de son administration (ANCT en
          l’occurence).
        </p>
        <p>
          Le budget exposé ici ne prend pas en compte l’intrapreneuse puisqu’elle
          est salariée (fonctionnaire) de l’ANCT mais concerne le reste de
          l’équipe qui est constitué de free lance sur les volets Produit, Design,
          Développement et Déploiement.
        </p>
        <p>
          Membres de l’équipe :</p>
          <ul>
            <li>Manon Galle, Intrapreneuse</li>
            <li>Thibault Rouveyrol, Responsable de produit</li>
            <li>Hugues Maignol, Développeur</li>
            <li>Sylvain Aubry, Designer</li>
            <li>Alexandre Martinez, Chargé de déploiement/support</li>
            <li>Sarah Ouali, Chargée de déploiement/support</li>
          </ul>

        <p>
          L’ensemble des membres de l’équipe ne sont pas à temps plein sur le
          développement de La coop de la médiation mais développe, en parallèle,
          d’autres produits numériques pour l’ANCT.
        </p>
      </div>

      <div className="fr-col-md-10 fr-background-alt--blue-france fr-p-6w fr-border-radius--16 fr-mb-2w fr-mt-2w">
        <h2 className="fr-h2 fr-text-title--blue-france">Budget consommé</h2>

        <p>
          La coop de la médiation numérique est un service en construction ayant
          démarré son développement en février 2024. En 2023, 45 000€ a été dépensé pour la phase d'investigation.
        </p>

        <h4>Détail des postes de dépenses en 2024 :</h4>
        <div className="fr-table" data-fr-js-table="true">
          <table className="data-table" data-fr-js-table-element="true">
            <thead>
              <tr>
                <th className="fr-background-alt--blue-france" scope="col">
                  Poste de dépense
                </th>
                <th className="fr-background-alt--blue-france" scope="col">
                  Dépenses 2024
                </th>
                <th className="fr-background-alt--blue-france" scope="col">
                  Dépenses prévisionnelles T1 2025
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Produit</th>
                <td>140 465 €</td>
                <td>36 290 €</td>
              </tr>
              <tr>
                <th>Design</th>
                <td>172 698 €</td>
                <td>31 104 €</td>
              </tr>
              <tr>
                <th>Développement</th>
                <td> 199 758 €</td>
                <td>93 792 €</td>
              </tr>
              <tr>
                <th>Déploiement/support</th>
                <td>10 166 €</td>
                <td>18 774 €</td>
              </tr>
            </tbody>
          </table>
        </div>


      <div className="fr-flex fr-align-items-center fr-col-md-8">
          {/* Intégration du camembert */}
          <AccompagnementPieChart
            size={128}
            data={pieChartData} // Passage des données avec count et proportion
            colors={canauxAccompagnementColors}
          />

          <QuantifiedShareLegend
            classeName="fr-pl-3w"
            quantifiedShares={legendData} // Passage des mêmes données à la légende
            colors={canauxAccompagnementColors}
          />
      </div>
        <br/>
        <p>Au total, 568 087€ ont été investis dans le développement et le déploiement de La coop
        depuis le départ.</p>
      </div>



      <div className="fr-col-md-10 fr-background-alt--blue-france fr-p-6w fr-border-radius--16">
        <h4 className="fr-h2 fr-text-title--blue-france">A propos de la TVA</h4>
        <p>
          Contrairement aux entreprises du secteur privé, les administrations ne
          peuvent pas récupérer la TVA supportée sur leurs achats dans le cadre
          de leur activité. Le montant TTC inclut la TVA au taux de 20%. La TVA
          est collectée et reservée à l’Etat et diminue donc le montant du
          budget utilisable sur le projet.
        </p>
      </div>
    </main>
  </div>

)}
export default BudgetPage
