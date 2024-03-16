export const getMembreGouvernanceStringName = ({
  id,
  region,
  departement,
  epci,
  commune,
  nomStructure,
  siret,
}: {
  id: string
  region: { nom: string } | null
  departement: { nom: string } | null
  epci: { nom: string } | null
  commune: { nom: string } | null
  nomStructure: string | null
  siret: string | null
}) =>
  region?.nom ??
  departement?.nom ??
  epci?.nom ??
  commune?.nom ??
  nomStructure ??
  siret ??
  id
