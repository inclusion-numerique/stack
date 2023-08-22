import { ContactFormulaireGouvernanceData } from '@app/web/gouvernance/Contact'

export const upsertDataFromContact = (
  formulaireGouvernanceId: string,
  input: ContactFormulaireGouvernanceData,
) => ({
  formulaireGouvernanceId,
  nom: input.nom.trim(),
  prenom: input.prenom.trim(),
  fonction: input.fonction.trim(),
  email: input.email.trim(),
})

export const contactOperation = (
  formulaireGouvernanceId: string,
  input: ContactFormulaireGouvernanceData | null | undefined,
  existing: Record<string, unknown> | null,
) =>
  input
    ? {
        upsert: {
          create: upsertDataFromContact(formulaireGouvernanceId, input),
          update: upsertDataFromContact(formulaireGouvernanceId, input),
        },
      }
    : existing
    ? {
        delete: true,
      }
    : undefined
