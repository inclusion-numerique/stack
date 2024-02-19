import { DefaultValues } from 'react-hook-form/dist/types/form'
import { GouvernanceFormulaireForForm } from '@app/web/app/(public)/formulaires-feuilles-de-routes-territoriales/getCurrentFormulaireGouvernanceForFormByUser'
import { InformationsParticipantData } from '@app/web/gouvernance/InformationsParticipant'
import { contactDefaultValuesFromData } from '@app/web/gouvernance/contactHelper'

export const informationsParticipantDefaultValuesFromData = (
  data: GouvernanceFormulaireForForm,
): DefaultValues<InformationsParticipantData> => {
  const contactPolitique = contactDefaultValuesFromData(
    false,
    data.contactPolitique,
  )
  const contactTechnique = contactDefaultValuesFromData(
    true,
    data.contactTechnique,
  )

  const schemaOuGouvernanceLocale = data.schemaOuGouvernanceLocale ?? undefined

  if (data.gouvernancePersona === 'commune') {
    return {
      gouvernancePersona: 'commune',
      formulaireGouvernanceId: data.id,
      codeCommune: data.communeCode ?? undefined,
      contactPolitique,
      contactTechnique,
      schemaOuGouvernanceLocale,
    }
  }
  if (data.gouvernancePersona === 'epci') {
    return {
      gouvernancePersona: 'epci',
      formulaireGouvernanceId: data.id,
      codeEpci: data.epciCode ?? undefined,
      contactPolitique,
      contactTechnique,
      schemaOuGouvernanceLocale,
    }
  }
  if (data.gouvernancePersona === 'conseil-departemental') {
    return {
      gouvernancePersona: 'conseil-departemental',
      formulaireGouvernanceId: data.id,
      codeDepartement: data.departementCode ?? undefined,
      contactPolitique,
      contactTechnique,
      schemaOuGouvernanceLocale,
    }
  }

  if (data.gouvernancePersona === 'conseil-regional') {
    return {
      gouvernancePersona: 'conseil-regional',
      formulaireGouvernanceId: data.id,
      codeRegion: data.regionCode ?? undefined,
      contactPolitique,
      contactTechnique,
      schemaOuGouvernanceLocale,
    }
  }

  throw new Error('Could not create default values from persona')
}
