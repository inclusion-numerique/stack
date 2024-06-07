export const addresseFromParts = ({
  adresse,
  codePostal,
  commune,
}: {
  adresse?: string | null // Only street address (e.g. "123 rue de la plage")
  commune?: string | null
  codePostal?: string | null
}) => {
  let addresse = ''
  if (adresse) {
    addresse += adresse
  }
  if (adresse && (codePostal || commune)) {
    addresse += ', '
  }
  if (codePostal) {
    addresse += codePostal
  }
  if (codePostal && commune) {
    addresse += ' '
  }
  if (commune) {
    addresse += commune
  }
  return addresse
}
