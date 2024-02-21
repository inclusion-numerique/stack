import { GouvernanceFormulaireForForm } from '@app/web/app/(public)/formulaires-feuilles-de-routes-territoriales/getCurrentFormulaireGouvernanceForFormByUser'

export const getRecapitulatifCounts = (
  formulaireGouvernance: GouvernanceFormulaireForForm,
) => {
  const totalCollectivites =
    formulaireGouvernance.departementsParticipants.length +
    formulaireGouvernance.epcisParticipantes.length +
    formulaireGouvernance.communesParticipantes.length

  const totalContacts =
    formulaireGouvernance.departementsParticipants.filter(
      (participant) => !!participant.contact,
    ).length +
    formulaireGouvernance.epcisParticipantes.filter(
      (participant) => !!participant.contact,
    ).length +
    formulaireGouvernance.communesParticipantes.filter(
      (participant) => !!participant.contact,
    ).length

  const missingContacts = totalCollectivites - totalContacts

  return {
    totalCollectivites,
    totalContacts,
    missingContacts,
  }
}

export type RecapitulatifCounts = ReturnType<typeof getRecapitulatifCounts>
