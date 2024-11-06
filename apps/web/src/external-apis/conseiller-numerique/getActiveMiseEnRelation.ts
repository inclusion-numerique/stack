import { StatutMiseEnRelationV1 } from '@app/web/external-apis/conseiller-numerique/MiseEnRelationConseillerNumeriqueV1'

/**
 * Un conseiller numérique ou un coordinateur est en "contrat actif" si il a une mise en realtion avec un statut
 * 'finalisee' (qui veut dire qu'il est en contrat actif)
 * 'nouvelle_rupture' (qui est en cours d'etre en rupture mais toujours actif)
 * @param miseEnRelations
 */
export const getActiveMiseEnRelation = <
  T extends {
    statut: StatutMiseEnRelationV1
  },
>(
  miseEnRelations: T[],
): T | null =>
  miseEnRelations.find(
    (miseEnRelation) =>
      miseEnRelation.statut === 'finalisee' ||
      miseEnRelation.statut === 'nouvelle_rupture',
  ) ?? null
