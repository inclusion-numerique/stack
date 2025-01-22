import type { DefaultValues } from 'react-hook-form'
import type { Beneficiaire } from '@prisma/client'
import type { BeneficiaireCraData } from '@app/web/beneficiaire/BeneficiaireValidation'
import { banDefaultValueToAdresseBanData } from '@app/web/external-apis/ban/banDefaultValueToAdresseBanData'

export const getBeneficiaireDefaulCratDataFromExisting =
  ({
    notes,
    id,
    commune,
    adresse,
    anneeNaissance,
    communeCodeInsee,
    communeCodePostal,
    email,
    genre,
    mediateurId,
    nom,
    pasDeTelephone,
    prenom,
    statutSocial,
    telephone,
    trancheAge,
  }: Exclude<Beneficiaire, 'supression' | 'creation' | 'modification'>) =>
  (premierAccompagnement?: boolean): DefaultValues<BeneficiaireCraData> => ({
    id: id ?? undefined,
    communeResidence:
      commune && communeCodeInsee && communeCodePostal
        ? banDefaultValueToAdresseBanData({
            commune: commune ?? undefined,
            codePostal: communeCodePostal ?? undefined,
            codeInsee: communeCodeInsee ?? undefined,
          })
        : undefined,
    adresse: adresse ?? undefined,
    anneeNaissance: anneeNaissance ?? undefined,
    email: email ?? undefined,
    genre: genre ?? undefined,
    mediateurId: mediateurId ?? undefined,
    nom: nom ?? undefined,
    pasDeTelephone: pasDeTelephone ?? undefined,
    prenom: prenom ?? undefined,
    statutSocial: statutSocial ?? undefined,
    telephone: telephone ?? undefined,
    trancheAge: trancheAge ?? undefined,
    notes: notes ?? undefined,
    dejaAccompagne:
      premierAccompagnement == null ? undefined : !premierAccompagnement,
  })
