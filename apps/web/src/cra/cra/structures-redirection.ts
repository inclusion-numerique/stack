import { labelsToOptions } from '@app/ui/components/Form/utils/options'
import { StructureDeRedirection } from '@prisma/client'

export const structuresRedirectionLabels: {
  [key in StructureDeRedirection]: string
} = {
  OperateurOuOrganismeEnCharge:
    'Opérateur ou organisme en charge de la démarche administrative',
  AideAuxDemarchesAdministratives:
    'Structure d’aide aux démarches administratives (France Services…)',
  Administration: 'Administration (collectivité locale, préfecture…)',
  MediationNumerique: 'Structure de médiation numérique',
  Autre: 'Autre',
}

export const structuresRedirectionOptions = labelsToOptions(
  structuresRedirectionLabels,
)

export const structuresRedirectionValues = Object.keys(
  structuresRedirectionLabels,
) as [StructureDeRedirection, ...StructureDeRedirection[]]

export const structureDeRedirectionApiValues = {
  OperateurOuOrganismeEnCharge: 'operateur_ou_organisme_en_charge',
  AideAuxDemarchesAdministratives: 'aide_aux_demarches_administratives',
  Administration: 'administration',
  MediationNumerique: 'mediation_numerique',
  Autre: 'autre',
} as const satisfies {
  [key in StructureDeRedirection]: string
}
