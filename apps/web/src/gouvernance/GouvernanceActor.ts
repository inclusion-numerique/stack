import type { GouvernanceForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { MembreData } from '@app/web/gouvernance/Gouvernance'

export type GouvernanceActorType =
  | 'region'
  | 'departement'
  | 'epci'
  | 'structure'

/**
 * An Actor is a data model representing a MembreGouvernance that may or may not exist
 * in database. It is used to represent a MembreGouvernance in a form, with or without an existing id.
 *
 * A gouvernance actor code is a string usable as value in a form field (e.g. select option)
 * That represents 3 informations. The type of actor, its unique identifier and a relation
 * to a FormulaireGouvernance (useful for Structures that do NOT have a code)
 *
 * e.g. "region###01###abc-d" is a region with code "01" that is linked to a FormulaireGouvernance
 * e.g. "structure######be-3 is a structure without siret that is linked to a FormulaireGouvernance
 */

export type GouvernanceActor = {
  type: GouvernanceActorType
  code: string
  formulaireGouvernanceId: string
}

const gouvernanceActorSeparator = '###'

export const getGouvernanceActorCode = ({
  type,
  code,
  formulaireGouvernanceId,
}: GouvernanceActor) =>
  [type, code || '', formulaireGouvernanceId].join(gouvernanceActorSeparator)

export const getActorFromCode = (actorCode: string): GouvernanceActor => {
  const [type, code, formulaireGouvernanceId] = actorCode.split(
    gouvernanceActorSeparator,
  )
  return { type: type as GouvernanceActorType, code, formulaireGouvernanceId }
}

export const getMembreModelDataFromActorCode = (
  actorCode: string,
  nom: string,
) => {
  const { code, formulaireGouvernanceId, type } = getActorFromCode(actorCode)

  if (type === 'region') {
    return { regionCode: code, formulaireGouvernanceId }
  }
  if (type === 'departement') {
    return { departementCode: code, formulaireGouvernanceId }
  }
  if (type === 'epci') {
    return { epciCode: code, formulaireGouvernanceId }
  }
  return {
    siret: code || `__sans-siret__${nom}`,
    formulaireGouvernanceId,
  }
}

export const membreToFormMembre = ({
  epci,
  departement,
  region,
  nomStructure,
  siretInformations,
  coporteur,
  formulaireGouvernanceId,
}: GouvernanceForForm['membres'][number]): MembreData => {
  if (region) {
    return {
      code: getGouvernanceActorCode({
        type: 'region',
        code: region.code,
        formulaireGouvernanceId,
      }),
      coporteur,
      nom: region.nom,
    }
  }
  if (departement) {
    return {
      code: getGouvernanceActorCode({
        type: 'departement',
        code: departement.code,
        formulaireGouvernanceId,
      }),
      coporteur,
      nom: departement.nom,
    }
  }
  if (epci) {
    return {
      code: getGouvernanceActorCode({
        type: 'epci',
        code: epci.code,
        formulaireGouvernanceId,
      }),
      coporteur,
      nom: epci.nom,
    }
  }
  return {
    code: getGouvernanceActorCode({
      type: 'structure',
      code: siretInformations?.siret || '',
      formulaireGouvernanceId,
    }),
    coporteur,
    nom:
      siretInformations?.nom || nomStructure || siretInformations?.siret || '',
  }
}
