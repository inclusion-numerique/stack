import type { DefaultValues } from 'react-hook-form'
import { prismaClient } from '@app/web/prismaClient'
import { DureeAccompagnement } from '@app/web/cra/cra'
import { getBeneficiaireDefaulCratDataFromExisting } from '@app/web/app/coop/mes-activites/cra/getBeneficiaireDefaulCratDataFromExisting'
import { banDefaultValueToAdresseBanData } from '@app/web/external-apis/ban/banDefaultValueToAdresseBanData'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import type { CraCollectifData } from '@app/web/cra/CraCollectifValidation'

export const getCraCollectifDataDefaultValuesFromExisting = async ({
  id,
  mediateurId,
}: {
  id: string
  mediateurId: string
}): Promise<
  | (DefaultValues<CraCollectifData> & {
      id: string
      mediateurId: string
    })
  | null
> => {
  const cra = await prismaClient.craCollectif.findUnique({
    where: {
      id,
      creeParMediateurId: mediateurId,
      suppression: null,
    },
    select: {
      participants: {
        select: {
          id: true,
          beneficiaire: true,
        },
      },
      participantsAnonymes: true,
      date: true,
      duree: true,
      titreAtelier: true,
      lieuAtelier: true,
      lieuAccompagnementAutreCodeInsee: true,
      lieuAccompagnementAutreCodePostal: true,
      lieuAccompagnementAutreCommune: true,
      lieuActiviteId: true,
      materiel: true,
      thematiques: true,
      niveau: true,
      notes: true,
    },
  })

  if (!cra) {
    return null
  }

  const {
    date,
    duree,
    notes,
    thematiques,
    lieuActiviteId,
    materiel,
    participants,
    participantsAnonymes,
    lieuAccompagnementAutreCodeInsee,
    lieuAccompagnementAutreCodePostal,
    lieuAccompagnementAutreCommune,
    lieuAtelier,
    niveau,
    titreAtelier,
  } = cra

  const participantsDefaultValues = participants.map(
    ({ beneficiaire }) =>
      getBeneficiaireDefaulCratDataFromExisting(beneficiaire),
    // I cannot figure out how to make the type checker happy without this cast
  ) as Exclude<
    DefaultValues<CraCollectifData>['participants'],
    undefined
  > satisfies DefaultValues<CraCollectifData>['participants']

  const defaultValues = {
    id,
    mediateurId,
    participants: participantsDefaultValues,
    date: dateAsIsoDay(date),
    duree: duree.toString() as DureeAccompagnement,
    notes: notes ?? undefined,
    materiel: materiel ?? undefined,
    thematiques: thematiques ?? undefined,
    lieuActiviteId: lieuActiviteId ?? undefined,
    lieuAtelierAutreCommune:
      lieuAccompagnementAutreCommune &&
      lieuAccompagnementAutreCodePostal &&
      lieuAccompagnementAutreCodeInsee
        ? banDefaultValueToAdresseBanData({
            commune: lieuAccompagnementAutreCommune ?? undefined,
            codePostal: lieuAccompagnementAutreCodePostal ?? undefined,
            codeInsee: lieuAccompagnementAutreCodeInsee ?? undefined,
          })
        : undefined,
    participantsAnonymes,
    lieuAtelier: lieuAtelier ?? undefined,
    niveau: niveau ?? undefined,
    titreAtelier: titreAtelier ?? undefined,
  } satisfies DefaultValues<CraCollectifData>

  return defaultValues
}
