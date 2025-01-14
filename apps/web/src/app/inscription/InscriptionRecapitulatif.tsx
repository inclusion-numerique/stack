import Button from '@codegouvfr/react-dsfr/Button'
import Notice from '@codegouvfr/react-dsfr/Notice'
import React, { ReactNode } from 'react'
import IconInSquare from '@app/web/components/IconInSquare'
import InfoLabelValue from '@app/web/components/InfoLabelValue'
import {
  allProfileInscriptionLabels,
  computeUserProfile,
} from '@app/web/inscription/profilInscription'
import StructureCard from '@app/web/components/structure/StructureCard'
import ValiderInscriptionForm from '@app/web/app/inscription/ValiderInscriptionForm'
import { SessionUser } from '@app/web/auth/sessionUser'
import { StructureData } from '@app/web/app/structure/StructureValidation'
import InscriptionInvalidInformationContactSupportLink from '@app/web/app/inscription/InscriptionInvalidInformationContactSupportLink'

const InscriptionRecapitulatif = ({
  editLieuxActiviteHref,
  editStructureEmployeuseHref,
  structureEmployeuse,
  mediateursCoordonnesCount,
  lieuxActivite,
  user,
  contactSupportLink = false,
  button,
}: {
  editStructureEmployeuseHref?: string
  editLieuxActiviteHref: string
  user: Pick<
    SessionUser,
    'profilInscription' | 'id' | 'email' | 'name' | 'mediateur' | 'coordinateur'
  >
  structureEmployeuse: StructureData
  mediateursCoordonnesCount?: number
  lieuxActivite?: StructureData[]
  contactSupportLink?: boolean
  button?: ReactNode
}) => (
  <>
    <div className="fr-flex fr-align-items-center fr-flex-gap-3v fr-mt-12v">
      <IconInSquare iconId="fr-icon-account-circle-line" size="small" />
      <h2 className="fr-h6 fr-mb-0 fr-text-title--blue-france">
        Mes informations
      </h2>
    </div>
    <div className="fr-width-full fr-border-radius--8 fr-p-6v fr-p-md-8v fr-border fr-mt-6v">
      <InfoLabelValue
        label="Profession"
        value={allProfileInscriptionLabels[computeUserProfile(user)]}
      />
      {!!user.name && (
        <InfoLabelValue
          labelClassName="fr-mt-4v"
          label="Nom"
          value={user.name}
        />
      )}
      <InfoLabelValue
        labelClassName="fr-mt-4v"
        label="Adresse e-mail"
        value={user.email}
      />
    </div>
    {mediateursCoordonnesCount != null &&
      user.coordinateur?.conseillerNumeriqueId != null && (
        <>
          <hr className="fr-separator-12v" />
          <div className="fr-flex fr-align-items-center fr-flex-gap-3v fr-mt-12v fr-mb-6v">
            <IconInSquare iconId="ri-group-2-line" size="small" />
            <h2 className="fr-h6 fr-mb-0 fr-text-title--blue-france">
              Mon équipe
            </h2>
          </div>
          {mediateursCoordonnesCount > 0 ? (
            <>
              <div className="fr-width-full fr-border-radius--8 fr-p-6v fr-border fr-my-6v fr-flex fr-align-items-center fr-flex-gap-3v">
                <img
                  alt=""
                  src="/images/iconographie/profil-conseiller-numerique.svg"
                />
                <div className="fr-h2 fr-mb-0">{mediateursCoordonnesCount}</div>
                <div>Conseillers numériques identifiés</div>
              </div>
              <Notice
                className="fr-notice--flex"
                title={
                  <span className="fr-text--regular fr-text-default--grey fr-ml-1w">
                    Retrouvez et gérez la liste des conseillers numériques que
                    vous coordonnez sur votre espace dans la section{' '}
                    <strong>Mon équipe</strong>.
                  </span>
                }
              />
            </>
          ) : (
            <>
              <div className="fr-width-full fr-border-radius--8 fr-p-6v fr-border fr-my-6v fr-flex fr-align-items-center fr-flex-gap-3v">
                <div className="fr-h2 fr-mb-0">0</div>
                <div>Membres identifiés</div>
              </div>
              <Notice
                className="fr-notice--flex"
                title={
                  <span className="fr-text--regular fr-text-default--grey fr-ml-1w">
                    Vous pourrez inviter des médiateur·rice·s numériques (dont
                    des conseillers numériques) que vous souhaitez coordonner
                    sur votre espace dans la section <strong>Mon équipe</strong>
                    .
                  </span>
                }
              />
            </>
          )}
        </>
      )}
    <hr className="fr-separator-12v" />
    <div className="fr-flex fr-align-items-center fr-flex-gap-3v fr-mt-12v fr-mb-6v">
      <IconInSquare iconId="ri-home-smile-2-line" size="small" />
      <h2 className="fr-h6 fr-mb-0 fr-text-title--blue-france">
        Ma structure employeuse
      </h2>
      {!!editStructureEmployeuseHref && (
        <>
          <span className="fr-flex-grow-1" />
          <Button
            priority="tertiary no outline"
            linkProps={{
              href: editStructureEmployeuseHref,
            }}
            iconId="fr-icon-edit-line"
            iconPosition="right"
            size="small"
          >
            Modifier
          </Button>
        </>
      )}
    </div>
    <StructureCard structure={structureEmployeuse} className="fr-mt-4v" />
    {!!lieuxActivite && (
      <>
        <hr className="fr-separator-12v" />
        <div className="fr-flex fr-align-items-center fr-flex-gap-3v fr-mt-12v fr-mb-6v">
          <IconInSquare iconId="ri-home-office-line" size="small" />
          <h2 className="fr-h6 fr-mb-0 fr-text-title--blue-france">
            {lieuxActivite.length === 1
              ? 'Mon lieu d’activité'
              : `Mes lieux d’activité · ${lieuxActivite.length}`}
          </h2>
          <span className="fr-flex-grow-1" />
          <Button
            priority="tertiary no outline"
            linkProps={{
              href: editLieuxActiviteHref,
            }}
            iconId="fr-icon-edit-line"
            iconPosition="right"
            size="small"
          >
            Modifier
          </Button>
        </div>
        {/* Les lieux sont affichés dans l'ordre inverse (le plus récent en haut) dans la formulaire lieux activité, on reproduit cela pour */}
        {/* que l'affichage soit cohérent */}
        {lieuxActivite.reverse().map((lieu) => (
          <StructureCard key={lieu.id} structure={lieu} className="fr-mt-4v" />
        ))}
      </>
    )}
    <hr className="fr-separator-12v" />
    {button || <ValiderInscriptionForm userId={user.id} />}
    {contactSupportLink && <InscriptionInvalidInformationContactSupportLink />}
  </>
)

export default InscriptionRecapitulatif
