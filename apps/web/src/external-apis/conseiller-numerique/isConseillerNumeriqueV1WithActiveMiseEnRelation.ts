import type { ConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/ConseillerNumeriqueV1Data'

export type ConseillerNumeriqueV1DataWithActiveMiseEnRelation =
  ConseillerNumeriqueV1Data & {
    miseEnRelationActive: Exclude<
      ConseillerNumeriqueV1Data['miseEnRelationActive'],
      null
    >
  }

export function isConseillerNumeriqueV1DataWithActiveMiseEnRelation<
  T extends Pick<ConseillerNumeriqueV1Data, 'miseEnRelationActive'>,
>(
  conseillerNumeriqueV1Data: T | null,
): conseillerNumeriqueV1Data is T & {
  miseEnRelationActive: Exclude<
    ConseillerNumeriqueV1Data['miseEnRelationActive'],
    null
  >
} {
  return !!conseillerNumeriqueV1Data?.miseEnRelationActive
}
