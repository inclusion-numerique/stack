export const getMembreGouvernanceStringName = ({
  id,
  region,
  departement,
  epci,
  commune,
  nomStructure,
  siret,
  formel,
}: {
  id: string
  region?: { nom: string } | null
  departement?: { nom: string } | null
  epci?: { nom: string } | null
  commune?: { nom: string } | null
  nomStructure?: string | null
  siret?: string | null
  formel?: boolean
}) => {
  if (region?.nom) {
    return formel ? `Conseil régional · ${region.nom}` : `CR · ${region.nom}`
  }

  if (departement?.nom) {
    return formel
      ? `Conseil départemental · ${departement.nom}`
      : `CD · ${departement.nom}`
  }

  return epci?.nom ?? commune?.nom ?? nomStructure ?? siret ?? id
}

export type MembreGouvernanceType =
  | 'Conseil régional'
  | 'Conseil départemental'
  | 'EPCI'
  | 'Commune'
  | 'Structure'
export const membreGouvernanceTypes = [
  'Conseil régional',
  'Conseil départemental',
  'EPCI',
  'Commune',
  'Structure',
] as const satisfies MembreGouvernanceType[]

export const getMembreGouvernanceTypologie = ({
  region,
  departement,
  epci,
  commune,
}: {
  region: { nom: string } | null
  departement: { nom: string } | null
  epci: { nom: string } | null
  commune: { nom: string } | null
  nomStructure: string | null
  siret: string | null
}): MembreGouvernanceType => {
  if (region) {
    return 'Conseil régional'
  }

  if (departement) {
    return 'Conseil départemental'
  }

  if (epci) {
    return 'EPCI'
  }

  if (commune) {
    return 'Commune'
  }

  return 'Structure'
}

export type MembreGouvernanceStatut = 'Coporteur' | 'Membre'

export const membreGouvernanceStatuts = [
  'Coporteur',
  'Membre',
] as const satisfies MembreGouvernanceStatut[]

export const getMembreGouvernanceStatut = ({
  coporteur,
}: {
  coporteur: boolean
}): MembreGouvernanceStatut => (coporteur ? 'Coporteur' : 'Membre')

export const getMembreGouvernanceCodeInsee = ({
  region,
  departement,
  epci,
  commune,
}: {
  region: { code: string } | null
  departement: { code: string } | null
  epci: { code: string } | null
  commune: { code: string } | null
}) => {
  if (region) {
    return region.code
  }

  if (departement) {
    return departement.code
  }

  return epci?.code ?? commune?.code ?? null
}

export const getMembreGouvernanceSiret = ({
  siret,
}: {
  siret: string | null
}) => siret ?? null
