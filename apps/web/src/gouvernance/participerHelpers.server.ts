import type { Prisma } from '@prisma/client'
import type { ParticiperData } from '@app/web/gouvernance/Participer'
import type { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import { contactOperation } from '@app/web/gouvernance/contactHelper.server'

export const participerPersistenceFromData = (
  data: ParticiperData,
  formulaireGouvernance: GouvernanceFormulaireForForm,
): Prisma.FormulaireGouvernanceUpdateInput => {
  // Cleanup unwanted data

  const formulaireGouvernanceId = formulaireGouvernance.id
  const cleanup = {
    departementsParticipants:
      formulaireGouvernance.departementsParticipants.length > 0
        ? { deleteMany: { formulaireGouvernanceId } }
        : undefined,
    structuresParticipantes:
      formulaireGouvernance.structuresParticipantes.length > 0
        ? { deleteMany: { formulaireGouvernanceId } }
        : undefined,
    epcisParticipantes:
      formulaireGouvernance.epcisParticipantes.length > 0
        ? { deleteMany: { formulaireGouvernanceId } }
        : undefined,
    communesParticipantes:
      formulaireGouvernance.communesParticipantes.length > 0
        ? { deleteMany: { formulaireGouvernanceId } }
        : undefined,
  }

  if (data.gouvernancePersona === 'structure') {
    return {
      ...cleanup,
      nomStructure: data.nomStructure.trim(),
      siretStructure: data.siretStructure.trim(),
      departement: { connect: { code: data.codeDepartement } },
      contactStructure: contactOperation(
        data.formulaireGouvernanceId,
        data.contactStructure,
        formulaireGouvernance.contactStructure,
      ),
      contactTechnique: contactOperation(
        data.formulaireGouvernanceId,
        null,
        formulaireGouvernance.contactTechnique,
      ),
      contactPolitique: contactOperation(
        data.formulaireGouvernanceId,
        null,
        formulaireGouvernance.contactPolitique,
      ),
      // Clean unwanted data (safety as the state of the form is out of this function scope)
      etapeInformationsParticipant: null,
      etapePerimetre: null,
      etapeContacts: null,
      etapeStructures: null,
      region: {
        disconnect: true,
      },
      commune: {
        disconnect: true,
      },
      epci: {
        disconnect: true,
      },
      schemaOuGouvernanceLocale: null,
    }
  }

  const commonParticiperCollectiviteData = {
    ...cleanup,
    // Clean unwanted data (safety as the state of the form is out of this function scope)
    etapeInformationsParticipant: null,
    etapePerimetre: null,
    etapeContacts: null,
    etapeStructures: null,
    nomStructure: null,
    siretStructure: null,
    contactStructure: contactOperation(
      formulaireGouvernance.id,
      null,
      formulaireGouvernance.contactStructure,
    ),
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
