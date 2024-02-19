import React from 'react'
import Table from '@codegouvfr/react-dsfr/Table'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import type { ContactsGouvernance } from '@app/web/app/(with-navigation)/gouvernances/getContactsGouvernances'
import styles from '@app/web/app/(with-navigation)/gouvernances/Gouvernances.module.css'
import { gouvernanceContactsDownloadPath } from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import type { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'
import {
  contactTableHeaders,
  contactToData,
} from '@app/web/app/(with-navigation)/gouvernances//gouvernanceContactsTable'
import { addBadgeToContactData } from '@app/web/app/(with-navigation)/gouvernances/addBadgeToContactData'

const ContactsGouvernances = ({
  contactsGouvernance,
  scopeTitle,
  ...scope
}: {
  scopeTitle: string
  contactsGouvernance: ContactsGouvernance
} & GouvernanceScope) => {
  const hasContacts = contactsGouvernance.length > 0

  return (
    <>
      <div className="fr-container">
        <div className="fr-flex fr-align-items-center fr-justify-content-space-between">
          <h2 className="fr-text-title--blue-france fr-mt-6v fr-mb-4v">
            {scopeTitle}
          </h2>
          <h3 className="fr-text-title--blue-france fr-mb-6v">
            {contactsGouvernance.length} contact
            {sPluriel(contactsGouvernance.length)}{' '}
            {contactsGouvernance.length === 1 ? 'a' : 'ont'} été renseigné
            {sPluriel(contactsGouvernance.length)}
          </h3>
          <Button
            priority="secondary"
            iconId="fr-icon-download-line"
            linkProps={{ href: gouvernanceContactsDownloadPath(scope) }}
          >
            Télécharger en CSV
          </Button>
        </div>
      </div>
      <div className="fr-container fr-mb-20v fr-pb-10v">
        <Table
          className={classNames('fr-mt-0', styles.contactsTable)}
          headers={contactTableHeaders}
          data={
            hasContacts
              ? contactsGouvernance.map((contact) =>
                  addBadgeToContactData(contactToData(contact)),
                )
              : [['Aucun contact renseigné']]
          }
        />
      </div>
    </>
  )
}

export default ContactsGouvernances
