import { output } from '@app/cli/output'
import type { Prisma } from '@prisma/client'
import { BuildStructuresCartographieNationaleOutput } from '@app/web/data/buildDatabase/buildStructuresCartographieNationale'
import { getCnfsPermanences } from '@app/web/data/cnfsPermanences'

export const buildPermanencesConum = async ({
  structuresCartographieNationale,
}: {
  structuresCartographieNationale: BuildStructuresCartographieNationaleOutput
}) => {
  output(
    '-- Getting data from local json https://api.conseiller-numerique.gouv.fr/permanences...',
  )

  const permanences = await getCnfsPermanences()

  output(`-- Preparing data (${permanences.length})...`)

  const permanenceData: Prisma.PermanenceConseillerNumeriqueCreateManyInput[] =
    []

  // Deduplicated conseillers from permanences
  const conseillerNumeriqueData = new Map<
    string,
    Prisma.ConseillerNumeriqueCreateManyInput
  >()

  // Explicit many to many
  const conseillersEnPermanenceData: Prisma.ConseillerNumeriqueEnPermanenceCreateManyInput[] =
    []

  for (const permanence of permanences) {
    let errors: Record<string, string> | undefined

    const structureCartographieNationaleId =
      structuresCartographieNationale.byConumPermanenceId.get(permanence.id)

    if (!structureCartographieNationaleId) {
      errors = {}

      errors.structureCartographieNationaleId = `Introuvable dans data inclusion ${JSON.stringify(
        {
          nom: permanence.nom,
          adresse: permanence.adresse,
          commune: permanence.commune,
          code_postal: permanence.code_postal,
          structureNom: permanence.structureNom,
          structureId: permanence.structureId,
          pivot: permanence.pivot,
        },
      )}`
    }

    permanenceData.push({
      id: permanence.id,
      structureCartographieNationaleId,
      errors,
    })

    for (const conseiller of permanence.aidants) {
      conseillerNumeriqueData.set(conseiller.aidantId, {
        id: conseiller.aidantId,
      })
      conseillersEnPermanenceData.push({
        conseillerNumeriqueId: conseiller.aidantId,
        permanenceId: permanence.id,
      })
    }
  }

  return {
    permanenceData,
    conseillerNumeriqueData: [...conseillerNumeriqueData.values()],
    conseillersEnPermanenceData,
  }
}

export type BuildPermanencesConum = Awaited<
  ReturnType<typeof buildPermanencesConum>
>
