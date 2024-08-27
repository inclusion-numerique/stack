import { DefaultValues } from 'react-hook-form'
import { prismaClient } from '@app/web/prismaClient'
import { DureeAccompagnement } from '@app/web/cra/cra'
import { getBeneficiaireDefaulCratDataFromExisting } from '@app/web/app/coop/mes-activites/cra/getBeneficiaireDefaulCratDataFromExisting'
import { banDefaultValueToAdresseBanData } from '@app/web/external-apis/ban/banDefaultValueToAdresseBanData'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { CraIndividuelData } from '@app/web/cra/CraIndividuelValidation'
import { optionalBooleanToYesNo } from '@app/web/utils/yesNoBooleanOptions'

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
  const cra = await prismaClient.craIndividuel.findUnique({
    where: {
      id,
      creeParMediateurId: mediateurId,
      suppression: null,
    },
    select: {
      beneficiaire: true,
      date: true,
      duree: true,
      lieuAccompagnement: true,
      lieuAccompagnementDomicileCodeInsee: true,
      lieuAccompagnementDomicileCodePostal: true,
      lieuAccompagnementDomicileCommune: true,
      lieuActiviteId: true,
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
    beneficiaire,
    date,
    duree,
    notes,
    autonomie,
    thematiques,
    structureDeRedirection,
    lieuActiviteId,
    lieuAccompagnementDomicileCommune,
    lieuAccompagnementDomicileCodePostal,
    lieuAccompagnementDomicileCodeInsee,
    lieuAccompagnement,
    materiel,
    orienteVersStructure,
  } = cra

  const defaultValues = {
    id,
    mediateurId,
    beneficiaire: getBeneficiaireDefaulCratDataFromExisting(beneficiaire),
    date: dateAsIsoDay(date),
    duree: duree.toString() as DureeAccompagnement,
    notes: notes ?? undefined,
    autonomie: autonomie ?? undefined,
    orienteVersStructure: optionalBooleanToYesNo(orienteVersStructure),
    materiel: materiel ?? undefined,
    thematiques: thematiques ?? undefined,
    structureDeRedirection: structureDeRedirection ?? undefined,
    lieuActiviteId: lieuActiviteId ?? undefined,
    lieuAccompagnementDomicileCommune:
      lieuAccompagnementDomicileCommune &&
      lieuAccompagnementDomicileCodePostal &&
      lieuAccompagnementDomicileCodeInsee
        ? banDefaultValueToAdresseBanData({
            commune: lieuAccompagnementDomicileCommune ?? undefined,
            codePostal: lieuAccompagnementDomicileCodePostal ?? undefined,
            codeInsee: lieuAccompagnementDomicileCodeInsee ?? undefined,
          })
        : undefined,
    lieuAccompagnement: lieuAccompagnement ?? undefined,
  } satisfies DefaultValues<CraIndividuelData>

  return defaultValues
}
