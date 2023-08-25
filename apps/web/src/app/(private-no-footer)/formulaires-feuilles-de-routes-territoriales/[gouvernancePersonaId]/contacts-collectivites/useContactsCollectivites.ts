import { useCallback, useState } from 'react'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import { ContactCollectiviteData } from '@app/web/gouvernance/ContactCollectivite'
import { UseContactCollectiviteMutation } from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/contacts-collectivites/useContactCollectiviteMutation'
import { communeNameWithCodePostaux } from '@app/web/data/communeNameWithCodePostaux'
import { ContactFormulaireGouvernanceData } from '@app/web/gouvernance/Contact'

export type ContactCollectivite = {
  state: 'pending' | 'saved'
  label: string
  participantId: string
  type: 'departement' | 'epci' | 'commune'
  data: ContactFormulaireGouvernanceData | null
}

const contactDataFromFormulaire = (
  participant:
    | GouvernanceFormulaireForForm['departementsParticipants'][number]
    | GouvernanceFormulaireForForm['epcisParticipantes'][number]
    | GouvernanceFormulaireForForm['communesParticipantes'][number],
): ContactFormulaireGouvernanceData | null =>
  participant.contact
    ? {
        email: participant.contact.email ?? '',
        fonction: participant.contact.fonction ?? '',
        nom: participant.contact.nom ?? '',
        prenom: participant.contact.prenom ?? '',
      }
    : null

export const useContactsCollectivites = ({
  formulaireGouvernance,
  contactCollectiviteMutation,
}: {
  formulaireGouvernance: GouvernanceFormulaireForForm
  contactCollectiviteMutation: UseContactCollectiviteMutation
}) => {
  const [contactsCollectivites, setContactsCollectivites] = useState(
    new Map<string, ContactCollectivite>([
      ...formulaireGouvernance.departementsParticipants.map(
        (participant): [string, ContactCollectivite] => [
          participant.id,
          {
            state: participant.contactId ? 'saved' : 'pending',
            participantId: participant.id,
            type: 'departement',
            label: `${participant.departement.nom} (${participant.departementCode})`,
            data: contactDataFromFormulaire(participant),
          },
        ],
      ),
      ...formulaireGouvernance.epcisParticipantes.map(
        (participant): [string, ContactCollectivite] => [
          participant.id,
          {
            state: participant.contactId ? 'saved' : 'pending',
            participantId: participant.id,
            type: 'epci',
            label: participant.epci.nom,
            data: contactDataFromFormulaire(participant),
          },
        ],
      ),
      ...formulaireGouvernance.communesParticipantes.map(
        (participant): [string, ContactCollectivite] => [
          participant.id,
          {
            state: participant.contactId ? 'saved' : 'pending',
            participantId: participant.id,
            type: 'commune',
            label: communeNameWithCodePostaux(participant.commune),
            data: contactDataFromFormulaire(participant),
          },
        ],
      ),
    ]),
  )

  const saveContact = useCallback(
    (participantId: string, data: ContactCollectiviteData) => {
      console.log('SAVE CONTACT', data)
      setContactsCollectivites((previous) => {
        const newContacts = new Map(previous)
        const contact = newContacts.get(participantId)
        console.log('SAVING? CHANGING STATE', contact)
        if (contact) {
          newContacts.set(participantId, {
            ...contact,
            data,
            state: 'saved',
          })
        }
        return newContacts
      })
      contactCollectiviteMutation.mutate(data)
    },
    [],
  )

  const editContact = useCallback((participantId: string) => {
    console.log('EDIT CONTACT', participantId)
    setContactsCollectivites((previous) => {
      const newContacts = new Map(previous)
      const contact = newContacts.get(participantId)
      console.log('EDITING? CHANGING STATE', contact)

      if (contact) {
        newContacts.set(participantId, { ...contact, state: 'pending' })
      }
      return newContacts
    })
  }, [])

  const pendingContacts = [...contactsCollectivites.values()].filter(
    (contact) => contact.state === 'pending',
  ).length

  return {
    totalContacts: contactsCollectivites.size,
    pendingContacts,
    completedContacts: contactsCollectivites.size - pendingContacts,
    contactsCollectivites,
    saveContact,
    editContact,
  }
}

export type UseContactsCollectivitesReturn = ReturnType<
  typeof useContactsCollectivites
>
