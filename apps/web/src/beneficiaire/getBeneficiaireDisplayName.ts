export const getBeneficiaireDisplayName = ({
  prenom,
  nom,
}: {
  prenom?: string | null
  nom?: string | null
}) => {
  if (!prenom && !nom) return 'Bénéficiaire anonyme'

  return `${prenom} ${nom}`.trim()
}
