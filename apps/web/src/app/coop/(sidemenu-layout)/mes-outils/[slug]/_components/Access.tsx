import Button from '@codegouvfr/react-dsfr/Button'
import React from 'react'
import { OutilPageData } from '../../outilPageData'
import { AccessInfoLink } from './AccessInfoLink'
import { AccessInfoShare } from './AccessInfoShare'

export const Access = ({
  illustration,
  icon,
  how,
  info,
  title,
  description,
  callToAction,
  callToActionComponent,
}: NonNullable<OutilPageData['access']>) => (
  <>
    <h2 className="fr-text--sm fr-text-mention--grey fr-text--uppercase">
      Comment accéder à l’outil&nbsp;?
    </h2>
    {info ? (
      info.share ? (
        <AccessInfoShare info={info} how={how} />
      ) : (
        <AccessInfoLink
          info={info}
          how={how}
          illustration={illustration}
          icon={icon}
        />
      )
    ) : null}
    {(title || description) && (
      <div className="fr-text--center">
        <hr className="fr-mb-0" />
        {title && <p className="fr-mb-1w fr-text--bold fr-text--lg">{title}</p>}
        {description && <p>{description}</p>}
      </div>
    )}
    {callToActionComponent ||
      (callToAction ? (
        <Button
          iconId={
            callToAction.label === 'Se connecter'
              ? 'fr-icon-account-circle-line'
              : undefined
          }
          className="fr-btn--responsive"
          size="large"
          title={`${callToAction.label} - nouvel onglet`}
          linkProps={{ href: callToAction.link }}
        >
          {callToAction.label}
        </Button>
      ) : null)}
  </>
)
