import type { BesoinSubvention } from '@prisma/client'
import { labelsToOptions } from '@app/web/utils/options'

export const besoinSubventionLabel: { [value in BesoinSubvention]: string } = {
  FaireUnDiagnosticTerritorial: 'Faire un diagnostic territorial',
}

// TODO Categories as group options
// Voir les categories de Besoin ici : https://www.figma.com/file/a5fG2vF2lWOT50YFrEhkeB/Espace-France-Num%C3%A9rique-Ensemble?type=design&node-id=4252-9959&mode=design&t=kB4uJGC9gtnUeWji-4
// Besoins relatif à la formalisation des feuilles de route
// Besoins relatif au financement du déploiement de la/des feuille(s) de route
// Besoin relatifs à l'outillage des acteurs de votre territoire
// Besoins relatifs à la formation des professionnels de l'inclusion numérique
export const besoinSubventionOptions = labelsToOptions(besoinSubventionLabel)
