import type { Beneficiaire } from '@prisma/client'
import { BeneficiaireData } from '@app/web/beneficiaire/BeneficiaireValidation'

export const beneficiaireCommuneResidenceToPreviewBanData = ({
  commune,
  communeCodeInsee,
  communeCodePostal,
}: Pick<Beneficiaire, 'communeCodePostal' | 'communeCodeInsee' | 'commune'>) =>
  commune && communeCodePostal && communeCodeInsee
    ? // We only need data for preview in UI
      {
        id: communeCodeInsee, // Used as key in select component
        nom: commune,
        codePostal: communeCodePostal,
        codeInsee: communeCodeInsee,
        commune,
        latitude: 0,
        longitude: 0,
        contexte: '',
        label: commune,
      }
    : undefined

export const prismaBeneficiaireToBeneficiaireData = ({
  communeCodeInsee,
  mediateurId,
  communeCodePostal,
  commune,
  trancheAge,
  anneeNaissance,
  prenom,
  nom,
  id,
}: Pick<
  Beneficiaire,
  | 'id'
  | 'mediateurId'
  | 'nom'
  | 'prenom'
  | 'communeCodePostal'
  | 'communeCodeInsee'
  | 'commune'
  | 'trancheAge'
  | 'anneeNaissance'
>): BeneficiaireData => ({
  id,
  mediateurId,
  prenom: prenom ?? '',
  nom: nom ?? '',
  communeResidence: beneficiaireCommuneResidenceToPreviewBanData({
    commune,
    communeCodeInsee,
    communeCodePostal,
  }),
  trancheAge,
  anneeNaissance,
})
