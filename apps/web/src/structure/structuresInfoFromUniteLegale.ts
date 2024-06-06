import { UniteLegale } from '@app/web/external-apis/apiEntrepriseApiModels'
import { getTypologieFromApiEntreprise } from '@app/web/structure/typologieFromApiEntreprise'
import { toTitleCase } from '@app/web/utils/toTitleCase'

export const structuresInfoFromUniteLegale = ({
  nature_juridique,
  complements,
  nom_raison_sociale,
  matching_etablissements,
}: UniteLegale) => {
  const typologie = getTypologieFromApiEntreprise({
    complements,
    nature_juridique,
  })

  return matching_etablissements
    .filter(({ etat_administratif }) => etat_administratif === 'A')
    .map(
      ({
        adresse,
        commune,
        libelle_commune,
        liste_enseignes,
        est_siege,
        siret,
      }) => {
        const nomEnseigne = liste_enseignes?.at(0)

        const nom = est_siege
          ? nom_raison_sociale
          : nomEnseigne && nomEnseigne !== nom_raison_sociale
            ? `${nomEnseigne} · ${nom_raison_sociale}`
            : nom_raison_sociale

        return {
          siret,
          adresse: toTitleCase(adresse),
          typologie,
          commune: toTitleCase(libelle_commune),
          codeInsee: commune,
          nom: toTitleCase(nom),
        }
      },
    )
}

export type StructureInfo = ReturnType<
  typeof structuresInfoFromUniteLegale
>[number]

export type StructureInfoWithId = StructureInfo & { id: string }

export type StructureInfoWithCartoNationaleId = StructureInfo & {
  cartoNationalId: string
}

export type StructureInfoWithCartoNationaleIdAndId =
  StructureInfoWithCartoNationaleId & {
    id: string
  }