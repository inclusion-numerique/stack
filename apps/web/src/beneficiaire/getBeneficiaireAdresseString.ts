import { BeneficiaireCraData } from '@app/web/beneficiaire/BeneficiaireValidation'

export const getBeneficiaireAdresseString = ({
  communeResidence,
  adresse,
}: Pick<BeneficiaireCraData, 'communeResidence' | 'adresse'>):
  | string
  | undefined => {
  if (!communeResidence) return adresse ?? undefined

  const { codePostal, nom } = communeResidence

  let result = ''
  if (adresse) result += `${adresse}, `
  if (codePostal) result += `${codePostal} `
  if (nom) result += `${nom}`

  return result
}
