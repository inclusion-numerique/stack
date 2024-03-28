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
}) => {
  if (region?.nom) {
    return `CR · ${region.nom}`
  }

  if (departement?.nom) {
    return `CD · ${departement.nom}`
  }

  return epci?.nom ?? commune?.nom ?? nomStructure ?? siret ?? id
}
