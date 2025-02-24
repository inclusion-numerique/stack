import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: metadataTitle('Politique de confidentialité'),
}

const ConfidentialityPage = () => (
  <div className="fr-container">
    <SkipLinksPortal links={defaultSkipLinks} />
    <Breadcrumbs currentPage="Politique de confidentialité" />
    <main
      id={contentId}
      className="fr-container landing-main-container fr-my-8w"
    >
      <h1>Politique de confidentialité - {process.env.NEXT_PUBLIC_APP_NAME}</h1>

      <h2>Qui sommes-nous ?</h2>

      <p>
        La coop de la médiation numérique est un service public numérique
        développé au sein de l’Incubateur des territoires de l’Agence Nationale
        de la Cohésion des Territoires (ANCT). Son objectif est d’intégrer un
        panel d’outils à destination des médiateurs et médiatrices numériques,
        notamment pour faciliter l’interconnexion entre les outils développés
        par le programme Société Numérique de l’ANCT et les acteurs de la
        médiation numérique.
      </p>
      <p>
        Le responsable de traitement est l’ANCT représentée par Monsieur
        Stanislas Bourron, Directeur général de l’Agence.
      </p>

      <h2>Pourquoi traitons-nous des données à caractère personnel ?</h2>

      <p>
        La coop de la médiation numérique traite des données à caractère
        personnel pour mettre à disposition de tous les médiateurs numériques
        une gamme d’outils qui les aide dans leurs activités professionnelles
        d’accompagnement à la montée en compétence de la population sur les
        compétences numériques.
      </p>
      <p>Les données sont notamment traitées pour :</p>
      <ul>
        <li>
          Fournir un accès authentifié à la plateforme aux médiateurs numériques
          professionnels ;
        </li>
        <li>
          Transmettre les données des bénéficiaires à l’entrepôt de données
          partagé de l’inclusion numérique notamment pour mesurer la montée en
          compétence de la population dans le numérique et s’interconnecter avec
          d’autres dispositifs ;
        </li>
        <li>Gérer l’inscription et la diffusion de la newsletter ;</li>
        <li>Recueillir les demandes au sein d’un formulaire de contact.</li>
      </ul>
      <p>
        Les médiateurs numériques professionnels sont responsables de traitement
        des données des bénéficiaires uniquement pour assurer leur suivi.
      </p>

      <br />
      <h2>
        Quelles sont les données à caractère personnel que nous traitons ?
      </h2>

      <p>Les données traitées sont les suivantes :</p>
      <ul>
        <li>
          Données relatives aux comptes des médiateurs : nom, prénom, courriel,
          numéro de téléphone (facultatif) ;
        </li>
        <li>
          Données relatives aux bénéficiaires pour la transmission à l’entrepôt
          de données partagé de l’inclusion numérique : nom, prénom, année de
          naissance ;
        </li>
        <li>
          Données relatives à la lettre d’information : nom, prénom, adresse
          courriel ;
        </li>
        <li>
          Données relatives au formulaire de contact : nom, prénom, adresse
          courriel.
        </li>
      </ul>

      <br />

      <h2>
        Qu’est-ce qui nous autorise à traiter des données à caractère personnel
        ?
      </h2>

      <p>
        Le traitement est nécessaire à l’exécution d’une mission d’intérêt
        public ou relevant de l’exercice de l’autorité publique dont est
        investie l’ANCT en tant que responsable de traitement, au sens de
        l’article 6-1 e) du RGPD.
      </p>

      <p>
        Cette mission d’intérêt public se traduit en pratique notamment par
        l’article L. 1231-2 du code général des collectivités territoriales.
      </p>

      <br />

      <h2>Pendant combien de temps conservons-nous vos données ?</h2>

      <div className="fr-table" data-fr-js-table="true">
        <table className="data-table" data-fr-js-table-element="true">
          <thead>
            <tr>
              <th scope="col">Catégories de données</th>
              <th scope="col">Durée de conservation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Données relatives aux comptes des médiateurs</th>
              <td>1 an après le dernier contact avec l’utilisateur</td>
            </tr>
            <tr>
              <th>Données relatives aux bénéficiaires</th>
              <td>1 an après la dernière mise à jour des données</td>
            </tr>
            <tr>
              <th>Données relatives à la lettre d’information</th>
              <td>
                Jusqu’à la désinscription de l’utilisateur et 1 an après sa
                demande de désinscription
              </td>
            </tr>
            <tr>
              <th>Données relatives au formulaire de contact</th>
              <td>1 an après l’envoi du message par l’utilisateur</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Quels sont vos droits ?</h2>

      <p>Vous disposez :</p>

      <ul>
        <li>D’un droit d’information et d’accès à vos données ;</li>
        <li>D’un droit de rectification ;</li>
        <li>D’un droit d’opposition ;</li>
        <li>D’un droit à la limitation du traitement de vos données.</li>
      </ul>

      <p>
        Pour exercer vos droits, vous pouvez nous contacter à :
        <a
          href={
            PublicWebAppConfig.contactEmail &&
            `mailto:${PublicWebAppConfig.contactEmail}`
          }
        >
          {PublicWebAppConfig.contactEmail}
        </a>
      </p>
      <p>
        Puisque ce sont des droits personnels, nous ne traiterons votre demande
        que si nous sommes en mesure de vous identifier. Dans le cas contraire,
        nous pouvons être amenés à vous demander une preuve de votre identité.
      </p>
      <p>
        Nous nous engageons à répondre à votre demande dans un délai raisonnable
        qui ne saurait excéder 1 mois à compter de la réception de votre
        demande.
      </p>
      <p>
        Si vous estimez que vos droits n’ont pas été respectés après nous avoir
        contactés, vous pouvez adresser une réclamation à la CNIL.
      </p>

      <h2>Qui peut avoir accès à vos données ?</h2>

      <p>
        Seuls les membres habilités de l’équipe de la coop de la médiation
        numérique (administrateurs, développeurs notamment) ont accès à vos
        données, dans le cadre de leurs missions.
      </p>
      <p>
        L’entrepôt de données partagé de l’inclusion numérique est destinataire
        des données des bénéficiaires pour notamment mesurer la montée en
        compétence de la population dans l’usage du numérique et construire des
        partenariats avec des prescripteurs d’accompagnements de médiation
        numérique.
      </p>

      <h2>Qui nous aide à traiter vos données ?</h2>

      <p>
        Certaines données sont communiquées à des « sous-traitants » qui
        agissent pour le compte de l’ANCT, selon ses instructions.
      </p>

      <div className="fr-table" data-fr-js-table="true">
        <table className="data-table" data-fr-js-table-element="true">
          <thead>
            <tr>
              <th scope="col">Sous-traitant</th>
              <th scope="col">Traitement réalisé</th>
              <th scope="col">Pays destinataire</th>
              <th scope="col">Garanties</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Scaleway</th>
              <td>Hébergement</td>
              <td>France</td>
              <td>
                <a
                  href="https://www-uploads.scaleway.com/DPA_FR_v17072024_439cb4fdae.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Lien vers les garanties
                  <span className="fr-sr-only">Ouvre une nouvelle fenêtre</span>
                </a>
              </td>
            </tr>
            <tr>
              <th>Brevo</th>
              <td>Gestion de la lettre d’information</td>
              <td>France</td>
              <td>
                <a
                  href="https://www.brevo.com/legal/termsofuse/#data-processing-agreement-dpa"
                  target="_blank"
                  rel="noreferrer"
                >
                  Lien vers les garanties
                  <span className="fr-sr-only">Ouvre une nouvelle fenêtre</span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Témoins de connexion et traceurs</h2>

      <p>
        Un témoin de connexion est un fichier déposé sur votre terminal lors de
        la visite d’un site. Il a pour but de collecter des informations
        relatives à votre navigation et de vous adresser des services adaptés à
        votre terminal (ordinateur, mobile ou tablette).
      </p>

      <p>
        En application de l’article 5-3 de la directive ePrivacy, transposée à
        l’article 82 de la loi n° 78-17 du 6 janvier 1978 relative à
        l’informatique, aux fichiers et aux libertés, les témoins de connexion
        et traceurs suivent deux régimes distincts.
      </p>

      <p>
        D’une part, ceux strictement nécessaires au service ou ayant pour
        finalité exclusive de faciliter la communication par voie électronique,
        sont dispensés de consentement préalable.
      </p>
      <p>
        D’autre part, ceux n’étant pas strictement nécessaires au service ou
        n’ayant pas pour finalité exclusive de faciliter la communication par
        voie électronique, doivent être consenti par l’utilisateur.
      </p>
      <p>
        Ce consentement de la personne concernée constitue une base légale au
        sens du RGPD, à savoir l’article 6-1 a).
      </p>
      <p>
        La coop de la médiation numérique ne dépose que des témoins de connexion
        et traceurs strictement nécessaires au fonctionnement du service et la
        solution de mesure d’audience « Matomo », configurée en mode « exempté »
        et ne nécessitant pas de recueil du consentement, conformément aux
        recommandations de la CNIL.
      </p>

      <div className="fr-mb-3w" id="piwik-consent">
        <iframe
          title="Matomo"
          style={{ border: 0, height: 200, width: 600 }}
          src="https://matomo.incubateur.anct.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=en&backgroundColor=&fontColor=&fontSize=16px&fontFamily=Helvetica"
        />
      </div>

      <p>Pour en savoir plus sur les cookies :</p>
      <ul>
        <li>
          <a
            href="https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi"
            target="_blank"
            rel="noreferrer"
          >
            Cookies &amp; traceurs : que dit la loi ?
            <span className="fr-sr-only">Ouvre une nouvelle fenêtre</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser"
            target="_blank"
            rel="noreferrer"
          >
            Cookies : les outils pour les maîtriser
            <span className="fr-sr-only">Ouvre une nouvelle fenêtre</span>
          </a>
        </li>
      </ul>
      <p />

      <h2>
        Quelles sont les mesures de sécurité que nous avons mis en place ?
      </h2>

      <p>
        Les moyens de sécurisation suivants ont notamment été mis en œuvre :
      </p>

      <ul>
        <li>
          Contrôle d’accès : la base de données des utilisateurs n’est
          accessible qu’aux seuls membres de l’administration du service ;
        </li>
        <li>
          Mesures de traçabilité : les logs applicatifs permettent de savoir qui
          a eu accès à cette base de données ;
        </li>
        <li>
          Mesures de protection des logiciels : les mises à jour et les mesures
          de protection sont assurées par l’hébergeur Scaleway ;
        </li>
        <li>
          Sauvegarde des données : les sauvegardes sont assurées par l’hébergeur
          Scaleway ;
        </li>
        <li>Chiffrement des données : site uniquement accessible en HTTPS.</li>
      </ul>
    </main>
  </div>
)
export default ConfidentialityPage
