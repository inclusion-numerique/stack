import type { ConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/ConseillerNumeriqueV1Data'

export type ConseillerNumeriqueV1DataWithActiveMiseEnRelation =
  ConseillerNumeriqueV1Data & {
    miseEnRelationActive: Exclude<
      ConseillerNumeriqueV1Data['miseEnRelationActive'],
      null
    >
  }

export function isConseillerNumeriqueV1DataWithActiveMiseEnRelation(
  conseillerNumeriqueV1Data: ConseillerNumeriqueV1Data | null,
): conseillerNumeriqueV1Data is ConseillerNumeriqueV1DataWithActiveMiseEnRelation {
  return !!conseillerNumeriqueV1Data?.miseEnRelationActive
}
