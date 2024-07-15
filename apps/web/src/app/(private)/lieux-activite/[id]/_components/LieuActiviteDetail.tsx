import React from 'react'
import { DisplayOnCartography } from '@app/web/components/structure/DisplayOnCartography'
import { DescriptionEditCard } from './description/DescriptionEditCard'
import { InformationsGeneralesEditCard } from './informations-generales/InformationsGeneralesEditCard'
import { InformationsPratiquesEditCard } from './informations-pratiques/InformationsPratiquesEditCard'
import { ModalitesAccesAuServiceEditCard } from './modalites-acces-au-service/ModalitesAccesAuServiceEditCard'
import { ServicesEtAccompagnementEditCard } from './services-et-accompagnement/ServicesEtAccompagnementEditCard'
import { TypesDePublicsAccueillisEditCard } from './types-de-publics-accueillis/TypesDePublicsAccueillisEditCard'
import { VisiblePourCartographieNationaleFields } from './visible-pour-cartographie-nationale/VisiblePourCartographieNationaleFields'

export const LieuActiviteDetail = ({
  visiblePourCartographieNationale,
}: {
  visiblePourCartographieNationale: boolean
}) => (
  <>
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
        complementAdresse="Bâtiment 5"
        siret="2251651651"
      />
    </div>
    <div className="fr-border fr-border-radius--8 fr-mt-5w">
      <DisplayOnCartography />
      <hr className="fr-separator fr-separator-1px" />
      <div className="fr-px-4w fr-pt-4w fr-pb-0">
        <VisiblePourCartographieNationaleFields
          visiblePourCartographieNationale={visiblePourCartographieNationale}
        />
      </div>
      {visiblePourCartographieNationale && (
        <>
          <hr className="fr-separator fr-separator-1px" />
          <div className="fr-p-4w fr-flex fr-direction-column fr-flex-gap-4v">
            <div>
              <div
                className="fr-display-inline-block fr-icon-map-pin-2-line ri-lg fr-line-height-1 fr-text-label--blue-france fr-background-contrast--info fr-p-2w fr-border-radius--8 fr-p-2w fr-m-0 fr-border-radius--8"
                aria-hidden
              />
            </div>
            <div>
              <h2
                className="fr-h4 fr-mb-0 fr-text-label--blue-france"
                id="description"
              >
                Lieu accueillant du public
              </h2>
              <p className="fr-text--sm fr-mb-0">
                Renseignez ici des informations supplémentaires permettant
                d’ajouter du contexte sur le lieu et de faciliter l’accès au
                public.
              </p>
            </div>
          </div>
          <hr className="fr-separator-1px" />
          <DescriptionEditCard
            typologies={['Association', 'Mairie']}
            presentationResume="Nénettes & Co – le réseau est une association qui a pour vocation d'accompagner toutes les femmes dans leurs projets professionnels."
            presentationDetail="L’idée est née d’un constat vis-à- vis des postes de dirigeants essentiellement occupés aujourd’hui par des hommes. Nous aspirons à supprimer un des plus grands obstacles à l’évolution professionnelle des femmes : leurs propres craintes ! Nous souhaitons les pousser à « oser » !<br/><br/>Convaincues que le changement passe d’abord par le développement de soi, nous souhaitons donner aux femmes les clés pour réussir à se lancer, notamment avec 3 axes de développement que nous détaillons dans « Nos Actions ». Nous sommes des Nénettes, des Femmes, des Nanas, des Minettes, des Demoiselles, des Cocottes, des Poupées, oui c’est vrai ! Et alors ? Nous voulons embarquer avec nous les Nanas qui assument d’être des Nénettes qui réussissent, des Minettes qui dirigent, des Cocottes qui managent ! Donnons-nous l’impulsion !<br/><br/>» Le succès, c’est vous aimer vous-même, c’est aimer ce que vous faites et c’est aimer comment vous le faites » – Maya Angelou"
          />
          <hr className="fr-separator-1px fr-mx-4w" />
          <InformationsPratiquesEditCard
            siteWeb="nombase.fr"
            lieuItinerant
            ficheAccesLibre="https://acceslibre.beta.gouv.fr/app/77-savigny-le-temple/a/soins-de-beaute/erp/100-zen/"
            horaires='Th 09:30-12:00,13:30-16:30; "Jeudi en semaine paire"'
          />
          <hr className="fr-separator-1px" />
          <div className="fr-p-4w fr-flex fr-direction-column fr-flex-gap-4v">
            <div>
              <div
                className="fr-display-inline-block ri-service-line ri-lg fr-line-height-1 fr-text-label--blue-france fr-background-contrast--info fr-p-2w fr-border-radius--8 fr-p-2w fr-m-0 fr-border-radius--8"
                aria-hidden
              />
            </div>
            <div>
              <h2
                className="fr-h4 fr-mb-0 fr-text-label--blue-france"
                id="services-et-accompagnement"
              >
                Services d’inclusion numérique
              </h2>
              <p className="fr-text--sm fr-mb-0">
                Renseignez des informations sur les services d’inclusion
                numérique proposés dans ce lieu afin d’orienter les
                bénéficiaires.
              </p>
            </div>
          </div>
          <hr className="fr-separator-1px" />
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
          <hr className="fr-separator-1px fr-mx-4w" />
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
          <hr className="fr-separator-1px fr-mx-4w" />
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
        </>
      )}
    </div>
  </>
)
