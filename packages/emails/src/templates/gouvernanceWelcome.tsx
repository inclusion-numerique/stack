/* eslint react/no-array-index-key: 0 */

import {
  MjmlAll,
  MjmlAttributes,
  MjmlDivider,
  MjmlFont,
  MjmlSpacer,
} from 'mjml-react'
import React from 'react'
import {
  Mjml,
  MjmlBody,
  MjmlButton,
  MjmlColumn,
  MjmlHead,
  MjmlImage,
  MjmlPreview,
  MjmlSection,
  MjmlText,
  MjmlTitle,
  renderToMjml,
} from '@luma-team/mjml-react'
import { PublicWebAppConfig } from '@app/web/webAppConfig'
import type { GouvernancePersona } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import { emailAssetUrl } from '@app/emails/emailAssetUrl'

const brandColor = '#000091'
const backgroundColor = '#F6F6F6'
const textTitleGrey = '#161616'
const textDefaultGrey = '#3A3A3A'
const backgroundAltBlueFrance = '#F5F5FE'
const borderDefaultGrey = '#DDDDDD'

const GouvernancePersonaBloc = ({
  bloc: { title, items },
}: {
  bloc: GouvernancePersona['blocs'][number]
}) => (
  <>
    <MjmlDivider />
    <MjmlText fontWeight={600} fontSize="20px" color={textTitleGrey}>
      {title}
    </MjmlText>

    {items.map((item, itemIndex) => (
      <>
        <MjmlSpacer key={`spacer_${itemIndex}`} height={16} />
        <MjmlText key={`test_${itemIndex}`}>{item}</MjmlText>
      </>
    ))}
  </>
)

export const gouvernanceWelcome = {
  text: (): string =>
    // eslint-disable-next-line no-irregular-whitespace
    `Inscription confirmée ! Vous serez informé par mail lorsque les formulaires seront prêts à être complétés.`,
  mjml: ({
    gouvernancePersona,
  }: {
    gouvernancePersona: GouvernancePersona
  }): string =>
    renderToMjml(
      <Mjml>
        <MjmlHead>
          <MjmlFont name="Marianne" href={emailAssetUrl('/email/fonts.css')} />
          <MjmlAttributes>
            <MjmlAll fontFamily="Marianne, Helvetica, Arial, sans-serif" />
            <MjmlSection
              backgroundColor="white"
              paddingTop={0}
              paddingBottom={0}
              paddingLeft={0}
              paddingRight={0}
            />
            <MjmlColumn
              paddingTop={0}
              paddingBottom={0}
              paddingLeft={40}
              paddingRight={40}
            />
            <MjmlButton
              backgroundColor={brandColor}
              borderRadius={0}
              fontSize="16px"
              lineHeight="24px"
              fontWeight={400}
              innerPadding="8px 16px"
            />
            <MjmlText
              fontSize="16px"
              lineHeight="24px"
              fontWeight={400}
              paddingTop={0}
              paddingBottom={0}
              paddingLeft={0}
              paddingRight={0}
              color={textDefaultGrey}
            />
            <MjmlDivider
              borderWidth={1}
              borderColor={borderDefaultGrey}
              paddingTop={32}
              paddingBottom={32}
              paddingRight={0}
              paddingLeft={0}
            />
          </MjmlAttributes>
          <MjmlTitle>{`Connexion à ${PublicWebAppConfig.projectTitle}`}</MjmlTitle>
          <MjmlPreview>Inscription confirmée !</MjmlPreview>
        </MjmlHead>
        <MjmlBody backgroundColor={backgroundColor}>
          {/* Section used for a bit of headroom at the top */}
          <MjmlSection backgroundColor={backgroundColor} paddingTop={40} />
          {/* Header with logos */}
          <MjmlSection paddingTop={12} paddingBottom={12}>
            <MjmlColumn width="20%" verticalAlign="middle" paddingRight={0}>
              <MjmlImage
                align="left"
                src={emailAssetUrl('/email/fr.svg')}
                alt="République Française"
                padding={0}
              />
            </MjmlColumn>
            <MjmlColumn width="80%" verticalAlign="middle">
              <MjmlText
                fontWeight={500}
                fontSize="20px"
                padding={0}
                color={textTitleGrey}
              >
                {PublicWebAppConfig.projectTitle}
              </MjmlText>
            </MjmlColumn>
          </MjmlSection>
          <MjmlSection paddingLeft={40} paddingRight={40}>
            <MjmlColumn
              backgroundColor={backgroundAltBlueFrance}
              paddingTop={0}
              paddingBottom={0}
            >
              <MjmlImage
                align="center"
                height={200}
                src={emailAssetUrl('/email/gouvernance-welcome/success.svg')}
                alt=""
                paddingTop={40}
                paddingBottom={40}
              />
            </MjmlColumn>
          </MjmlSection>
          <MjmlSection paddingTop={0}>
            <MjmlColumn paddingTop={32} paddingBottom={40}>
              <MjmlText fontWeight={600} fontSize={28} color={brandColor}>
                Inscription confirmée !
              </MjmlText>
              <MjmlSpacer height={32} />
              <MjmlText fontSize={20}>
                Vous serez informé par mail lorsque les formulaires seront prêts
                à être complétés.
              </MjmlText>
            </MjmlColumn>
          </MjmlSection>
          <MjmlSection>
            <MjmlColumn paddingLeft={0} paddingRight={0}>
              <MjmlSpacer
                height={24}
                containerBackgroundColor={backgroundColor}
              />
            </MjmlColumn>
          </MjmlSection>
          <MjmlSection>
            <MjmlColumn paddingTop={40} paddingBottom={40}>
              <MjmlText fontWeight={600} fontSize="28px" color={brandColor}>
                Rappel des informations à renseigner
              </MjmlText>
              <MjmlSpacer height={32} />
              <MjmlText>
                En tant que {gouvernancePersona.title.toLocaleLowerCase('fr')},
                vous pouvez portez une feuille de route ou participez à
                l’élaboration des feuilles de routes territoriales qui seront
                proposées. Retrouvez ci-dessous les informations qui vous seront
                demandées :
              </MjmlText>

              {gouvernancePersona.blocs.map((bloc, blocIndex) => (
                <GouvernancePersonaBloc key={blocIndex} bloc={bloc} />
              ))}
            </MjmlColumn>
          </MjmlSection>
          {/* Section used for a bit of padding at the bottom */}
          <MjmlSection backgroundColor={backgroundColor} paddingBottom={40} />
        </MjmlBody>
      </Mjml>,
    ),
}
