import classNames from 'classnames'
import React from 'react'
import NavigationSideMenu from '@app/ui/components/NavigationSideMenu'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Button from '@codegouvfr/react-dsfr/Button'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import {
  BesoinsIngenierieFinanciereForForm,
  GouvernanceForForm,
} from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getGouvernanceForForm'
import BackLink from '@app/web/components/BackLink'
import {
  gouvernanceHomePath,
  GouvernanceScope,
  imprimerGouvernancePath,
  modifierGouvernancePath,
} from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import PrintButton from '@app/web/app/(private-print)/PrintButton'
import WhiteCard from '@app/web/ui/WhiteCard'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { nameOrEmail } from '@app/web/utils/nameOrEmail'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import BesoinCardContent from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/priorisation/BesoinCardContent'
import { getPriorisationCardInfos } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/[gouvernanceId]/besoins-ingenierie-financiere/priorisation/getPriorisationCardInfos'
import { getBesoinsEnIngenieriePriorisationDefaultValues } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/besoinsEnIngenieriePriorisationDefaultValues'
import GouvernancePressentieDetails from '@app/web/app/(private)/gouvernances/GouvernancePressentieDetails'
import {
  gouvernanceFormSections,
  gouvernanceFormSectionSideMenuItems,
} from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceFormSections'
import { getGouvernanceScopeTitle } from '@app/web/app/(private)/gouvernances/gouvernanceScopeTitle'
import { limiteModificationDesGouvernances } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceMetadata'
import {
  getActorFromCode,
  membreToFormMembre,
} from '@app/web/gouvernance/GouvernanceActor'
import {
  frequenceComiteMasculin,
  perimetreFeuilleDeRouteLabels,
  typeComite,
  typeContratLabels,
} from '@app/web/gouvernance/gouvernanceWordingsAndOptions'
import styles from './GouvernanceDetails.module.css'

