import { getBeneficiaireDefaulCratDataFromExisting } from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/getBeneficiaireDefaulCratDataFromExisting'
import { createParticipantsAnonymesForBeneficiaires } from '@app/web/beneficiaire/createParticipantsAnonymesForBeneficiaires'
import type { CraCollectifData } from '@app/web/cra/CraCollectifValidation'
import { minutesToCraDureeData } from '@app/web/cra/minutesToCraDuree'
import { banDefaultValueToAdresseBanData } from '@app/web/external-apis/ban/banDefaultValueToAdresseBanData'
import { prismaClient } from '@app/web/prismaClient'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import type { DefaultValues } from 'react-hook-form'

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
  const cra = await prismaClient.activite.findUnique({
    where: {
      id,
      mediateurId,
      suppression: null,
      type: 'Collectif',
    },
    select: {
      accompagnements: {
        select: {
          beneficiaire: true,
          premierAccompagnement: true,
        },
      },
      date: true,
      duree: true,
      titreAtelier: true,
      typeLieu: true,
      lieuCodeInsee: true,
      lieuCodePostal: true,
      lieuCommune: true,
      structureId: true,
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
    materiel,
    lieuCommune,
    lieuCodePostal,
    lieuCodeInsee,
    structureId,
    accompagnements,
    typeLieu,
    niveau,
    titreAtelier,
  } = cra

  const { beneficiairesSuivis, participantsAnonymes } =
    createParticipantsAnonymesForBeneficiaires(
      accompagnements.map(({ beneficiaire, premierAccompagnement }) => ({
        ...beneficiaire,
        premierAccompagnement,
      })),
    )

  const participantsDefaultValues = beneficiairesSuivis.map(
    (beneficiaire) => getBeneficiaireDefaulCratDataFromExisting(beneficiaire)(),
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
    duree: minutesToCraDureeData(duree) ?? {},
    notes: notes ?? undefined,
    materiel: materiel ?? undefined,
    thematiques: thematiques ?? undefined,
    structureId: structureId ?? undefined,
    lieuCommuneData:
      lieuCommune && lieuCodePostal && lieuCodeInsee
        ? banDefaultValueToAdresseBanData({
            commune: lieuCommune ?? undefined,
            codePostal: lieuCodePostal ?? undefined,
            codeInsee: lieuCodeInsee ?? undefined,
          })
        : undefined,
    participantsAnonymes,
    typeLieu: typeLieu ?? undefined,
    niveau: niveau ?? undefined,
    titreAtelier: titreAtelier ?? undefined,
  } satisfies DefaultValues<CraCollectifData>

  return defaultValues
}
