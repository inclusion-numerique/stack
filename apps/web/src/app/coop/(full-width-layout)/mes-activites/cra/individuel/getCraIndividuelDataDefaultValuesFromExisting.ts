import { DefaultValues } from 'react-hook-form'
import { prismaClient } from '@app/web/prismaClient'
import { getBeneficiaireDefaulCratDataFromExisting } from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/getBeneficiaireDefaulCratDataFromExisting'
import { banDefaultValueToAdresseBanData } from '@app/web/external-apis/ban/banDefaultValueToAdresseBanData'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { CraIndividuelData } from '@app/web/cra/CraIndividuelValidation'
import { optionalBooleanToYesNo } from '@app/web/utils/yesNoBooleanOptions'
import { minutesToCraDureeData } from '@app/web/cra/minutesToCraDuree'

export const getCraIndividuelDataDefaultValuesFromExisting = async ({
  id,
  mediateurId,
}: {
  id: string
  mediateurId: string
}): Promise<
  | (DefaultValues<CraIndividuelData> & {
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
      type: 'Individuel',
    },
    select: {
      accompagnements: {
        select: {
          beneficiaire: true,
        },
      },
      date: true,
      duree: true,
      typeLieu: true,
      lieuCodeInsee: true,
      lieuCodePostal: true,
      lieuCommune: true,
      structureId: true,
      materiel: true,
      thematiques: true,
      autonomie: true,
      orienteVersStructure: true,
      structureDeRedirection: true,
      notes: true,
    },
  })

  if (!cra) {
    return null
  }

  const {
    accompagnements,
    date,
    duree,
    notes,
    autonomie,
    thematiques,
    structureDeRedirection,
    typeLieu,
    lieuCodeInsee,
    lieuCodePostal,
    lieuCommune,
    structureId,
    materiel,
    orienteVersStructure,
  } = cra

  const beneficiaire = accompagnements[0]?.beneficiaire

  const defaultValues = {
    id,
    mediateurId,
    beneficiaire: beneficiaire
      ? getBeneficiaireDefaulCratDataFromExisting(beneficiaire)
      : { mediateurId },
    date: dateAsIsoDay(date),
    duree: minutesToCraDureeData(duree) ?? {},
    notes: notes ?? undefined,
    autonomie: autonomie ?? undefined,
    orienteVersStructure: optionalBooleanToYesNo(orienteVersStructure),
    materiel: materiel ?? undefined,
    thematiques: thematiques ?? undefined,
    structureDeRedirection: structureDeRedirection ?? undefined,
    structureId: structureId ?? undefined,
    lieuCommuneData:
      lieuCommune && lieuCodePostal && lieuCodeInsee
        ? banDefaultValueToAdresseBanData({
            commune: lieuCommune ?? undefined,
            codePostal: lieuCodePostal ?? undefined,
            codeInsee: lieuCodeInsee ?? undefined,
          })
        : undefined,
    typeLieu: typeLieu ?? undefined,
  } satisfies DefaultValues<CraIndividuelData>

  return defaultValues
}
