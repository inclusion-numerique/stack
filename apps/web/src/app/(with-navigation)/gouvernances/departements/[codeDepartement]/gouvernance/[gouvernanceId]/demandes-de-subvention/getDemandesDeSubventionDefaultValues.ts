import { DefaultValues } from 'react-hook-form/dist/types/form'
import { DemandesSubventionsForForm } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { DemandeDeSubventionData } from '@app/web/gouvernance/DemandeDeSubvention'

export const getDemandesDeSubventionDefaultValues = (
  demandeDeSubvention?: DemandesSubventionsForForm,
): DefaultValues<DemandeDeSubventionData> => {
  if (!demandeDeSubvention) {
    return { id: undefined }
  }

  const {
    beneficiaires,
    budgetGlobal,
    subventionDemandee,
    subventionEtp,
    subventionPrestation,
    ...rest
  } = demandeDeSubvention

  return {
    ...rest,
    budgetGlobal: budgetGlobal?.toNumber(),
    subventionDemandee: subventionDemandee?.toNumber(),
    subventionEtp: subventionEtp?.toNumber(),
    subventionPrestation: subventionPrestation?.toNumber(),
    beneficiaires: beneficiaires.map(({ subvention, ...beneficiaireRest }) => ({
      ...beneficiaireRest,
      subvention: subvention?.toNumber(),
    })),
  }
}
