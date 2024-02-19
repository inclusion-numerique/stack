import type { Prisma } from '@prisma/client'
import type { GouvernanceFormulaireForForm } from '@app/web/app/(public)/formulaires-feuilles-de-routes-territoriales/getCurrentFormulaireGouvernanceForFormByUser'
import { contactOperation } from '@app/web/gouvernance/contactHelper.server'
import { InformationsParticipantData } from '@app/web/gouvernance/InformationsParticipant'

export const informationsParticipantsPersistenceFromData = (
  data: InformationsParticipantData,
  formulaireGouvernance: GouvernanceFormulaireForForm,
): Prisma.FormulaireGouvernanceUpdateInput => {
  // Cleanup unwanted data

  const commonParticiperCollectiviteData = {
    schemaOuGouvernanceLocale: data.schemaOuGouvernanceLocale || null,
    etapeInformationsParticipant: new Date(),
    contactTechnique: contactOperation(
      data.formulaireGouvernanceId,
      data.contactTechnique,
      formulaireGouvernance.contactTechnique,
    ),
    contactPolitique: contactOperation(
      data.formulaireGouvernanceId,
      data.contactPolitique,
      formulaireGouvernance.contactPolitique,
    ),

    // Non applicable pour une structure
    nomStructure: null,
    siretStructure: null,
    contactStructure: contactOperation(
      formulaireGouvernance.id,
      null,
      formulaireGouvernance.contactStructure,
    ),
  }

  switch (data.gouvernancePersona) {
    case 'commune': {
      return {
        ...commonParticiperCollectiviteData,
        commune: { connect: { code: data.codeCommune } },
      }
    }
    case 'epci': {
      return {
        ...commonParticiperCollectiviteData,
        epci: { connect: { code: data.codeEpci } },
      }
    }
    case 'conseil-departemental': {
      return {
        ...commonParticiperCollectiviteData,
        departement: { connect: { code: data.codeDepartement } },
      }
    }
    case 'conseil-regional': {
      return {
        ...commonParticiperCollectiviteData,
        region: { connect: { code: data.codeRegion } },
      }
    }

    default: {
      throw new Error('Invalid form persona')
    }
  }
}
