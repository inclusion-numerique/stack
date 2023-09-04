'use client'

import { useRouter } from 'next/navigation'
import Alert from '@codegouvfr/react-dsfr/Alert'
import classNames from 'classnames'
import { useState } from 'react'
import * as Sentry from '@sentry/nextjs'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import linkCardStyles from '@app/web/ui/LinkCard.module.css'
import { Spinner } from '@app/web/ui/Spinner'

const ChoixIntention = ({
  formulaireGouvernance,
}: {
  formulaireGouvernance: {
    id: string
  }
}) => {
  const router = useRouter()

  const [chosen, setChosen] = useState<'Participer' | 'Porter'>()

  const mutation = trpc.formulaireGouvernance.porterOuParticiper.useMutation()
  const onChoose = (intention: 'Participer' | 'Porter') => {
    setChosen(intention)
    mutation
      .mutateAsync({
        intention,
        formulaireGouvernanceId: formulaireGouvernance.id,
      })
      .then(({ etapeInfo }) => {
        router.push(etapeInfo.absolutePath)
        return null
      })
      .catch((error) => {
        console.error(error)
        Sentry.captureException(error)
      })
  }

  const disabled = mutation.isLoading || mutation.isSuccess

  return (
    <>
      {mutation.isError && (
        <Alert
          className="fr-my-6v"
          severity="error"
          small
          title="Votre choix n'a pas été enregistré"
          description={
            mutation.error?.message ||
            'Une erreur est survenue, veuillez réessayer ultérieurement.'
          }
        />
      )}
      <button
        className={classNames(linkCardStyles.card, 'fr-mt-6v')}
        type="button"
        onClick={() => onChoose('Porter')}
        disabled={disabled}
      >
        <div className={linkCardStyles.content}>
          <h3>Porter une feuille de route territoriale</h3>
          <p>
            Renseignez le périmètre de votre feuille de route (EPCI & communes
            participantes) ainsi que les éventuelles structures également
            impliquées.
          </p>
        </div>
        <div className={linkCardStyles.iconContainer}>
          {chosen === 'Porter' && disabled ? (
            <Spinner size="small" />
          ) : (
            <span className="fr-icon-arrow-right-line" />
          )}
        </div>
      </button>
      <button
        className={classNames(linkCardStyles.card, 'fr-mt-6v fr-mb-30v')}
        type="button"
        onClick={() => onChoose('Participer')}
        disabled={disabled}
      >
        <div className={linkCardStyles.content}>
          <h3>
            Participer à l’élaboration des feuilles de routes territoriales
          </h3>
          <p>
            En tant que participant, renseignez un/des contacts afin d’être
            sollicités à l’occasion des concertations territoriales.
          </p>
        </div>
        <div className={linkCardStyles.iconContainer}>
          {chosen === 'Participer' && disabled ? (
            <Spinner size="small" />
          ) : (
            <span className="fr-icon-arrow-right-line" />
          )}
        </div>
      </button>
    </>
  )
}

export default withTrpc(ChoixIntention)
