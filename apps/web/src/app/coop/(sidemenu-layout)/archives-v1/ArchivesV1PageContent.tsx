import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import Button from '@codegouvfr/react-dsfr/Button'
import React from 'react'
import { ArchivesV1PageData } from '@app/web/app/coop/(sidemenu-layout)/archives-v1/getArchivesV1PageData'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import ContactSupportLink from '@app/web/components/ContactSupportLink'
import IconInSquare from '@app/web/components/IconInSquare'
import { numberToString } from '@app/web/utils/formatNumber'

const ArchivesV1PageContent = ({
  data: { v1Cras, conseillerNumeriqueId },
}: {
  data: ArchivesV1PageData
}) => {
  if (v1Cras.empty) {
    return (
      <div className="fr-border fr-border-radius--8 fr-p-10v fr-flex fr-direction-column fr-align-items-center fr-flex-gap-10v">
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
      </div>
    )
  }
  return (
    <div className="fr-border fr-border-radius--8 fr-p-10v">
      <IconInSquare iconId="ri-service-line" size="medium" />
      <h2 className="fr-h6 fr-text-title--blue-france fr-mt-6v fr-mb-1v">
        Vos compte-rendus d’activités enregistrés jusqu’au{' '}
        {dateAsDay(v1Cras.lastDate)}
      </h2>
      <p className="fr-text--xs fr-text-mention--grey fr-mb-6v">
        Retrouvez l’historique de l’ensemble de vos activités enregistrées sur
        la version précédente de l’espace Coop. Vous pouvez l’exporter au format
        tableur Excel (.xlsx).
      </p>
      <div className="fr-border--top fr-border--bottom fr-py-4v fr-flex fr-justify-content-space-between fr-flex-gap-4v fr-align-items-center">
        <div>
          <span className="fr-text--medium">
            CRA enregistrés du {dateAsDay(v1Cras.firstDate)} au{' '}
            {dateAsDay(v1Cras.lastDate)}&nbsp;·&nbsp;
          </span>
          <span className="fr-text-mention--grey">
            {numberToString(v1Cras.cras.length)} activité
            {sPluriel(v1Cras.cras.length)}
          </span>
        </div>
        <Button
          size="small"
          priority="tertiary no outline"
          linkProps={{
            href: `/coop/archives-v1/exporter/cras/${conseillerNumeriqueId}`,
            download: true,
          }}
        >
          Exporter en .xlsx
        </Button>
      </div>
    </div>
  )
}

export default ArchivesV1PageContent
