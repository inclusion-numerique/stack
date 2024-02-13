import { DefaultValues } from 'react-hook-form/dist/types/form'
import { GouvernanceForForm } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { GouvernanceData } from '@app/web/gouvernance/Gouvernance'
import { membreToFormMembre } from '@app/web/gouvernance/GouvernanceActor'

export const getGouvernanceFormDefaultValues = (
  gouvernance: GouvernanceForForm,
): DefaultValues<GouvernanceData> => {
  const defaultValues: DefaultValues<GouvernanceData> = {
    gouvernanceId: gouvernance.id,
    recruteursCoordinateurs: [],
    comites: [],
    feuillesDeRoute: [],
    membres: [],
  }

  const {
    sousPrefetReferentPrenom,
    sousPrefetReferentNom,
    sousPrefetReferentEmail,
    membres,
    pasDeCoporteurs,
    comites,
    feuillesDeRoute,
    noteDeContexte,
    organisationsRecruteusesCoordinateurs,
  } = gouvernance

  // Section contactDuSousPrefetReferent
  defaultValues.sousPrefetReferentPrenom = sousPrefetReferentPrenom ?? undefined
  defaultValues.sousPrefetReferentNom = sousPrefetReferentNom ?? undefined
  defaultValues.sousPrefetReferentEmail = sousPrefetReferentEmail ?? undefined

  // Section coporteurs et membres
  defaultValues.membres = membres.map(membreToFormMembre)
  defaultValues.pasDeCoporteurs = pasDeCoporteurs ?? undefined

  // Comitologie
  defaultValues.comites = comites.map((comite) => ({
    id: comite.id,
    type: comite.type,
    commentaire: comite.commentaire ?? undefined,
    frequence: comite.frequence,
    typeAutrePrecisions: comite.typeAutrePrecisions ?? undefined,
  }))

  // FeuillesDeRouteEtPorteurs
  defaultValues.feuillesDeRoute = feuillesDeRoute.map(
    ({
      id,
      nom,
      contratPreexistant,
      typeContrat,
      typeContratAutreDescription,
      perimetreDepartement,
      perimetreRegion,
      perimetreEpcis,
      membres: membresFeuilleDeRoute,
    }) => {
      const membrePorteur = membresFeuilleDeRoute.find(
        ({ role }) => role === 'Porteur',
      )?.membre

      const porteur = membrePorteur
        ? membreToFormMembre(membrePorteur)
        : undefined

      return {
        id,
        nom,
        contratPreexistant: contratPreexistant ? 'oui' : 'non',
        typeContrat,
        typeContratAutreDescription,
        porteur,
        perimetreScope: perimetreRegion
          ? 'region'
          : perimetreDepartement
            ? 'departement'
            : perimetreEpcis.length > 0
              ? 'epci'
              : undefined,

        perimetreEpciCodes: perimetreEpcis.map(({ epci }) => epci.code),
      }
    },
  )

  // Coordinateurs
  defaultValues.recruteursCoordinateurs =
    organisationsRecruteusesCoordinateurs.map(({ siretInformations }) => ({
      siret: siretInformations.siret,
      nom: siretInformations.nom ?? undefined,
    }))

  // NoteDeContexte
  defaultValues.noteDeContexte = noteDeContexte ?? undefined

  return defaultValues
}
