'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { UseCollectivitesHorsTerritoireReturn } from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/useCollectivitesHorsTerritoire'
import CollectiviteHorsTerritoire from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/CollectiviteHorsTerritoire'
import styles from './CollectivitesHorsTerritoire.module.css'

const CollectivitesHorsTerritoire = ({
  disabled,
  isLoading,
  excludedCodes,
  collectivitesHorsTerritoire: {
    ajouterCollectiviteHorsTerritoire,
    validerCollectiviteHorsTerritoire,
    collectivitesHorsTerritoire,
    supprimerCollectiviteHorsTerritoire,
    modifierCollectiviteHorsTerritoire,
  },
}: {
  disabled: boolean
  isLoading: boolean
  excludedCodes: string[]
  collectivitesHorsTerritoire: UseCollectivitesHorsTerritoireReturn
}) => (
  <>
    <h5 className="fr-mt-12v fr-mb-1v">
      Ajoutez des collectivités en dehors votre territoire
    </h5>
    <p className="fr-text--sm fr-mb-6v">
      Vous pouvez venir renseigner manuellement des collectivités
      (EPCI/CD/Commune) en dehors de votre département que vous souhaitez
      intégrer à votre feuille de route territoriale.
    </p>

    {collectivitesHorsTerritoire.map((addedCollectivity, index) => (
      <CollectiviteHorsTerritoire
        key={addedCollectivity.code ?? index.toString(10)}
        index={index}
        isLoading={isLoading}
        collectivite={addedCollectivity}
        modifierCollectiviteHorsTerritoire={modifierCollectiviteHorsTerritoire}
        supprimerCollectiviteHorsTerritoire={
          supprimerCollectiviteHorsTerritoire
        }
        validerCollectiviteHorsTerritoire={validerCollectiviteHorsTerritoire}
        disabled={disabled}
        excludedCodes={excludedCodes}
      />
    ))}

    <Button
      priority="tertiary"
      iconId="fr-icon-add-line"
      className={styles.addButton}
      size="large"
      type="button"
      onClick={ajouterCollectiviteHorsTerritoire}
    >
      Ajouter une collectivité
    </Button>
  </>
)

export default withTrpc(CollectivitesHorsTerritoire)
