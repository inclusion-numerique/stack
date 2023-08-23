import Button from '@codegouvfr/react-dsfr/Button'
import { useForm } from 'react-hook-form'
import CustomSelectFormField from '@app/ui/components/Form/CustomSelectFormField'
import {
  AddedCollectivity,
  UseAddCollectivityReturn,
} from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/useAddCollectivity'
import WhiteCard from '@app/web/ui/WhiteCard'
import { trpc } from '@app/web/trpc'

type CollectiviteHorsTerritoireProps = {
  addedCollectivity: AddedCollectivity
  index: number
  disabled: boolean
  excludedCodes: string[]
} & Pick<
  UseAddCollectivityReturn,
  'saveCollectivity' | 'removeCollectivity' | 'editCollectivity'
>

const AddedCollectiviteHorsTerritoire = ({
  addedCollectivity,
  editCollectivity,
  index,
}: CollectiviteHorsTerritoireProps) => (
  <WhiteCard>
    <h2>{addedCollectivity.nom}</h2>
    <Button
      type="button"
      iconId="fr-icon-edit-fill"
      title="Modifier la collectivité"
      onClick={() => editCollectivity(index)}
    />
  </WhiteCard>
)
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const transformCollectiviteOption = ((option: {
  label: string
  value: string
  type: 'commune' | 'epci'
}) => option) as any
const PendingCollectiviteHorsTerritoire = ({
  removeCollectivity,
  index,
  addedCollectivity,
  excludedCodes,
  saveCollectivity,
}: CollectiviteHorsTerritoireProps) => {
  const {
    control,
    handleSubmit,
    formState: { isLoading },
  } = useForm<{
    code: {
      label: string
      value: string
      type: 'commune' | 'epci' | 'departement'
    }
  }>({
    defaultValues: {
      code: {
        label: addedCollectivity.nom ?? undefined,
        value: addedCollectivity.code ?? undefined,
        type: addedCollectivity.type ?? undefined,
      },
    },
  })

  const onSubmit = ({
    code,
  }: {
    code: {
      label: string
      value: string
      type: 'commune' | 'epci' | 'departement'
    }
  }) => {
    // TODO onchange should be object with type etc...
    console.log('ON SUBMIT', { code })
    console.log('Final value', {
      type: code.type,
      code: code.value,
      nom: code.label,
    })

    saveCollectivity(index, {
      type: code.type,
      code: code.value,
      nom: code.label,
    })
  }
  const { client: trpcClient } = trpc.useContext()

  const loadOptions = async (search: string) => {
    console.log('LOAD OPTIONS', search)
    const result = await trpcClient.data.collectivitySearch.query({
      epci: true,
      commune: true,
      query: search,
      exclude: excludedCodes,
    })
    console.log('RESULT', result)

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
    <WhiteCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Ajouter une collectivité</h2>
        <CustomSelectFormField
          label="Rechercher la collectivité"
          path="code"
          control={control}
          disabled={disabled}
          loadOptions={loadOptions}
          transformOptionToValue={transformCollectiviteOption}
          defaultValue={
            addedCollectivity.code && addedCollectivity.nom
              ? {
                  value: addedCollectivity.code,
                  label: addedCollectivity.nom,
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
            onClick={() => removeCollectivity(index)}
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
  if (props.addedCollectivity.state === 'added') {
    return <AddedCollectiviteHorsTerritoire {...props} />
  }

  return <PendingCollectiviteHorsTerritoire {...props} />
}

export default CollectiviteHorsTerritoire
