import React from 'react'
import {
  MjmlButton,
  MjmlColumn, MjmlDivider,
  MjmlSection,
  MjmlSpacer,
} from '@faire/mjml-react'
import { renderToMjml } from '@faire/mjml-react/utils/renderToMjml'
import { emailAssetUrl } from '@app/emails/emailAssetUrl'
import LayoutWithFooter from '@app/emails/components/LayoutWithFooter'
import Explanations from '@app/emails/components/Explanations'
import { backgroundColor, brandColor } from '@app/emails/styles'
import Invitation from '../components/Invitation'

export const inviteMediateur = {
  text: ({ url, from }: { url: string; from: string }): string =>
    `Pour accepter l'invitation à rejoindre l’équipe de coordination de ${from}, merci d'utiliser le lien suivant :\n${url}\n\n`,
  mjml: ({ url, from }: { url: string; from: string }): string =>
    renderToMjml(
      <LayoutWithFooter
        title="Invitation à rejoindre une équipe sur La Coop de la médiation numérique"
        preview={`Vous êtes invité par ${from} à rejoindre son équipe de coordination.`}
      >
        <MjmlSection padding={15}>
          <MjmlColumn>
            <Invitation from={from} />
            <MjmlDivider
              paddingBottom="24px"
              border-width="1px"
              border-style="solid"
              border-color="#DDD"
            />
            <MjmlButton
              width="100%"
              fontWeight="500"
              fontSize="18px"
              href={emailAssetUrl(url)}
            >
              Accepter l’invitation
            </MjmlButton>
            <MjmlButton
              width="100%"
              fontWeight="500"
              fontSize="18px"
              href={emailAssetUrl('/')}
              backgroundColor="white"
              border="solid 1px #000091"
              color={brandColor}
            >
              Refuser l’invitation
            </MjmlButton>
            <MjmlSpacer height="32px" />
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection backgroundColor={backgroundColor} />
        <Explanations />
      </LayoutWithFooter>,
    ),
}
