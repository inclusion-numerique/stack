import React from 'react'
import { MjmlColumn, MjmlSection, MjmlText } from '@faire/mjml-react'
import { renderToMjml } from '@faire/mjml-react/utils/renderToMjml'
import LayoutWithFooter from '@app/emails/components/LayoutWithFooter'
import { brandColor } from '../styles'

export const declineInvitation = {
  text: ({ mediateur }: { mediateur: string }): string =>
    `${mediateur} a refusé l‘invitation à rejoindre votre équipe.`,
  mjml: ({ mediateur }: { mediateur: string }): string =>
    renderToMjml(
      <LayoutWithFooter
        title={`${mediateur} a refusé l‘invitation à rejoindre votre équipe`}
        preview={`${mediateur} a refusé l‘invitation à rejoindre votre équipe`}
      >
        <MjmlSection padding={15}>
          <MjmlColumn>
            <MjmlText
              fontWeight="700"
              fontSize="28px"
              color={brandColor}
              lineHeight="36px"
            >
              {mediateur} a refusé l‘invitation à rejoindre votre équipe.
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </LayoutWithFooter>,
    ),
}
