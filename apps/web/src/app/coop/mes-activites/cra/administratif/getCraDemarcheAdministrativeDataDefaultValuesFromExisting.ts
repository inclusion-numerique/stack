import { DefaultValues } from 'react-hook-form'
import { CraDemarcheAdministrativeData } from '@app/web/cra/CraDemarcheAdministrativeValidation'
import { prismaClient } from '@app/web/prismaClient'
import { DureeAccompagnement } from '@app/web/cra/cra'
import { getBeneficiaireDefaulCratDataFromExisting } from '@app/web/app/coop/mes-activites/cra/getBeneficiaireDefaulCratDataFromExisting'
import { banDefaultValueToAdresseBanData } from '@app/web/external-apis/ban/banDefaultValueToAdresseBanData'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'

export const getCraDemarcheAdministrativeDataDefaultValuesFromExisting =
  async ({
    id,
    mediateurId,
  }: {
    id: string
    mediateurId: string
  }): Promise<
    | (DefaultValues<CraDemarcheAdministrativeData> & {
        id: string
        mediateurId: string
      })
    | null
  > => {
    const cra = await prismaClient.craDemarcheAdministrative.findUnique({
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
        notes: true,
        precisionsDemarche: true,
        structureDeRedirection: true,
        thematiques: true,
        degreDeFinalisation: true,
        autonomie: true,
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
      degreDeFinalisation,
      thematiques,
      structureDeRedirection,
      precisionsDemarche,
      lieuActiviteId,
      lieuAccompagnementDomicileCommune,
      lieuAccompagnementDomicileCodePostal,
      lieuAccompagnementDomicileCodeInsee,
      lieuAccompagnement,
    } = cra

    const defaultValues = {
      id,
      mediateurId,
      beneficiaire: getBeneficiaireDefaulCratDataFromExisting(beneficiaire),
      date: dateAsIsoDay(date),
      duree: duree.toString() as DureeAccompagnement,
      notes: notes ?? undefined,
      autonomie: autonomie ?? undefined,
      degreDeFinalisation: degreDeFinalisation ?? undefined,
      thematiques: thematiques ?? undefined,
      structureDeRedirection: structureDeRedirection ?? undefined,
      precisionsDemarche: precisionsDemarche ?? undefined,
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
    } satisfies DefaultValues<CraDemarcheAdministrativeData>

    return defaultValues
  }
