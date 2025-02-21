import React, { PropsWithChildren, ReactNode } from 'react'

import Footer from '@app/emails/components/Footer'
import Head from '@app/emails/components/Head'
import { emailAssetUrl } from '@app/emails/emailAssetUrl'
import { backgroundColor } from '@app/emails/styles'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import {
  Mjml,
  MjmlBody,
  MjmlColumn,
  MjmlDivider,
  MjmlImage,
  MjmlSection,
  MjmlText,
} from '@faire/mjml-react'

/**
 * With headerLogoOnly the logo will be centered and you can include title in children
 */
const LayoutWithFooter = ({
  children,
  headerLogoOnly = false,
  title,
  preview,
}: PropsWithChildren<{
  headerLogoOnly?: boolean
  title: ReactNode
  preview: ReactNode
}>) => (
  <Mjml>
    <Head title={title} preview={preview} />
    <MjmlBody backgroundColor={backgroundColor}>
      {/* Section used for a bit of headroom at the top */}
      <MjmlSection backgroundColor={backgroundColor} />
      {/* Header with logos */}
      {headerLogoOnly ? (
        <MjmlSection paddingBottom="16px">
          <MjmlColumn width="20%" verticalAlign="middle">
            <MjmlImage
              align="center"
              src={emailAssetUrl('/email/fr.svg')}
              alt="République Française"
            />
          </MjmlColumn>
        </MjmlSection>
      ) : (
        <>
          <MjmlSection padding="40px 40px 0 40px">
            <MjmlColumn width="20%" verticalAlign="middle">
              <MjmlImage
                padding={0}
                align="left"
                src={emailAssetUrl('/email/fr.svg')}
                alt="République Française"
              />
            </MjmlColumn>
            <MjmlColumn width="15%" verticalAlign="middle">
              <MjmlImage
                padding="0 10px 0 32px"
                align="left"
                src={emailAssetUrl('/email/coop.svg')}
                alt="Logo coop de la médiation numérique"
              />
            </MjmlColumn>
            <MjmlColumn width="65%" verticalAlign="middle">
              <MjmlText padding={0} fontWeight="500" fontSize="18px">
                {PublicWebAppConfig.projectTitle}
              </MjmlText>
            </MjmlColumn>
          </MjmlSection>
          <MjmlSection padding="8px 15px">
            <MjmlColumn>
              <MjmlDivider
                border-width="1px"
                border-style="solid"
                border-color="#DDD"
              />
            </MjmlColumn>
          </MjmlSection>
        </>
      )}
      {children}
      <Footer />
      {/* Section used for a bit of padding at the bottom */}
      <MjmlSection backgroundColor={backgroundColor} />
    </MjmlBody>
  </Mjml>
)

export default LayoutWithFooter
