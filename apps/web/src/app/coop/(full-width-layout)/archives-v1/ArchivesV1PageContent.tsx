import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import Button from '@codegouvfr/react-dsfr/Button'
import React from 'react'
import type { ArchivesV1PageDataWithCras } from '@app/web/app/coop/(full-width-layout)/archives-v1/getArchivesV1PageData'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import ContactSupportLink from '@app/web/components/ContactSupportLink'
import IconInSquare from '@app/web/components/IconInSquare'
import { numberToString } from '@app/web/utils/formatNumber'
import { dateAsMonthFull } from '@app/web/utils/dateAsMonth'
import ArchivesV1Card from '@app/web/app/coop/(full-width-layout)/archives-v1/ArchivesV1Card'

const ArchivesV1PageContent = ({
  data,
  hideEmptyDisclamer,
  conseillerNumeriqueV1Id,
}: {
  data: ArchivesV1PageDataWithCras
  hideEmptyDisclamer?: boolean
  conseillerNumeriqueV1Id: string
}) => {
  if (data.empty) {
    return hideEmptyDisclamer ? null : (
      <ArchivesV1Card>
        <h2 className="fr-h6 fr-mb-0">
          Vos archives de compte-rendus d’activités
        </h2>
        <p className="fr-mb-0">
          Aucune archive de compte-rendus d’activités n’a été trouvée.
          <br />
          Si vous pensez que c’est une erreur,{' '}
          <ContactSupportLink>veuillez contacter le support</ContactSupportLink>
          .
        </p>
      </ArchivesV1Card>
    )
  }

  const { firstDate, lastDate, v1Cras } = data

  return (
    <>
      <div className="fr-border fr-border-radius--8 fr-p-10v">
        <IconInSquare iconId="ri-service-line" size="medium" />
        <h2 className="fr-h6 fr-text-title--blue-france fr-mt-6v fr-mb-1v">
          Vos compte-rendus d’activités enregistrés jusqu’au{' '}
          {dateAsDay(lastDate)}
        </h2>
        <p className="fr-text--xs fr-text-mention--grey fr-mb-6v">
          Retrouvez l’historique de l’ensemble de vos activités enregistrées sur
          la version précédente de l’espace Coop. Vous pouvez l’exporter au
          format tableur Excel (.xlsx).
        </p>
        <div className="fr-border--top fr-border--bottom fr-py-4v fr-flex fr-justify-content-space-between fr-flex-gap-4v fr-align-items-center">
          <div>
            <span className="fr-text--medium">CRA enregistrés</span>
            <span className="fr-text-mention--grey">
              &nbsp;&nbsp;·&nbsp; du {dateAsDay(firstDate)} au{' '}
              {dateAsDay(lastDate)}
              &nbsp;&nbsp;·&nbsp;&nbsp;
              {numberToString(v1Cras.length)} activité
              {sPluriel(v1Cras.length)}
            </span>
          </div>
          <Button
            size="small"
            priority="tertiary no outline"
            linkProps={{
              href: `/coop/archives-v1/exporter/cras?conseiller=${conseillerNumeriqueV1Id}`,
              download: true,
            }}
          >
            Exporter
          </Button>
        </div>
      </div>
      <div className="fr-border fr-border-radius--8 fr-p-10v fr-mt-6v">
        <IconInSquare iconId="ri-service-line" size="medium" />
        <h2 className="fr-h6 fr-text-title--blue-france fr-mt-6v fr-mb-1v">
          Vos statistiques mensuelles jusqu’au {dateAsDay(lastDate)}
        </h2>
        <p className="fr-text--xs fr-text-mention--grey fr-mb-6v">
          Retrouvez l’historique de vos statistiques mensuelles de la version
          précédente de l’espace Coop sur un même fichier tableur. Vous pouvez
          l’exporter au format tableur Excel (.xlsx).
        </p>
        <div className="fr-border--top fr-border--bottom fr-py-4v fr-flex fr-justify-content-space-between fr-flex-gap-4v fr-align-items-center">
          <div>
            <span className="fr-text--medium">Statistiques d’activités</span>
            <span className="fr-text-mention--grey">
              &nbsp;&nbsp;·&nbsp; de {dateAsMonthFull(firstDate)} à{' '}
              {dateAsMonthFull(lastDate)}
            </span>
          </div>
          <Button
            size="small"
            priority="tertiary no outline"
            linkProps={{
              href: `/coop/archives-v1/exporter/statistiques?conseiller=${conseillerNumeriqueV1Id}`,
              download: true,
            }}
          >
            Exporter
          </Button>
        </div>
      </div>
    </>
  )
}

export default ArchivesV1PageContent
