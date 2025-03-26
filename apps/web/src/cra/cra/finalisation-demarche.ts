import { labelsToOptions } from '@app/ui/components/Form/utils/options'
import { DegreDeFinalisationDemarche } from '@prisma/client'

export const degreDeFinalisationDemarcheLabels: {
  [key in DegreDeFinalisationDemarche]: string
} = {
  Finalisee: 'Oui',
  AFinaliserEnAutonomie: 'Non',
  DoitRevenir: 'Non',
  OrienteVersStructure: 'Non',
}

export const degreDeFinalisationDemarcheIllustrations: {
  [key in DegreDeFinalisationDemarche]?: string
} = {
  Finalisee: '/dsfr/artwork/pictograms/system/success.svg',
}

export const degreDeFinalisationDemarcheHints: {
  [key in DegreDeFinalisationDemarche]?: string
} = {
  AFinaliserEnAutonomie: 'Il reste des démarches à finaliser en autonomie.',
  DoitRevenir: 'L’usager devra revenir.',
  OrienteVersStructure: 'L’usager est orienté vers une autre structure.',
}

export const degreDeFinalisationDemarcheOptions = labelsToOptions(
  degreDeFinalisationDemarcheLabels,
)

export const degreDeFinalisationDemarcheOptionsWithExtras =
  degreDeFinalisationDemarcheOptions.map(({ label, value }) => ({
    label,
    value,
    hint: degreDeFinalisationDemarcheHints[value],
    extra: {
      illustration: degreDeFinalisationDemarcheIllustrations[value],
    },
  }))

export const degreDeFinalisationDemarcheValues = Object.keys(
  degreDeFinalisationDemarcheLabels,
) as [DegreDeFinalisationDemarche, ...DegreDeFinalisationDemarche[]]

export const degreDeFinalisationDemarcheApiValues = {
  Finalisee: 'finalisee',
  AFinaliserEnAutonomie: 'a_finaliser_en_autonomie',
  DoitRevenir: 'doit_revenir',
  OrienteVersStructure: 'oriente_vers_structure',
} as const satisfies {
  [key in DegreDeFinalisationDemarche]: string
}
