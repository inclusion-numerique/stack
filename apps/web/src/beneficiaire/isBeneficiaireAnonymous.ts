import type { Genre, StatutSocial, TrancheAge } from '@prisma/client'

export const isBeneficiaireAnonymous = ({
  prenom,
  nom,
}: {
  prenom?: string | null
  nom?: string | null
}) => !prenom && !nom

export const isBeneficiaireEmpty = ({
  genre,
  nom,
  prenom,
  statutSocial,
  trancheAge,
}: {
  prenom?: string | null
  nom?: string | null
  genre?: Genre | null
  trancheAge?: TrancheAge | null
  statutSocial?: StatutSocial | null
}) =>
  isBeneficiaireAnonymous({ prenom, nom }) &&
  !genre &&
  !trancheAge &&
  !statutSocial
