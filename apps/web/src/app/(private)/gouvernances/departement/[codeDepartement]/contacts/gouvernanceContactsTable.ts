import { ContactsGouvernance } from '@app/web/app/(private)/gouvernances/getContactsGouvernances'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { formulaireGouvernancePersonaName } from '@app/web/app/(private)/gouvernances/formulaireGouvernancePersonaName'
import {
  GouvernancePersonaId,
  gouvernancePersonas,
} from '@app/web/app/(public)/gouvernance/gouvernancePersona'

/**
 * Define the type as strictly the right number of columns
 */
export type Columns = [
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
]

export const contactTableHeaders: Columns = [
  'Date de dépôt',
  'Collectivités/structures',
  'Typologie',
  'Manifestation d’intérêt',
  'Nom du porteur',
  'Nom/Prénom du contact',
  'Fonction du contact',
  'Type de contact',
  'Email',
  'Code SIRET',
  'Code INSEE',
]

// Used to convert a string value to a jsx element by checking it against the badgeColors object
export const badgeStrings = {
  suggere: 'Partenaire suggéré par un porteur',
  porteur: 'Porteur d’une feuille de route',
  participant: 'Souhaite participer',
}

export const badgeColors = {
  suggere: 'fr-badge--purple-glycine',
  porteur: 'fr-badge--yellow-tournesol',
  participant: 'fr-badge--blue-cumulus',
}

export const contactToData = (
  contact: ContactsGouvernance[number],
): Columns => {
  const { prenom, nom, fonction, email, formulaireGouvernance } = contact

  const dateDeDepot = dateAsDay(formulaireGouvernance.confirmeEtEnvoye)
  const nomEtPrenom = `${prenom} ${nom}`
  const formulaireOwner = formulaireGouvernancePersonaName(
    formulaireGouvernance,
  )

  // D'abord les cas ou c'est un contact suggéré par un porteur

  if (contact.contactDepartementParticipant) {
    return [
      dateDeDepot,
      formulaireGouvernancePersonaName(contact.contactDepartementParticipant),
      'Département',
      badgeStrings.suggere,
      formulaireOwner,
      nomEtPrenom,
      fonction,
      'Politique',
      email,
      null,
      contact.contactDepartementParticipant.departement.code,
    ]
  }
  if (contact.contactEpciParticipant) {
    return [
      dateDeDepot,
      formulaireGouvernancePersonaName(contact.contactEpciParticipant),
      'EPCI',
      badgeStrings.suggere,
      formulaireOwner,
      nomEtPrenom,
      fonction,
      null,
      email,
      null,
      contact.contactEpciParticipant.epci.code,
    ]
  }
  if (contact.contactCommuneParticipante) {
    return [
      dateDeDepot,
      formulaireGouvernancePersonaName(contact.contactCommuneParticipante),
      'Commune',

      badgeStrings.suggere,
      formulaireOwner,
      nomEtPrenom,
      fonction,
      null,
      email,
      null,
      contact.contactCommuneParticipante.commune.code,
    ]
  }
  if (contact.contactStructureParticipante) {
    return [
      dateDeDepot,
      formulaireGouvernancePersonaName(contact.contactStructureParticipante),
      'Structure',

      badgeStrings.suggere,
      formulaireOwner,
      nomEtPrenom,
      fonction,
      null,
      email,
      null,
      null,
    ]
  }

  // Cas ou c'est un porteur ou un participant directement

  const persona =
    gouvernancePersonas[
      formulaireGouvernance.gouvernancePersona as GouvernancePersonaId
    ]

  const personaLabel = persona.shortTitle ?? persona.title
  const badge =
    formulaireGouvernance.intention === 'Porter'
      ? badgeStrings.porteur
      : badgeStrings.participant

  const typeDeContact = contact.contactPolitique
    ? 'Politique'
    : contact.contactTechnique
    ? 'Technique'
    : 'Structure'

  const siret = formulaireGouvernance.siretStructure
  const insee =
    formulaireGouvernance.region?.code ??
    formulaireGouvernance.departement?.code ??
    formulaireGouvernance.epci?.code ??
    formulaireGouvernance.commune?.code ??
    null

  return [
    dateDeDepot,
    formulaireOwner,
    personaLabel,
    badge,
    null,
    nomEtPrenom,
    fonction,
    typeDeContact,
    email,
    siret,
    insee,
  ]
}
