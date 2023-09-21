import { communeNameWithCodePostaux } from '@app/web/data/communeNameWithCodePostaux'
import type { Participant } from '@app/web/app/(private)/gouvernances/ParticipantInfoAccordion'

export const formulaireGouvernancePersonaName = (
  formulaire: Partial<
    Pick<
      Participant,
      'departement' | 'region' | 'epci' | 'commune' | 'nomStructure'
    >
  >,
) => {
  if ('region' in formulaire && formulaire.region) {
    return `${formulaire.region.nom}`
  }

  if ('nomStructure' in formulaire && formulaire.nomStructure) {
    return formulaire.nomStructure
  }

  if ('departement' in formulaire && formulaire.departement) {
    return `${formulaire.departement.nom} (${formulaire.departement.code})`
  }

  if ('epci' in formulaire && formulaire.epci) {
    return `${formulaire.epci.nom}`
  }

  if ('commune' in formulaire && formulaire.commune) {
    return communeNameWithCodePostaux(formulaire.commune)
  }

  return 'Non renseigné'
}
