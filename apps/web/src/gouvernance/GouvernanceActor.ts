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

export const getActorFromPorteurCode = (
  porteurCode: string,
): GouvernanceActor => {
  const [type, code, formulaireGouvernanceId] = porteurCode.split(
    gouvernanceActorSeparator,
  )
  return { type: type as GouvernanceActorType, code, formulaireGouvernanceId }
}

export const membreToActor = ({
  epciCode,
  regionCode,
  departementCode,
  siret,
  formulaireGouvernanceId,
}: {
  regionCode?: string
  departementCode?: string
  epciCode?: string
  siret?: string
  formulaireGouvernanceId: string
}): GouvernanceActor => {
  if (regionCode) {
    return { type: 'region', code: regionCode, formulaireGouvernanceId }
  }
  if (departementCode) {
    return {
      type: 'departement',
      code: departementCode,
      formulaireGouvernanceId,
    }
  }
  if (epciCode) {
    return { type: 'epci', code: epciCode, formulaireGouvernanceId }
  }
  return { type: 'structure', code: siret || '', formulaireGouvernanceId }
}

export const membreToActorCode = (membre: {
  regionCode?: string
  departementCode?: string
  epciCode?: string
  siret?: string
  formulaireGouvernanceId: string
}) => getGouvernanceActorCode(membreToActor(membre))
