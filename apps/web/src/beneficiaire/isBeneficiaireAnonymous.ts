export const isBeneficiaireAnonymous = ({
  prenom,
  nom,
}: {
  prenom?: string | null
  nom?: string | null
}) => !prenom && !nom
