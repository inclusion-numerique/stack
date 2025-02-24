import { BeneficiaireData } from '@app/web/beneficiaire/BeneficiaireValidation'
import type { Beneficiaire } from '@prisma/client'

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

export const prismaBeneficiaireToBeneficiaireData = <
  T extends Pick<
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
    | 'creation'
  >,
>({
  communeCodeInsee,
  mediateurId,
  communeCodePostal,
  commune,
  trancheAge,
  anneeNaissance,
  prenom,
  nom,
  id,
  creation,
  ...rest
}: T): BeneficiaireData & { id: string; creation: Date } => ({
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
  creation,
  ...rest,
})