const GouvernanceDetails = async ({
  gouvernance,
  besoins,
  scope,
  print,
}: {
  gouvernance: GouvernanceForForm
  besoins: BesoinsIngenierieFinanciereForForm | null
  scope: GouvernanceScope
  print?: boolean
}) => {
  const {
    id,
    createur,
    creation,
    modification,
    derniereModificationPar,
    organisationsRecruteusesCoordinateurs,
    noteDeContexte,
    membres,
    comites,
    feuillesDeRoute,
    v2Enregistree,
    sousPrefetReferentPrenom,
    sousPrefetReferentEmail,
    sousPrefetReferentNom,
    departement,
  } = gouvernance

  const scopeTitle = await getGouvernanceScopeTitle(scope)

  const breadCrumbs = print ? null : (
    <div className="fr-container">
      <Breadcrumb
        currentPageLabel="Détails"
        segments={[
          {
            label: "Page d'accueil",
            linkProps: {
              href: '/',
            },
          },
          {
            label: `Gouvernance - ${scopeTitle}`,
            linkProps: {
              href: gouvernanceHomePath(scope),
            },
          },
        ]}
      />
    </div>
  )

  if (!v2Enregistree && !besoins) {
    return (
      <>
        {breadCrumbs}
        <div className="fr-container fr-container--medium fr-py-10v fr-mb-30v ">
          <GouvernancePressentieDetails
            gouvernance={gouvernance}
            scope={scope}
          />
        </div>
      </>
    )
  }

  const titleDepartement = `${departement.nom} (${departement.code})`

  const besoinCardInfos = besoins
    ? getPriorisationCardInfos({
        defaultValue: getBesoinsEnIngenieriePriorisationDefaultValues({
          ...gouvernance,
          besoinsEnIngenierieFinanciere: besoins,
        }),
        besoinsEnIngenierieFinanciere: besoins,
      })
    : []

  const sideMenuItems = [
    ...gouvernanceFormSectionSideMenuItems,
    {
      text: 'Besoins en ingénierie financière',
      linkProps: { href: '#besoins-ingenierie-financiere' },
    },
  ]

  const creationMeta = creation
    ? `${dateAsDay(creation)} par ${nameOrEmail(createur)}`
    : null

  const modificationMeta = gouvernance
    ? `${dateAsDay(modification)} par ${nameOrEmail(derniereModificationPar)}`
    : null

  const displayModificationMeta = modificationMeta !== creationMeta

  const formMembres = membres.map(membreToFormMembre)
  const collectiviteMembres = formMembres.filter(
    ({ code }) => getActorFromCode(code).type !== 'structure',
  )
  const structureMembres = formMembres.filter(
    ({ code }) => getActorFromCode(code).type === 'structure',
  )
  const coporteursMembres = formMembres.filter(({ coporteur }) => coporteur)

  return (
    <>
      {breadCrumbs}
      <div
        className={classNames(
          'fr-container fr-pb-10v fr-mb-20v',
          print && 'fr-container--narrow',
          print && styles.print,
        )}
      >
        <div className="fr-grid-row">
          {/* Same offset that main part */}
          {!print && (
            <div className="fr-col-12 fr-col-md-4 fr-col-lg-3 fr-mb-8v" />
          )}
          <div
            className={classNames(
              print
                ? 'fr-col-12'
                : 'fr-col-12 fr-col-md-8 fr-col-lg-7 fr-col-xl-6',
            )}
          >
            <div className="fr-hidden-print fr-width-full fr-flex fr-justify-content-space-between fr-align-items-center">
              <BackLink href={gouvernanceHomePath(scope)} />
              {print && <PrintButton />}
            </div>
            <h1 className="fr-mb-2v   fr-mt-6v fr-text-title--blue-france">
              Proposition de gouvernance
            </h1>
            <h2 className="fr-mb-2v fr-text-title--blue-france">
              {titleDepartement}
            </h2>
            <p
              className={classNames(
                print ? 'fr-mb-6v' : 'fr-mb-0',
                'fr-text--sm fr-text-mention--grey',
              )}
            >
              Déposée le {creationMeta}
              {displayModificationMeta && ` · Modifiée le ${modificationMeta}`}
            </p>
            {!print && (
              <Notice
                className="fr-mt-6v fr-mb-12v"
                title={
                  <span className="fr-flex fr-width-full fr-align-items-center fr-justify-content-space-between">
                    <span>
                      Proposition modifiable jusqu’au{' '}
                      <strong>
                        {dateAsDay(limiteModificationDesGouvernances)}
                      </strong>
                    </span>
                    {!!scope.codeDepartement && (
                      <Button
                        size="small"
                        priority="tertiary no outline"
                        iconId="fr-icon-edit-line"
                        className="fr-color-inherit"
                        linkProps={{
                          href: modifierGouvernancePath(scope, id),
                        }}
                      >
                        Modifier
                      </Button>
                    )}
                  </span>
                }
              />
            )}
            {!print && (
              <Button
                className="fr-mb-6v"
                iconId="fr-icon-download-line"
                priority="tertiary"
                linkProps={{
                  href: imprimerGouvernancePath(scope, id),
                }}
              >
                Imprimer ou télécharger
              </Button>
            )}
          </div>
        </div>
        <div className="fr-grid-row">
          {!print && (
            <div className="fr-col-12 fr-col-md-4 fr-col-lg-3 fr-mb-8v">
              <NavigationSideMenu
                items={sideMenuItems}
                burgerMenuButtonText="Sections"
                contentId="gouvernance-form"
                sticky
              />
            </div>
          )}
          <div
            className={classNames(
              print
                ? 'fr-col-12'
                : 'fr-col-12 fr-col-md-8 fr-col-lg-7 fr-col-xl-6',
            )}
            style={{
              // Use negative margin top to align side menu but keep margin top for scroll
              marginTop: -24,
            }}
          >
            {/* Wrapper div for anchor navigation with padding */}
            <div
              id={gouvernanceFormSections.contactDuSousPrefetReferent.id}
              className="fr-pt-6v"
            >
              <WhiteCard className={styles.box}>
                <h5>
                  {gouvernanceFormSections.contactDuSousPrefetReferent.title}
                </h5>
                <hr className="fr-separator-8v" />
                <p
                  className={classNames(
                    print ? 'fr-mb-0' : 'fr-mb-2v',
                    'fr-text--medium',
                  )}
                >
                  {sousPrefetReferentPrenom} {sousPrefetReferentNom}
                  <br />
                  {sousPrefetReferentEmail}
                </p>
              </WhiteCard>
            </div>
            <div
              id={gouvernanceFormSections.coporteursDeLaGouvernance.id}
              className="fr-pt-6v"
            >
              <WhiteCard className={styles.box}>
                <h5>
                  {gouvernanceFormSections.coporteursDeLaGouvernance.title}
                </h5>
                {coporteursMembres.length === 0 && (
                  <>
                    <hr className="fr-separator-8v" />
                    <p>
                      Pas de collectivité co-porteuse identifiée, la préfecture
                      sera l’unique porteuse de la gouvernance
                    </p>
                  </>
                )}
                {coporteursMembres.map(({ nom, code }, index) => (
                  <>
                    <hr key={`${code}_separator`} className="fr-separator-8v" />
                    <InfoLabelValue
                      key={code}
                      label={`Co-porteur ${index + 1}`}
                      value={nom}
                      labelClassName={print ? 'fr-mt-2v' : ''}
                    />
                  </>
                ))}
              </WhiteCard>
            </div>
            <div
              id={gouvernanceFormSections.membresDeLaGouvernance.id}
              className="fr-pt-6v"
            >
              <WhiteCard className={styles.box}>
                <h5>{gouvernanceFormSections.membresDeLaGouvernance.title}</h5>
                {collectiviteMembres.length > 0 && (
                  <>
                    <hr className="fr-separator-8v" />
                    <p
                      className={classNames(
                        print ? 'fr-my-2v' : 'fr-my-0',
                        'fr-text--xl fr-text--bold',
                      )}
                    >
                      Collectivité{sPluriel(collectiviteMembres.length)}&nbsp;:{' '}
                      {collectiviteMembres.length}
                    </p>
                    {collectiviteMembres.map(({ nom, code }) => (
                      <p
                        className={classNames(
                          print ? 'fr-mt-05v' : 'fr-mt-4v',
                          ' fr-mb-0',
                        )}
                        key={code}
                      >
                        {nom}
                      </p>
                    ))}
                  </>
                )}
                {structureMembres.length > 0 && (
                  <>
                    <hr className="fr-separator-8v" />
                    <p
                      className={classNames(
                        print ? 'fr-my-2v' : 'fr-my-0',
                        'fr-text--xl fr-text--bold',
                      )}
                    >
                      Structure{sPluriel(structureMembres.length)}&nbsp;:{' '}
                      {structureMembres.length}
                    </p>
                    {structureMembres.map(({ nom, code }) => (
                      <p
                        className={classNames(
                          print ? 'fr-mt-05v' : 'fr-mt-4v',
                          ' fr-mb-0',
                        )}
                        key={code}
                      >
                        {nom}
                      </p>
                    ))}
                  </>
                )}
              </WhiteCard>
            </div>
            <div
              id={gouvernanceFormSections.comitologie.id}
              className="fr-pt-6v"
            >
              <WhiteCard className={styles.box}>
                <h5>{gouvernanceFormSections.comitologie.title}</h5>
                {comites.map(
                  (
                    {
                      id: comiteId,
                      type,
                      frequence,
                      commentaire,
                      typeAutrePrecisions,
                    },
                    index,
                  ) => (
                    <>
                      <hr
                        key={`${comiteId}_separator`}
                        className="fr-separator-8v"
                      />
                      <InfoLabelValue
                        key={comiteId}
                        label={`Comite ${index + 1}`}
                        labelClassName={print ? 'fr-mt-2v' : ''}
                        value={
                          <>
                            {type === 'Autre'
                              ? typeAutrePrecisions || 'Autre'
                              : typeComite[type]}{' '}
                            - {frequenceComiteMasculin[frequence]}
                            {commentaire ? (
                              <>
                                <br />
                                {commentaire}
                              </>
                            ) : null}
                          </>
                        }
                      />
                    </>
                  ),
                )}
              </WhiteCard>
            </div>
            <div
              id={gouvernanceFormSections.feuillesDeRouteEtPorteurs.id}
              className="fr-pt-6v"
            >
              <WhiteCard className={styles.box}>
                <h5>
                  {gouvernanceFormSections.feuillesDeRouteEtPorteurs.title}
                </h5>
                {feuillesDeRoute.map(
                  (
                    {
                      nom,
                      membres: membresFeuilleDeRoute,
                      id: feuilleDeRouteId,
                      contratPreexistant,
                      typeContrat,
                      typeContratAutreDescription,
                      perimetreDepartement,
                      perimetreEpcis,
                      perimetreRegion,
                    },
                    index,
                  ) => {
                    const membrePorteur = membresFeuilleDeRoute.find(
                      ({ role }) => role === 'Porteur',
                    )?.membre
                    const porteurNom = membrePorteur
                      ? membreToFormMembre(membrePorteur).nom
                      : 'Portée par la préfecture'
                    const perimetreScope = perimetreRegion
                      ? 'region'
                      : perimetreDepartement
                      ? 'departement'
                      : 'epci'
                    const perimetreTitle =
                      perimetreFeuilleDeRouteLabels[perimetreScope]

                    const perimetreEpciInfo =
                      perimetreScope === 'epci' ? (
                        <>
                          {perimetreEpcis.map(({ epci }) => (
                            <span key={epci.code}>
                              <br /> - {epci.nom}
                            </span>
                          ))}
                        </>
                      ) : null

                    return (
                      <>
                        <hr
                          key={`${feuilleDeRouteId}_separator`}
                          className="fr-separator-8v"
                        />
                        <InfoLabelValue
                          key={feuilleDeRouteId}
                          label={`Feuille de route ${index + 1} : ${nom}`}
                          labelClassName={print ? 'fr-mt-2v' : ''}
                          value={
                            <>
                              Porteur&nbsp;: {porteurNom}
                              <br />
                              Périmètre géographique&nbsp;: {perimetreTitle}
                              {perimetreEpciInfo}
                              {contratPreexistant && typeContrat ? (
                                <>
                                  <br />
                                  Contrat préexistant&nbsp;:{' '}
                                  {typeContrat === 'Autre'
                                    ? typeContratAutreDescription
                                    : typeContratLabels[typeContrat]}
                                </>
                              ) : null}
                            </>
                          }
                        />
                      </>
                    )
                  },
                )}
              </WhiteCard>
            </div>
            <div
              id={
                gouvernanceFormSections
                  .coordinateurConseillerNumeriqueDeLaGouvernance.id
              }
              className="fr-pt-6v"
            >
              <WhiteCard className={styles.box}>
                <h5>Coordinateur Conseiller Numérique</h5>
                {organisationsRecruteusesCoordinateurs.length === 0 && (
                  <>
                    <hr className="fr-separator-8v" />
                    Aucun
                  </>
                )}
                {organisationsRecruteusesCoordinateurs.map(
                  ({ siretInformations: { nom, siret } }, index) => (
                    <>
                      <hr className="fr-separator-8v" />
                      <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
                        <span>
                          <InfoLabelValue
                            labelClassName={print ? 'fr-mt-2v' : ''}
                            label={`Collectivité/structure recruteuse ${
                              index + 1
                            }`}
                            value={nom || siret}
                          />
                        </span>
                      </div>
                    </>
                  ),
                )}
              </WhiteCard>
            </div>
            <div
              id={gouvernanceFormSections.noteDeContexte.id}
              className="fr-pt-6v"
            >
              <WhiteCard className={styles.box}>
                <h5>{gouvernanceFormSections.noteDeContexte.title}</h5>
                <hr className="fr-separator-8v" />
                <div
                  dangerouslySetInnerHTML={{
                    __html: noteDeContexte,
                  }}
                  className={classNames(
                    'fr-mb-0',
                    styles.noteDeContexteContainer,
                  )}
                />
              </WhiteCard>
            </div>
            <div id="besoins-ingenierie-financiere" className="fr-pt-6v">
              <WhiteCard className={styles.box}>
                <h5>Besoins en ingénierie financière</h5>
                {besoinCardInfos.length === 0 && (
                  <>
                    <hr className="fr-separator-8v" />
                    Aucun besoin renseigné
                  </>
                )}
                {besoinCardInfos.map((card, index) => (
                  <>
                    <hr
                      key={`${card.prioriteKey}_separator`}
                      className="fr-separator-8v"
                    />

                    <div
                      key={card.prioriteKey}
                      className={classNames(styles.card)}
                    >
                      <BesoinCardContent
                        print={print}
                        index={index}
                        card={card}
                      />
                    </div>
                  </>
                ))}
              </WhiteCard>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GouvernanceDetails
