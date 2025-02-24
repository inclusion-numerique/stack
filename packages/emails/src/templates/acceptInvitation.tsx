import LayoutWithFooter from '@app/emails/components/LayoutWithFooter'
import { MjmlColumn, MjmlSection, MjmlText } from '@faire/mjml-react'
import { renderToMjml } from '@faire/mjml-react/utils/renderToMjml'
import React from 'react'
import { brandColor } from '../styles'

export const acceptInvitation = {
  text: ({ mediateur }: { mediateur: string }): string =>
    `${mediateur} a accepté votre invitation à rejoindre votre équipe.`,
  mjml: ({ mediateur }: { mediateur: string }): string =>
    renderToMjml(
      <LayoutWithFooter
        title={`${mediateur} a accepté votre invitation à rejoindre votre équipe`}
        preview={`${mediateur} a accepté votre invitation à rejoindre votre équipe`}
      >
        <MjmlSection padding={15}>
          <MjmlColumn>
            <MjmlText
              fontWeight="700"
              fontSize="28px"
              color={brandColor}
              lineHeight="36px"
            >
              {mediateur} a accepté votre invitation à rejoindre votre équipe.
            </MjmlText>
            <MjmlText>
              Accédez dès maintenant via la page <strong>Mon équipe</strong> à
              la fiche de {mediateur} où vous pourrez&nbsp;:
              <ul>
                <li>Voir ses informations de profil</li>
                <li>Visualiser ses statistiques d’activités</li>
              </ul>
              Ses statistiques d’activités sont également disponibles depuis
              votre page <strong>Statistiques</strong>.
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </LayoutWithFooter>,
    ),
}
