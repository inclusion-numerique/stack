import Link from 'next/link'
import Accordion from '@codegouvfr/react-dsfr/Accordion'

export const Faq = () => (
  <div className="fr-container">
    <div className="fr-text--center">
      <h2 className="fr-h1">Questions fréquentes</h2>
      <p className="fr-mb-6w">
        Pour en savoir plus, visitez notre{' '}
        <Link
          className="fr-link"
          target="_blank"
          href="https://incubateurdesterritoires.notion.site/Centre-d-aide-de-La-Coop-de-la-m-diation-num-rique-e2db421ac63249769c1a9aa155af5f2f"
        >
          centre d’aide
        </Link>
        .
      </p>
    </div>
    <div className="fr-accordions-group fr-container--medium fr-mx-auto">
      <Accordion label="Qui peut utiliser La Coop de la médiation numérique ?">
        La Coop de la médiation numérique est à destination des médiateur·rice·s
        numériques professionnel·le·s, conseillers numériques et
        coordinateur.trice.s de conseillers numériques.
      </Accordion>
      <Accordion
        className="wip-outline"
        label="Comment s’inscrire à La Coop de la médiation numérique ?"
      >
        Accordion 2
      </Accordion>
      <Accordion
        className="wip-outline"
        label="Qui a accès aux informations sur mes bénéficiaires ?"
      >
        <p>
          Vous seul avez accès aux données concernant les bénéficiaires que vous
          avez enregistrés, qu’il s’agisse des informations personnelles ainsi
          que l’historique de ses accompagnements.
        </p>
        <p>
          Les seules informations sur vos bénéficiaires transmises à France
          Numérique Ensemble sont les données socio-démographiques (genre,
          tranche d’âge, statut et commune de résidence), sous la forme de
          statistiques générales au niveau du territoire et anonymisées.
        </p>
        <Link
          href="https://incubateurdesterritoires.notion.site/En-savoir-plus-sur-l-utilisation-des-donn-es-sur-la-Coop-de-la-m-diation-num-rique-82af14ef964b41c1bfb5cb4a01d6e40b"
          className="fr-link"
        >
          En savoir plus l’utilisation des données sur la plateforme
        </Link>
      </Accordion>
      <Accordion
        className="wip-outline"
        label="Est-il important de remplir un compte-rendu d’activité à chaque accompagnement ?"
      >
        Accordion 4
      </Accordion>
      <Accordion
        className="wip-outline"
        label="Comment exporter un rapport PDF de mes activités ?"
      >
        Accordion 5
      </Accordion>
    </div>
  </div>
)
