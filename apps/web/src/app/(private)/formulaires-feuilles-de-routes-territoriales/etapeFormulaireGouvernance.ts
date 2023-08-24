import {
  GouvernancePersonaId,
  personaPeutPorterUneFeuilleDeRoute,
} from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import type { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'

export type EtapeFormulaireGouvernance =
  // Choix de la Persona
  | 'choix-du-formulaire'
  // Pendant le développement, page finale, confirmation d'inscription. Sera supprimée
  | 'confirmation-inscription'
  // Choix des 2 branches du formulaire si possible (Porter ou Participer)
  | 'porter-ou-participer'
  // Branche "Participer", 1 seule étape
  | 'participer'
  // Branche "Porter", 5 étapes
  | 'informations-participant'
  | 'perimetre-feuille-de-route'
  | 'contacts-collectivites'
  | 'autres-structures'
  | 'recapitulatif'
  // Confirmation du formulaire envoyé, il n'est plus modifiable
  | 'confirmation-formulaire-envoye'

export const etapePathForEtapeFormulaireGouvernance = {
  'choix-du-formulaire': '/choix-du-formulaire',
  'confirmation-inscription': (gouvernancePersona) =>
    `/${gouvernancePersona}/confirmation-inscription`,
  'porter-ou-participer': (gouvernancePersona) =>
    `/${gouvernancePersona}/porter-ou-participer`,
  participer: (gouvernancePersona) => `/${gouvernancePersona}/participer`,
  'informations-participant': (gouvernancePersona) =>
    `/${gouvernancePersona}/informations-participant`,
  'perimetre-feuille-de-route': (gouvernancePersona) =>
    `/${gouvernancePersona}/perimetre-feuille-de-route`,
  'contacts-collectivites': (gouvernancePersona) =>
    `/${gouvernancePersona}/contacts-collectivites`,
  'autres-structures': (gouvernancePersona) =>
    `/${gouvernancePersona}/autres-structures`,
  recapitulatif: (gouvernancePersona) => `/${gouvernancePersona}/recapitulatif`,
  'confirmation-formulaire-envoye': (gouvernancePersona) =>
    `/${gouvernancePersona}/confirmation-formulaire-envoye`,
} satisfies {
  [key in EtapeFormulaireGouvernance]:
    | string
    | ((gouvernancePersonaId: GouvernancePersonaId) => string)
}

/**
 * Un formulaire est un "tunnel" d'étapes.
 * L'utilisateur peut généralement revenir à l'étape précédénte, si c'est une étape "autorisée" en fonction du state du formulaire.
 * Sinon il est redirigé vers la page courante de l'étape du formulaire en fonction du state.
 *
 * On utilise des routes  Pour découper le code et permettre de naviguer dans le formulaire.
 * Une page correspond à un état du formulaire.
 */

export type EtapeFormulaireGouvernanceInfo = {
  etape: EtapeFormulaireGouvernance
  etapePath: string
  absolutePath: string
  // TODO Add return path for a given step
  // TODO Add breadcrumb infos for a given step
}

export const getEtapeInfo = (
  etape: EtapeFormulaireGouvernance,
  gouvernancePersonaId?: GouvernancePersonaId | null,
): EtapeFormulaireGouvernanceInfo => {
  const etapePath = etapePathForEtapeFormulaireGouvernance[etape]

  if (typeof etapePath === 'string') {
    return {
      etape,
      etapePath,
      absolutePath: `/formulaires-feuilles-de-routes-territoriales${etapePath}`,
    }
  }
  if (!gouvernancePersonaId) {
    throw new Error(
      `Impossible de trouver le chemin de l'étape ${etape} sans gouvernancePersonaId`,
    )
  }

  const resolvedEtapePath = etapePath(gouvernancePersonaId)

  return {
    etape,
    etapePath: resolvedEtapePath,
    absolutePath: `/formulaires-feuilles-de-routes-territoriales${resolvedEtapePath}`,
  }
}

export type GetEtapeInput = {
  formulaireGouvernance: Pick<
    GouvernanceFormulaireForForm,
    | 'gouvernancePersona'
    | 'intention'
    | 'etapeContacts'
    | 'etapeStructures'
    | 'etapePerimetre'
    | 'etapeInformationsParticipant'
    | 'confirmeEtEnvoye'
  >
  // Feature flag while developing
  developmentPreview: boolean
  user: {
    gouvernancePersona: string | null
  }
}

export type EtapeEnCours = {
  etape: EtapeFormulaireGouvernance
  retour: EtapeFormulaireGouvernance | null
  breadcrumb: string[]
  etapesAccessibles: EtapeFormulaireGouvernance[]
}

export const getEtapeFormulaire = ({
  formulaireGouvernance: {
    gouvernancePersona: gouvernancePersonaString,
    etapeContacts,
    etapePerimetre,
    etapeStructures,
    etapeInformationsParticipant,
    intention,
    confirmeEtEnvoye,
  },
  developmentPreview,
  user,
}: GetEtapeInput): EtapeEnCours => {
  const gouvernancePersona = gouvernancePersonaString as GouvernancePersonaId

  // La persona est choisie à l'inscription, mais si elle n'est pas choisie, on redirige vers la page de choix de persona
  // On peut aussi y arriver avec un query param ?changer=1 pour forcer le changement / recommencer un formulaire
  // On peut aussi y arriver si on s'inscrit avec une autre persona que notre persona en cours
  if (!gouvernancePersona || gouvernancePersona !== user.gouvernancePersona) {
    return {
      etape: 'choix-du-formulaire',
      retour: null,
      breadcrumb: [],
      etapesAccessibles: [],
    }
  }

  // Pendant le développement, page finale, confirmation d'inscription. Sera supprimée
  if (!developmentPreview) {
    return {
      etape: 'confirmation-inscription',
      retour: null,
      breadcrumb: [],
      etapesAccessibles: ['choix-du-formulaire'],
    }
  }

  // Le formulaire n'est plus modifiable une fois envoyé, c'est la seule page accessible
  if (confirmeEtEnvoye) {
    return {
      etape: 'confirmation-formulaire-envoye',
      retour: null,
      breadcrumb: [],
      etapesAccessibles: [],
    }
  }

  // Choix entre les 2 branches du formulaire (porter ou participer)
  // On peut choisir de porter ou participer si on est dans le cas d'une collectivité plus grande qu'une commune
  const peutPorter = personaPeutPorterUneFeuilleDeRoute(gouvernancePersona)
  if (!intention && peutPorter) {
    return {
      etape: 'porter-ou-participer',
      retour: null,
      breadcrumb: [],
      etapesAccessibles: ['choix-du-formulaire'],
    }
  }

  // Branche "Participer"
  // C'est la seule page de formulaire dans l'intention "Participer"
  if (!peutPorter || intention === 'Participer') {
    return {
      etape: 'participer',
      retour: null,
      breadcrumb: [],
      etapesAccessibles: peutPorter
        ? ['choix-du-formulaire', 'porter-ou-participer']
        : ['choix-du-formulaire'],
    }
  }

  // Branche "Porter"
  if (!etapeInformationsParticipant) {
    return {
      etape: 'informations-participant',
      retour: null,
      breadcrumb: [],
      etapesAccessibles: ['choix-du-formulaire', 'porter-ou-participer'],
    }
  }

  if (!etapePerimetre) {
    return {
      etape: 'perimetre-feuille-de-route',
      retour: 'informations-participant',
      breadcrumb: [],
      etapesAccessibles: [
        'choix-du-formulaire',
        'porter-ou-participer',
        'informations-participant',
      ],
    }
  }

  if (!etapeContacts) {
    return {
      etape: 'contacts-collectivites',
      retour: 'perimetre-feuille-de-route',
      breadcrumb: [],
      etapesAccessibles: [
        'choix-du-formulaire',
        'porter-ou-participer',
        'informations-participant',
        'perimetre-feuille-de-route',
      ],
    }
  }

  if (!etapeStructures) {
    return {
      etape: 'autres-structures',
      retour: 'contacts-collectivites',
      breadcrumb: [],
      etapesAccessibles: [
        'choix-du-formulaire',
        'porter-ou-participer',
        'informations-participant',
        'perimetre-feuille-de-route',
        'contacts-collectivites',
      ],
    }
  }

  if (!confirmeEtEnvoye) {
    return {
      etape: 'recapitulatif',
      retour: 'autres-structures',
      breadcrumb: [],
      etapesAccessibles: [
        'choix-du-formulaire',
        'porter-ou-participer',
        'informations-participant',
        'perimetre-feuille-de-route',
        'contacts-collectivites',
        'autres-structures',
      ],
    }
  }

  throw new Error("Impossible de trouver l'étape du formulaire")
}

export const getInfoEtapeFormulaire = (input: GetEtapeInput) =>
  getEtapeInfo(
    getEtapeFormulaire(input).etape,
    input.formulaireGouvernance.gouvernancePersona as
      | GouvernancePersonaId
      | undefined,
  )
