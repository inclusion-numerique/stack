import Button from '@codegouvfr/react-dsfr/Button'
import { useForm } from 'react-hook-form'
import CustomSelectFormField from '@app/ui/components/Form/CustomSelectFormField'
import type {
  CollectiviteHorsTerritoire as CollectiviteHorsTerritoireType,
  UseCollectivitesHorsTerritoireReturn,
} from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/useCollectivitesHorsTerritoire'
import WhiteCard from '@app/web/ui/WhiteCard'
import { trpc } from '@app/web/trpc'
import { identityFunction } from '@app/web/utils/identityFunction'

type CollectiviteHorsTerritoireProps = {
  collectivite: CollectiviteHorsTerritoireType
  index: number
  disabled: boolean
  excludedCodes: string[]
  isLoading: boolean
} & Pick<
  UseCollectivitesHorsTerritoireReturn,
  | 'validerCollectiviteHorsTerritoire'
  | 'supprimerCollectiviteHorsTerritoire'
  | 'modifierCollectiviteHorsTerritoire'
>

const AddedCollectiviteHorsTerritoire = ({
  collectivite,
  index,
  modifierCollectiviteHorsTerritoire,
}: CollectiviteHorsTerritoireProps) => (
  <WhiteCard className="fr-flex fr-align-items-center fr-justify-content-space-between fr-mb-6v">
    <h5 className="fr-text-title--blue-france fr-my-0">{collectivite.nom}</h5>
    <Button
      type="button"
      priority="tertiary"
      iconId="fr-icon-edit-line"
      title="Modifier la collectivité"
      onClick={() => modifierCollectiviteHorsTerritoire(index)}
    />
  </WhiteCard>
)
const PendingCollectiviteHorsTerritoire = ({
  index,
  collectivite,
  excludedCodes,
  supprimerCollectiviteHorsTerritoire,
  validerCollectiviteHorsTerritoire,
}: CollectiviteHorsTerritoireProps) => {
  const {
    control,
    handleSubmit,
    formState: { isLoading },
  } = useForm<{
    collectivite: {
      label: string
      value: string
      type: 'commune' | 'epci' | 'departement'
    }
  }>({
    defaultValues: {
      collectivite: {
        label: collectivite.nom ?? undefined,
        value: collectivite.code ?? undefined,
        type: collectivite.type ?? undefined,
      },
    },
  })

  const onSubmit = ({
    collectivite: { label, value, type },
  }: {
    collectivite: {
      label: string
      value: string
      type: 'commune' | 'epci' | 'departement'
    }
  }) => {
    validerCollectiviteHorsTerritoire(index, {
      type,
      code: value,
      nom: label,
    })
  }
  const { client: trpcClient } = trpc.useContext()

  const loadOptions = async (search: string) => {
    const result = await trpcClient.data.collectivitySearch.query({
      epci: true,
      commune: true,
      query: search,
      exclude: excludedCodes,
    })

    return [
      {
        label: 'EPCIs',
        options: result
          .filter(({ type }) => type === 'epci')
          .map(({ code, nom }) => ({
            label: nom,
            value: code,
            type: 'epci',
          })),
      },
      {
        label: 'Communes',
        options: result
          .filter(({ type }) => type === 'commune')
          .map(({ code, nom }) => ({
            label: nom,
            value: code,
            type: 'commune',
          })),
      },
    ]
  }

  const disabled = isLoading

  return (
    <WhiteCard className="fr-mb-6v">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Ajouter une collectivité</h2>
        <CustomSelectFormField
          label="Rechercher la collectivité"
          path="collectivite"
          control={control}
          disabled={disabled}
          loadOptions={loadOptions}
          transformOptionToValue={identityFunction}
          defaultValue={
            collectivite.code && collectivite.nom && collectivite.type
              ? {
                  value: collectivite.code,
                  label: collectivite.nom,
                  type: collectivite.type,
                }
              : undefined
          }
          cacheOptions
        />
        <div>
          <Button
            type="button"
            priority="secondary"
            iconId="fr-icon-delete-bin-line"
            disabled={disabled}
            className="fr-mr-1w"
            onClick={() =>
              supprimerCollectiviteHorsTerritoire(
                index,
                collectivite.code && collectivite.type
                  ? { code: collectivite.code, type: collectivite.type }
                  : undefined,
              )
            }
          >
            Supprimer
          </Button>
          <Button
            className={isLoading ? 'fr-btn--loading' : undefined}
            type="submit"
            priority="primary"
            iconId="fr-icon-check-line"
          >
            Enregistrer
          </Button>
        </div>
      </form>
    </WhiteCard>
  )
}

const CollectiviteHorsTerritoire = (props: CollectiviteHorsTerritoireProps) => {
  const {
    collectivite: { state },
  } = props

  if (state === 'added') {
    return <AddedCollectiviteHorsTerritoire {...props} />
  }

  return <PendingCollectiviteHorsTerritoire {...props} />
}

export default CollectiviteHorsTerritoire
