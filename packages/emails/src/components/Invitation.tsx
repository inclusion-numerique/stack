import { brandColor } from '@app/emails/styles'
import { MjmlSpacer, MjmlText } from '@faire/mjml-react'
import React from 'react'

const Invitation = ({ from }: { from: string }) => (
  <>
    <MjmlText
      fontWeight="700"
      fontSize="28px"
      color={brandColor}
      lineHeight="36px"
    >
      Invitation à rejoindre une équipe sur La Coop de la médiation numérique
    </MjmlText>
    <MjmlText
      fontWeight="700"
      fontSize="20px"
      color="#3A3A3A"
      lineHeight="32px"
    >
      Bonjour,
      <br />
      Vous êtes invité par {from} à rejoindre son équipe de coordination.
    </MjmlText>
    <MjmlSpacer height="16px" />
    <MjmlText fontWeight="400" fontSize="16px" color="#3A3A3A">
      En rejoignant cette équipe, {from} pourra :
      <ul>
        <li>
          Voir vos informations de profil (Nom prénom, contacts mail et
          téléphone, profession)
        </li>
        <li>Visualiser vos statistiques d’activités</li>
      </ul>
      En rejoignant cette équipe, vous pourrez :
      <ul>
        <li>
          Voir les autres membres de votre équipe et leurs informations de
          profils (Nom prénom, contacts mail et téléphone, profession)
        </li>
      </ul>
    </MjmlText>
  </>
)

export default Invitation
