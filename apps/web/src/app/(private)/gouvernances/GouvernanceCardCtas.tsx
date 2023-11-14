import React from 'react'
import Badge from '@codegouvfr/react-dsfr/Badge'
import Button from '@codegouvfr/react-dsfr/Button'
import { ListeGouvernanceItem } from '@app/web/app/(private)/gouvernances/getListeGouvernances'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import {
  modifierBesoinsIngenieriePath,
  modifierGouvernancePath,
} from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import CreateGouvernanceButton from '@app/web/app/(private)/gouvernances/CreateGouvernanceButton'
import { limiteModificationDesGouvernances } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceMetadata'
import { nameOrEmail } from '@app/web/utils/nameOrEmail'
import styles from './GouvernanceList.module.css'

const GouvernanceCardCtas = ({
  gouvernance,
  canEdit,
  canCreateInDepartementCode,
}: {
  gouvernance?: ListeGouvernanceItem
  canEdit?: boolean
  canCreateInDepartementCode?: string
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const v1CreationMeta = gouvernance
    ? `${dateAsDay(gouvernance.creation)} par ${nameOrEmail(
        gouvernance.createur,
      )}`
    : null
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const v2CreationMeta = gouvernance?.v2Enregistree
    ? `${dateAsDay(gouvernance.v2Enregistree)} par ${nameOrEmail(
        gouvernance.createur,
      )}`
    : null

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const besoinsCreationMeta = gouvernance?.besoinsEnIngenierieFinanciere
    ? `${dateAsDay(
        gouvernance.besoinsEnIngenierieFinanciere.creation,
      )} par ${nameOrEmail(gouvernance.createur)}`
    : null
  const modificationMeta = gouvernance
    ? `${dateAsDay(gouvernance.modification)} par ${nameOrEmail(
        gouvernance.derniereModificationPar,
      )}`
    : null

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const besoinsModificationMeta = gouvernance?.besoinsEnIngenierieFinanciere
    ? `${dateAsDay(
        gouvernance.besoinsEnIngenierieFinanciere.modification,
      )} par ${nameOrEmail(gouvernance.derniereModificationPar)}`
    : null

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const displayModificationMeta = modificationMeta !== v1CreationMeta

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const showEditButton = canEdit && !!gouvernance?.v2Enregistree
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const showCompleteCta = canEdit && !!gouvernance && !gouvernance.v2Enregistree

  return (
    <>
      <div className={styles.cardCtaContainer}>
        <div>
          <h4 className="fr-mb-2v">Gouvernance & feuilles de route</h4>
          <p className="fr-mb-0">
            Finalisez votre gouvernance et organisez les feuilles de routes
            pressenties sur votre territoire.
          </p>
        </div>
        <Badge
          className="fr-my-4v fr-ml-md-6w fr-mr-md-3w"
          small
          severity="new"
        >
          À&nbsp;renseigner&nbsp;avant&nbsp;le&nbsp;
          {dateAsDay(limiteModificationDesGouvernances)}
        </Badge>
        {gouvernance ? (
          <Button
            linkProps={{
              href: modifierGouvernancePath(
                { codeDepartement: gouvernance.departement.code },
                gouvernance.id,
              ),
            }}
            iconId="fr-icon-arrow-right-line"
            iconPosition="right"
          >
            Compléter
          </Button>
        ) : canCreateInDepartementCode ? (
          <CreateGouvernanceButton
            codeDepartement={canCreateInDepartementCode}
            nextAction="editGouvernance"
          />
        ) : null}
      </div>
      <hr className="fr-separator-8v" />
      <div className={styles.cardCtaContainer}>
        <div>
          <h4 className="fr-mb-2v">Besoins en ingénierie financière</h4>
          <p className="fr-mb-0">
            Dans le cadre du développement de votre stratégie d’inclusion
            numérique, de la structuration de votre gouvernance et de la mise en
            en œuvre de vos feuilles de route territoriales, nous souhaitons
            connaître vos besoins de financement.
          </p>
        </div>
        <Badge
          className="fr-my-4v fr-ml-md-6w fr-mr-md-3w"
          small
          severity="new"
        >
          À&nbsp;renseigner&nbsp;avant&nbsp;le&nbsp;
          {dateAsDay(limiteModificationDesGouvernances)}
        </Badge>
        {gouvernance ? (
          <Button
            linkProps={{
              href: modifierBesoinsIngenieriePath(
                { codeDepartement: gouvernance.departement.code },
                {
                  gouvernanceId: gouvernance.id,
                  step: gouvernance.besoinsEnIngenierieFinanciere
                    ? 'selection'
                    : 'intro',
                },
              ),
            }}
            iconId="fr-icon-arrow-right-line"
            iconPosition="right"
          >
            Compléter
          </Button>
        ) : canCreateInDepartementCode ? (
          <CreateGouvernanceButton
            codeDepartement={canCreateInDepartementCode}
            nextAction="editBesoinsIngenierie"
          />
        ) : null}
      </div>
    </>
  )
}

export default GouvernanceCardCtas
