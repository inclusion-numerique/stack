import { GouvernancePersonaId } from '@app/web/app/(public)/gouvernance/gouvernancePersona'

export type EtapeFormulaireGouvernance =
  | 'choix-intention'
  | '1'
  | '2'
  | '3'
  | '4'
  | 'confirmer'

export const linkToFormulaireGouvernancePorter = (
  personaId: GouvernancePersonaId,
  etape?: EtapeFormulaireGouvernance,
) =>
  etape
    ? `/formulaires-feuilles-de-routes-territoriales/${personaId}/formulaire/porter-une-feuille-de-route?etape=${etape}`
    : `/formulaires-feuilles-de-routes-territoriales/${personaId}/formulaire/porter-une-feuille-de-route`

export const linkToFormulaireGouvernanceParticiper = (
  personaId: GouvernancePersonaId,
) =>
  `/formulaires-feuilles-de-routes-territoriales/${personaId}/formulaire/participer`
