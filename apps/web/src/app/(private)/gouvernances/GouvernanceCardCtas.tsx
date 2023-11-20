import React from 'react'
import Badge from '@codegouvfr/react-dsfr/Badge'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
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
  firstCtaClassName,
  gouvernance,
  canEdit,
  canCreateInDepartementCode,
}: {
  firstCtaClassName?: string
  gouvernance?: ListeGouvernanceItem
  canEdit?: boolean
  canCreateInDepartementCode?: string
}) => {
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
  const displayModificationMeta = modificationMeta !== v2CreationMeta
  const displayBesoinsModificationMeta =
    besoinsModificationMeta !== besoinsCreationMeta

  const isExistingGouvernance = !!gouvernance
  const isV2 = !!gouvernance?.v2Enregistree
  const hasCompletedBesoins =
    !!gouvernance?.besoinsEnIngenierieFinanciere?.selectionEnregistree

  return (
    <>
      <div className={classNames(styles.cardCtaContainer, firstCtaClassName)}>
        <div className="fr-flex-grow-1">
          <h4 className="fr-mb-0">Gouvernance & feuilles de route</h4>
          {isV2 ? (
            <p className="fr-mb-0 fr-text--sm fr-text-mention--grey">
              Complétée le {v2CreationMeta}
              {displayModificationMeta && ` · Modifiée le ${modificationMeta}`}
            </p>
          ) : canEdit ? (
            <p className="fr-mb-0">
              Finalisez votre gouvernance et organisez les feuilles de routes
              pressenties sur votre territoire.
            </p>
          ) : null}
        </div>
        {isV2 ? (
          <Badge
            className="fr-my-4v fr-ml-md-6w fr-mr-md-3w"
            small
            severity="success"
          >
            Complétée
          </Badge>
        ) : (
          <Badge
            className="fr-my-4v fr-ml-md-6w fr-mr-md-3w"
            small
            severity="new"
          >
            À&nbsp;renseigner&nbsp;avant&nbsp;le&nbsp;
            {dateAsDay(limiteModificationDesGouvernances)}
          </Badge>
        )}
        {canEdit &&
          (isExistingGouvernance ? (
            isV2 ? (
              <Button
                priority="secondary"
                linkProps={{
                  href: modifierGouvernancePath(
                    { codeDepartement: gouvernance.departement.code },
                    gouvernance.id,
                  ),
                }}
                iconId="fr-icon-edit-line"
                iconPosition="right"
              >
                Modifier
              </Button>
            ) : (
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
            )
          ) : canCreateInDepartementCode ? (
            <CreateGouvernanceButton
              codeDepartement={canCreateInDepartementCode}
              nextAction="editGouvernance"
            />
          ) : null)}
      </div>
      <hr className="fr-separator-8v" />
      <div className={styles.cardCtaContainer}>
        <div className="fr-flex-grow-1">
          <h4 className="fr-mb-0">Besoins en ingénierie financière</h4>
          {hasCompletedBesoins ? (
            <p className="fr-mb-0 fr-text--sm fr-text-mention--grey">
              Complétés le {besoinsCreationMeta}
              {displayBesoinsModificationMeta &&
                ` · Modifiés le ${besoinsModificationMeta}`}
            </p>
          ) : canEdit ? (
            <p className="fr-mb-0 fr-mt-2v">
              Dans le cadre du développement de votre stratégie d’inclusion
              numérique, de la structuration de votre gouvernance et de la mise
              en en œuvre de vos feuilles de route territoriales, nous
              souhaitons connaître vos besoins de financement.
            </p>
          ) : null}
        </div>
        {hasCompletedBesoins ? (
          <Badge
            className="fr-my-4v fr-ml-md-6w fr-mr-md-3w"
            small
            severity="success"
          >
            Complétés
          </Badge>
        ) : (
          <Badge
            className="fr-my-4v fr-ml-md-6w fr-mr-md-3w"
            small
            severity="new"
          >
            À&nbsp;renseigner&nbsp;avant&nbsp;le&nbsp;
            {dateAsDay(limiteModificationDesGouvernances)}
          </Badge>
        )}
        {canEdit &&
          (gouvernance ? (
            hasCompletedBesoins ? (
              <Button
                priority="secondary"
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
                iconId="fr-icon-edit-line"
                iconPosition="right"
              >
                Modifier
              </Button>
            ) : (
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
            )
          ) : canCreateInDepartementCode ? (
            <CreateGouvernanceButton
              codeDepartement={canCreateInDepartementCode}
              nextAction="editBesoinsIngenierie"
            />
          ) : null)}
      </div>
    </>
  )
}

export default GouvernanceCardCtas
