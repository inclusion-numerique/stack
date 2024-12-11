import {
  MjmlButton,
  MjmlColumn,
  MjmlSection,
  MjmlText,
} from '@faire/mjml-react'
import React from 'react'
import { emailAssetUrl } from '@app/emails/emailAssetUrl'
import { brandColor } from '@app/emails/styles'

const Explanations = () => (
  <>
    <MjmlSection padding="30px 15px 0px 15px">
      <MjmlColumn>
        <MjmlText
          fontWeight="700"
          fontSize="28px"
          lineHeight="36px"
          color={brandColor}
        >
          La Coop de la médiation numérique, c‘est quoi ?
        </MjmlText>
        <MjmlText
          fontSize="20px"
          lineHeight="32px"
          paddingTop="16px"
          fontWeight="700"
          color="#3A3A3A"
        >
          Vos outils du quotidien pour accompagner les personnes éloignées du
          numérique.
        </MjmlText>
        <MjmlText
          fontSize="16px"
          lineHeight="24px"
          paddingTop="16px"
          fontWeight="400"
          color="#3A3A3A"
        >
          La Coop de la médiation numérique est la plateforme dédiée aux
          médiateur·rice·s numériques (dont les conseillers numériques) pour les
          accompagner dans leur pratique quotidienne de la médiation numérique.{' '}
        </MjmlText>
      </MjmlColumn>
    </MjmlSection>
    <MjmlSection padding="10px 15px 0px 15px">
      <MjmlColumn>
        <MjmlButton
          width="100%"
          fontWeight="500"
          fontSize="18px"
          href={emailAssetUrl('/')}
          backgroundColor="white"
          border="solid 1px #000091"
          color={brandColor}
        >
          Découvrir La Coop de la médiation numérique
        </MjmlButton>
      </MjmlColumn>
    </MjmlSection>
  </>
)

export default Explanations
