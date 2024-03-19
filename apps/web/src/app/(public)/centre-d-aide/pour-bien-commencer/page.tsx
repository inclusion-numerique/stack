/* eslint jsx-a11y/control-has-associated-label: 0  */
import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Link from 'next/link'



export const revalidate = 0
export const metadata: Metadata = {
  title: metadataTitle(`Pour bien commencer`),
}

const ContentPolicyPage = () => (
  <div className="fr-container">
    <Breadcrumbs currentPage="Pour bien commencer" />
    <div className="fr-container landing-main-container fr-my-8w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-md-8">
          <h1 className="fr-page-title">Pour bien commencer</h1>
          <img src="/images/centre-d-aide/Frame341.svg"/>
          <h2 className="fr-page-title ">Les Bases du numérique d’intérêt général, de quoi parle-t-on ?</h2>
            <p><strong>La plateforme collaborative de partage de ressources & communs numériques à l’échelle nationale.</strong></p>
            <p>Sans se substituer aux sites internet, bibliothèques d’outils,
                ressourceries... qui existent déjà, Les Bases a pour vocation
                de devenir le centre de ressources des acteurs du numérique
                d’intérêt général en rendant accessible, pour la première fois
                au niveau national, l'ensemble des contenus et outils
                produits par et pour le secteur.</p>
            <p>Les Bases est une plateforme ouverte à toutes celles et ceux
                intéressés par le partage de ressources en lien avec le
                numérique d’intérêt général. Que vous soyez agent public ou
                salarié privé, médiateur ou aidant numérique, il existe
                forcément une bonne raison d’utiliser Les Bases !</p>
            <h4>Quel est l’objectif de cette plateforme ?</h4>
            <p>Il n’existe pas aujourd’hui d’espace partagé (ou plusieurs, mais non-
                exhaustifs, ou parfois peu maintenus) répertoriant les dispositifs et
                ressources de l’inclusion numérique et du numérique d’intérêt général. Or, le
                besoin des professionnels de l’inclusion et de la médiation numérique, des
                acteurs locaux et des collectivités territoriales d’un outil dédié au
                recensement d’outils et de ressources est récurrent.</p>
            <p>Le programme Société Numérique de l'Agence Nationale de la Cohésion
                des Territoires (ANCT) a souhaité créer dans ce cadre un outil utile au
                quotidien pour les acteurs de l'inclusion et de la médiation numérique, leur
                permettant de :</p>
            <ul>
                <li>Mettre en lumière la richesse de l’offre déjà existante</li>
                <li>Stimuler la création de nouvelles ressources répondant à des besoins collectivement identifiés</li>
                <li>Favoriser une large diffusion, utilisation et appropriation des ressources.</li>
            </ul>
            <h4>Comment utiliser cette plateforme ?</h4>
            <h6>Faire de la veille</h6>
            <p><strong>Inspirez-vous des ressources produites par une communauté au service du numérique d'intérêt général.</strong></p>
            <p>La Base du numérique d'intérêt général permet de rechercher, prendre
                connaissance, et s’inspirer des ressources produites par la communauté
                grâce à un moteur de recherche et des thématiques adaptées, avec la
                possibilité d’enregistrer des ressources ou des collections partagées par
                d’autres.</p>
            <h6>Produire & diffuser des ressources</h6>
            <p><strong>Présentez, valorisez & publiez vos ressources afin qu’elles soient diffusées auprès d’un large public.</strong></p>
            <p>Les Bases du numérique d'intérêt général permet de présenter et mettre en
                valeur vos ressources grâce à un système modulaire de présentation des
                contenus, qui vous donne toute la liberté pour composer de vraies pages
                d’information et de démonstration (exemples d’utilisation, conditions pour
                l’utilisation des outils, la reproduction et l’adaptation des initiatives...). Ces
                pages peuvent ensuite être rendues publiques, c’est-à-dire consultables par
                tous, qu’ils soient membres ou non de la plateforme.</p>
            <h6>Contribuer à une communauté</h6>
            <p>Collaborez avec d’autres utilisateurs & contribuez à la création et
                l’amélioration de ressources, localement ou à l’échelle nationale.
            </p>
            <h4>Qui peut utiliser cette plateforme ?</h4>
            <p>Cette plateforme contributive est ouverte à toutes les personnes qui
                souhaitent découvrir et/ou publier et partager des ressources dédiées à
                l’inclusion, la médiation numérique et le numérique d’intérêt général.</p>
            <p>Cette plateforme est notamment destinée à l’ensemble des acteurs du numérique d’intérêt général :</p>
            <ul>
                <li>Aidants numériques</li>
                <li>Médiateurs numériques</li>
                <li>Travailleurs sociaux</li>
                <li>Agents publics</li>
                <li>Travailleurs associatifs et salariés de l’ESS</li>
                <li>Agents de collectivités</li>
                <li>Élus</li>
                <li>Enseignants & professionnels de la formation</li>
                <li>Entreprises</li>
                <li>Autres professionnels</li>
            </ul>
            <hr/>
            <h2 className="fr-page-title">Créer son compte & se connecter</h2>
            <h3>Création de compte</h3>
            <h4>Inclusion Connect</h4>
            <p>Inclusion Connect (https://connect.inclusion.beta.gouv.fr/accounts/register/)
                est une solution de connexion unique à plusieurs services publics pour les
                professionnels de l'inclusion.
                Vous pouvez créer votre compte sur Les Bases, et vous y connecter par le
                biais d’Inclusion Connect, qui fournira votre nom, prénom et email à la
                plateforme Les Bases.</p>
            <h4>Email</h4>
            <p>Renseignez votre nom, prénom et email, et votre compte est prêt à être utilisé !</p>
            <h2>Se connecter</h2>
            <h4>Inclusion Connect</h4>
            <p>Inclusion Connect (https://connect.inclusion.beta.gouv.fr/accounts/register/)
                est une solution de connexion unique à plusieurs services publics pour les
                professionnels de l'inclusion.</p>
            <p>Vous pouvez créer votre compte sur Les Bases, et vous y connecter par le
                biais d’Inclusion Connect, qui fournira votre nom, prénom et email à la
                plateforme Les Bases.</p>
            <h4>Connexion par email</h4>
            <p>Vous pouvez également renseigner l’email utilisé pour votre compte et vous
                recevrez un lien de connexion pour vous connecter. Pas besoin de
                retenir de mot de passe !</p>
            <hr/>
            <h2 className="fr-page-title">Profitez dès à présent de votre profil</h2>
            <h3>Création de compte</h3>
            <h4>Inclusion Connect</h4>
            <p>Inclusion Connect (https://connect.inclusion.beta.gouv.fr/accounts/register/)
                est une solution de connexion unique à plusieurs services publics pour les
                professionnels de l'inclusion.</p>
            <p>Vous pouvez créer votre compte sur Les Bases, et vous y connecter par le
                biais d’Inclusion Connect, qui fournira votre nom, prénom et email à la
                plateforme Les Bases.</p>
            <h4>Email</h4>
            <p>Renseignez votre nom, prénom et email, et votre compte est prêt à être
                utilisé !</p>
            <h2>Se connecter</h2>
          <Notice className="fr-mb-2w"
                  title=<div className="fr-text--regular "> <span className="fr-text-default--grey">À savoir pour les utilisateurs de la 1ère version de la plateforme</span>{" "}<Link  href="">En savoir plus ici</Link></div>
      />
            <p>Lorsque vous vous inscrivez sur Les Bases du numérique d’intérêt général, un
                profil est automatiquement créé avec les informations que vous remplissez
                lors de votre inscription. Ce profil est donc personnel et individuel.</p>
            <p>Grâce à votre profil, vous pouvez :</p>
                <ul><li>Créer et publiez directement vos ressources depuis votre profil</li>
                    <li>Enregistrer des ressources qui vous intéressent grâce aux collections.</li>
                    <li>Enregistrer des ressources qui vous intéressent grâce aux collections.</li>
                    <li>Rejoindre une ou plusieurs bases pour collaborer à la création de ressources.</li>
                    <li>Suivre les bases et les profils qui vous intéressent pour les retrouver plus facilement.</li>
                    </ul>
        <Notice className="fr-mb-2w"
                title=<Link  href="">Retrouvez ici plus d’informations sur comment utiliser votre profil</Link>
/>
        </div>
      </div>
    </div>
  </div>
)
export default ContentPolicyPage
