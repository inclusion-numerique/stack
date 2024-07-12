import { LieuActivite } from './LieuActivite'

export const LieuxActiviteList = ({
  lieuxActivite,
}: {
  lieuxActivite: {
    modification: Date
    creation: Date
    structure: {
      id: string
      nom: string
      adresse: string
      complementAdresse?: string | null
      codePostal: string
      commune: string
      typologies?: string[]
      siret?: string | null
      rna?: string | null
      visiblePourCartographieNationale?: boolean
      structureCartographieNationaleId?: string | null
    }
  }[]
}) =>
  lieuxActivite.map((lieuActivite) => (
    <LieuActivite
      key={lieuActivite.structure.id}
      {...lieuActivite.structure}
      creation={lieuActivite.creation}
      modification={lieuActivite.modification}
    />
  ))
