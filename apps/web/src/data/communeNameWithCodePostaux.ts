export const communeNameWithCodePostaux = ({
  nom,
  codesPostaux,
}: {
  nom: string
  codesPostaux: { codePostal: { code: string } }[]
}) =>
  `${nom} - ${codesPostaux.map(({ codePostal: { code } }) => code).join(', ')}`
