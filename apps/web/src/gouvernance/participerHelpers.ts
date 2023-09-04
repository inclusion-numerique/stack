import { DefaultValues } from 'react-hook-form/dist/types/form'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getCurrentFormulaireGouvernanceForFormByUser'
import { ParticiperData } from '@app/web/gouvernance/Participer'
import { contactDefaultValuesFromData } from '@app/web/gouvernance/contactHelper'

export const participerDefaultValuesFromData = (
  data: GouvernanceFormulaireForForm,
): DefaultValues<ParticiperData> => {
  if (data.gouvernancePersona === 'structure') {
    return {
      gouvernancePersona: 'structure',
      formulaireGouvernanceId: data.id,
      codeDepartement: data.departementCode ?? undefined,
      nomStructure: data.nomStructure ?? undefined,
      pasDeSiret: false,
      siretStructure: data.siretStructure ?? undefined,
      contactStructure: contactDefaultValuesFromData(
        false,
        data.contactStructure,
      ),
    }
  }

  const contactPolitique = contactDefaultValuesFromData(
    false,
    data.contactPolitique,
  )
  const contactTechnique = contactDefaultValuesFromData(
    true,
    data.contactTechnique,
  )

  if (data.gouvernancePersona === 'commune') {
    return {
      gouvernancePersona: 'commune',
      formulaireGouvernanceId: data.id,
      codeCommune: data.communeCode ?? undefined,
      contactPolitique,
      contactTechnique,
    }
  }
  if (data.gouvernancePersona === 'epci') {
    return {
      gouvernancePersona: 'epci',
      formulaireGouvernanceId: data.id,
      codeEpci: data.epciCode ?? undefined,
      contactPolitique,
      contactTechnique,
    }
  }
  if (data.gouvernancePersona === 'conseil-departemental') {
    return {
      gouvernancePersona: 'conseil-departemental',
      formulaireGouvernanceId: data.id,
      codeDepartement: data.departementCode ?? undefined,
      contactPolitique,
      contactTechnique,
    }
  }

  if (data.gouvernancePersona === 'conseil-regional') {
    return {
      gouvernancePersona: 'conseil-regional',
      formulaireGouvernanceId: data.id,
      codeRegion: data.regionCode ?? undefined,
      contactPolitique,
      contactTechnique,
    }
  }

  throw new Error('Could not create default values from persona')
}
