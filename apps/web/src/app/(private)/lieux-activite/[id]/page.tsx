import Image from 'next/image'
import Link from 'next/link'
import { DescriptionEditCard } from './_components/description/DescriptionEditCard'
import { InformationsGeneralesEditCard } from './_components/informations-generales/InformationsGeneralesEditCard'
import { InformationsPratiquesEditCard } from './_components/informations-pratiques/InformationsPratiquesEditCard'
import { ModalitesAccesAuServiceEditCard } from './_components/modalites-acces-au-service/ModalitesAccesAuServiceEditCard'
import { ServicesEtAccompagnementEditCard } from './_components/services-et-accompagnement/ServicesEtAccompagnementEditCard'
import { TypesDePublicsAccueillisEditCard } from './_components/types-de-publics-accueillis/TypesDePublicsAccueillisEditCard'

const LieuActiviteDetailPage = () => (
  <div className="fr-container fr-container--narrow fr-mb-16w">
    <span className="fr-flex fr-direction-row fr-align-items-center fr-flex-gap-4v fr-my-5w">
      <span
        className="ri-home-office-line ri-lg fr-line-height-1 fr-text-label--blue-france fr-background-alt--blue-france fr-p-2w fr-m-0 fr-border-radius--8"
        aria-hidden
      />
      <h1 className="fr-h3 fr-page-title fr-m-0">Lieu d’activité</h1>
    </span>
    <div className="fr-border fr-border-radius--8">
      <InformationsGeneralesEditCard
        nom="Nenettes & Co - Le Reseau"
        adresseBan={{
          id: '',
          commune: 'Saint-Denis',
          codePostal: '93210',
          codeInsee: '',
          nom: '19 Rue Proudhon',
          contexte: '',
          latitude: 0,
          longitude: 0,
        }}
      />
    </div>
    <div className="fr-border fr-border-radius--8 fr-mt-5w">
      <div className="fr-background-alt--blue-france fr-px-4w fr-py-5w fr-border-bottom fr-border-radius-top--8">
        <div className="fr-flex fr-align-items-center fr-flex-gap-6v">
          <Image
            className="fr-display-block"
            src="/images/services/cartographie-logo.svg"
            alt=""
            width={56}
            height={56}
          />
          <p className="fr-text--lg fr-text--bold fr-text-label--blue-france fr-mb-0">
            Votre lieu d’activité apparait sur la cartographie nationale des
            lieux d’inclusion numérique
          </p>
        </div>
        <div className="fr-py-4w">
          <div className="fr-flex fr-align-items-center fr-flex-gap-2v fr-mb-2w">
            <span
              className="ri-edit-line ri-lg ri-fw fr-text-label--blue-france"
              aria-hidden
            />
            <p className="fr-text--sm fr-mb-0">
              Renseignez des informations sur le lieu et les services
              d’inclusion numérique qui y sont proposés
            </p>
          </div>
          <div className="fr-flex fr-align-items-center fr-flex-gap-2v">
            <span
              className="fr-icon-compass-3-line ri-lg ri-fw fr-text-label--blue-france"
              aria-hidden
            />
            <p className="fr-text--sm fr-mb-0">
              Gagnez en visibilité et orientez les bénéficiaires grâce à la
              cartographie
            </p>
          </div>
        </div>
        <Link
          className="fr-link"
          href="https://cartographie.societenumerique.gouv.fr/presentation"
          target="_blank"
          rel="noreferrer"
        >
          En savoir plus sur la cartographie
        </Link>
      </div>
      <div className="fr-p-4w fr-flex fr-direction-column fr-flex-gap-4v">
        <div>
          <div
            className="fr-display-inline-block fr-icon-map-pin-2-line ri-lg fr-line-height-1 fr-text-label--blue-france fr-background-contrast--info fr-p-2w fr-border-radius--8 fr-p-2w fr-m-0 fr-border-radius--8"
            aria-hidden
          />
        </div>
        <div>
          <h2 className="fr-h4 fr-mb-0 fr-text-label--blue-france">
            Lieu accueillant du public
          </h2>
          <p className="fr-text--sm fr-mb-0">
            Renseignez ici des informations supplémentaires permettant d’ajouter
            du contexte sur le lieu et de faciliter l’accès au public.
          </p>
        </div>
      </div>
      <hr className="fr-hr-0" />
      <DescriptionEditCard
        typologies={['Association', 'Mairie']}
        presentationResume="Nénettes & Co – le réseau est une association qui a pour vocation d'accompagner toutes les femmes dans leurs projets professionnels."
        presentationDetail="L’idée est née d’un constat vis-à- vis des postes de dirigeants essentiellement occupés aujourd’hui par des hommes. Nous aspirons à supprimer un des plus grands obstacles à l’évolution professionnelle des femmes : leurs propres craintes ! Nous souhaitons les pousser à « oser » !<br/><br/>Convaincues que le changement passe d’abord par le développement de soi, nous souhaitons donner aux femmes les clés pour réussir à se lancer, notamment avec 3 axes de développement que nous détaillons dans « Nos Actions ». Nous sommes des Nénettes, des Femmes, des Nanas, des Minettes, des Demoiselles, des Cocottes, des Poupées, oui c’est vrai ! Et alors ? Nous voulons embarquer avec nous les Nanas qui assument d’être des Nénettes qui réussissent, des Minettes qui dirigent, des Cocottes qui managent ! Donnons-nous l’impulsion !<br/><br/>» Le succès, c’est vous aimer vous-même, c’est aimer ce que vous faites et c’est aimer comment vous le faites » – Maya Angelou"
      />
      <hr className="fr-hr-0 fr-mx-4w" />
      <InformationsPratiquesEditCard
        siteWeb="nombase.fr"
        lieuItinerant
        ficheAccesLibre="https://acceslibre.beta.gouv.fr/app/77-savigny-le-temple/a/soins-de-beaute/erp/100-zen/"
        horaires='Th 09:30-12:00,13:30-16:30; "Jeudi en semaine paire"'
      />
      <hr className="fr-hr-0" />
      <div className="fr-p-4w fr-flex fr-direction-column fr-flex-gap-4v">
        <div>
          <div
            className="fr-display-inline-block ri-service-line ri-lg fr-line-height-1 fr-text-label--blue-france fr-background-contrast--info fr-p-2w fr-border-radius--8 fr-p-2w fr-m-0 fr-border-radius--8"
            aria-hidden
          />
        </div>
        <div>
          <h2 className="fr-h4 fr-mb-0 fr-text-label--blue-france">
            Services d’inclusion numérique
          </h2>
          <p className="fr-text--sm fr-mb-0">
            Renseignez des informations sur les services d’inclusion numérique
            proposés dans ce lieu afin d’orienter les bénéficiaires.
          </p>
        </div>
      </div>
      <hr className="fr-hr-0" />
      <ServicesEtAccompagnementEditCard
        services={[
          'Aide aux démarches administratives',
          'Maîtrise des outils numériques du quotidien',
          'Insertion professionnelle via le numérique',
          'Utilisation sécurisée du numérique',
          'Parentalité et éducation avec le numérique',
          'Loisirs et créations numériques',
          'Compréhension du monde numérique',
          'Accès internet et matériel informatique',
          'Acquisition de matériel informatique à prix solidaire',
        ]}
        modalitesAccompagnement={[
          'En autonomie',
          'Accompagnement individuel',
          'Atelier collectif',
          'À distance',
        ]}
      />
      <hr className="fr-hr-0 fr-mx-4w" />
      <ModalitesAccesAuServiceEditCard
        fraisACharge={['Gratuit', 'Gratuit sous condition', 'Payant']}
        modalitesAcces={{
          surPlace: true,
          parTelephone: true,
          parMail: true,
          numeroTelephone: '05 50 59 43 14',
          adresseMail: 'hubmnv@mail.com',
        }}
      />
      <hr className="fr-hr-0 fr-mx-4w" />
      <TypesDePublicsAccueillisEditCard
        priseEnChargeSpecifique={[
          'Jeunes',
          'Étudiants',
          'Familles et/ou enfants',
        ]}
        toutPublic={false}
        publicsSpecifiquementAdresses={[
          'Surdité',
          'Handicaps moteurs',
          'Handicaps mentaux',
          'Langues étrangères (anglais)',
          'Langues étrangères (autres)',
        ]}
      />
    </div>
  </div>
)

export default LieuActiviteDetailPage
