/**
 * E.g. "Conseiller-Numerique_6669b35fcc6b7a075a224af9__Conseiller-Numerique_6669b35fcc6b7a075a224afa__RhinOcc_PaE__Coop_aaabb333-cccdd-4343__source3_abcd"
 */

const conumPermanenceIdExtract = /(?:^|_)conseiller-numerique_([\da-f]{3,})/gi

const coopIdExtract = /(?:^|_)coop_([\da-f-]{3,})/gi

export const extractIdsFromCartographieNationaleStructure = ({
  id,
}: {
  id: string
}) => {
  const coopIdMatches = [...id.matchAll(coopIdExtract)].map((match) => match[1])

  const conseillerNumeriquePermanenceIdMatches = [
    ...id.matchAll(conumPermanenceIdExtract),
  ].map((match) => match[1])

  return {
    coopId: coopIdMatches[0],
    coopIds: coopIdMatches,
    conseillerNumeriquePermanenceIds: conseillerNumeriquePermanenceIdMatches,
  }
}
