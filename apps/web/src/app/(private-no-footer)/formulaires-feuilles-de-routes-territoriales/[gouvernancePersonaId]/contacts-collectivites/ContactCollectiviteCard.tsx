import Button from '@codegouvfr/react-dsfr/Button'
import ContactCollectiviteForm from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/contacts-collectivites/ContactCollectiviteForm'
import {
  ContactCollectivite,
  UseContactsCollectivitesReturn,
} from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/contacts-collectivites/useContactsCollectivites'
import WhiteCard from '@app/web/ui/WhiteCard'
import ContactInfo from '@app/web/components/Gouvernance/ContactInfo'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'

const ContactCollectiviteCard = ({
  contactCollectivite,
  editContact,
  saveContact,
  disabled,
  formulaireGouvernanceId,
}: {
  contactCollectivite: ContactCollectivite
  disabled: boolean
  formulaireGouvernanceId: string
} & Pick<UseContactsCollectivitesReturn, 'editContact' | 'saveContact'>) => (
  <WhiteCard className="fr-mt-6v">
    <div className="fr-flex fr-align-items-center fr-justify-content-space-between fr-mb-0">
      <h5 className="fr-text-title--blue-france fr-my-0">
        {contactCollectivite.label}
      </h5>
      {contactCollectivite.state === 'saved' && (
        <Button
          type="button"
          priority="tertiary"
          iconId="fr-icon-edit-line"
          title="Modifier la collectivité"
          disabled={disabled}
          onClick={() => editContact(contactCollectivite.participantId)}
        />
      )}
    </div>
    {contactCollectivite.state === 'pending' || !contactCollectivite.data ? (
      <ContactCollectiviteForm
        contactCollectivite={contactCollectivite}
        saveContact={saveContact}
        disabled={disabled}
        formulaireGouvernanceId={formulaireGouvernanceId}
      />
    ) : (
      <>
        <hr className="fr-mt-6v" />
        <InfoLabelValue
          label="Contact de la collectivité :"
          value={<ContactInfo contact={contactCollectivite.data} />}
        />
      </>
    )}
  </WhiteCard>
)

export default ContactCollectiviteCard
