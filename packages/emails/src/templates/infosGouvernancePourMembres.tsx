import {
  MjmlButton,
  MjmlColumn,
  MjmlSection,
  MjmlSpacer,
  MjmlText,
} from '@faire/mjml-react'
import React from 'react'
import { renderToMjml } from '@faire/mjml-react/utils/renderToMjml'
import { brandColor } from '@app/emails/styles'
import LayoutWithFooter from '@app/emails/components/LayoutWithFooter'

export type InfosGouvernancePourMembresProps = {
  url: string
  departement: string
  hasBesoins: boolean
}

export const infosGouvernancePourMembres = {
  subject: ({ departement }: InfosGouvernancePourMembresProps) =>
    `Gouvernance France Numérique Ensemble · ${departement}`,
  text: ({ url, hasBesoins }: InfosGouvernancePourMembresProps): string =>
    `Madame, Monsieur,
    
Vous êtes co-porteur ou membre de la gouvernance France Numérique Ensemble aux côtés de la Préfecture de département. 

Nous vous remercions pour votre implication dans cette démarche, à un moment où l’ancrage local des politiques d’inclusion numérique apparaît indispensable pour réduire l’éloignement numérique des citoyens. 

${
  hasBesoins
    ? `Dans ce cadre, nous vous transmettons les éléments de gouvernance et les besoins en ingénierie financière exprimés sur votre territoire. 
Ces informations ont été complétées par la Préfecture de département sur la plateforme France Numérique Ensemble.`
    : `Dans ce cadre, nous vous transmettons les éléments relatifs à la gouvernance sur votre territoire qui ont été complétés par la Préfecture de département sur la plateforme France Numérique Ensemble.`
}

Ils sont consultables en cliquant sur le lien suivant : ${url}

${
  hasBesoins
    ? `Il pourra vous être demandé de repréciser vos besoins d’ici à la remise des feuilles de route France Numérique Ensemble en juin 2024 conformément à la circulaire du 28 juillet 2023.

Nous communiquerons fin février sur les premières pistes de financement des besoins exprimés.

Nous vous souhaitons une bonne continuation dans la mise en œuvre de votre gouvernance et l’élaboration des feuilles de route territoriales.
`
    : `Ces éléments peuvent faire l’objet de modifications, notamment au fil de l’élaboration de la feuille de route. 

Nous attirons votre attention sur le fait que les besoins en ingénierie pour élaborer ou déployer votre ou vos feuille(s) de route France Numérique Ensemble ne nous ont pas été remontés. Nous vous invitons à vous concerter et à exprimer ces besoins le plus rapidement possible. Le formulaire reste accessible jusqu’au 29 février. 

Il pourra vous être demandé de repréciser vos besoins d’ici à la remise des feuilles de route France Numérique Ensemble en juin 2024 conformément à la circulaire du 28 juillet 2023.

Nous communiquerons fin février sur les premières pistes de financement des besoins exprimés.`
}


Bien cordialement, 

Le Programme Société Numérique de l’ANCT
`,
  mjml: ({
    hasBesoins,
    departement,
    url,
  }: InfosGouvernancePourMembresProps): string =>
    renderToMjml(
      <LayoutWithFooter
        headerLogoOnly
        title={`Gouvernance France Numérique Ensemble · ${departement}`}
        preview="Accédez à la gouvernance de votre territoire"
      >
        <MjmlSection paddingTop={0}>
          <MjmlColumn>
            <MjmlText
              align="center"
              fontWeight="600"
              fontSize="28px"
              color={brandColor}
            >
              Gouvernance France Numérique Ensemble · {departement}
            </MjmlText>
            <MjmlSpacer height="16px" />
            <MjmlText>
              Madame, Monsieur, <br />
              <br />
              Vous êtes co-porteur ou membre de la gouvernance France Numérique
              Ensemble aux côtés de la Préfecture de département.
              <br />
              <br />
              Nous vous remercions pour votre implication dans cette démarche, à
              un moment où l’ancrage local des politiques d’inclusion numérique
              apparaît indispensable pour réduire l’éloignement numérique des
              citoyens.
              <br />
              <br />
              {hasBesoins ? (
                <>
                  Dans ce cadre, nous vous transmettons les éléments de
                  gouvernance et les besoins en ingénierie financière exprimés
                  sur votre territoire. Ces informations ont été complétées par
                  la Préfecture de département sur la plateforme France
                  Numérique Ensemble.
                </>
              ) : (
                <>
                  Dans ce cadre, nous vous transmettons les éléments relatifs à
                  la gouvernance sur votre territoire qui ont été complétés par
                  la Préfecture de département sur la plateforme France
                  Numérique Ensemble.
                </>
              )}
              <br />
              <br />
              Ils sont consultables en cliquant sur le lien suivant :
            </MjmlText>
            <MjmlButton align="center" href={url}>
              Gouvernance · {departement}
            </MjmlButton>
            <MjmlText paddingBottom={60}>
              {hasBesoins ? (
                <>
                  Il pourra vous être demandé de repréciser vos besoins d’ici à
                  la remise des feuilles de route France Numérique Ensemble en
                  juin 2024 conformément à la circulaire du 28 juillet 2023.
                  <br />
                  <br />
                  Nous communiquerons fin février sur les premières pistes de
                  financement des besoins exprimés. <br />
                  <br />
                  Nous vous souhaitons une bonne continuation dans la mise en
                  œuvre de votre gouvernance et l’élaboration des feuilles de
                  route territoriales.
                </>
              ) : (
                <>
                  Ces éléments peuvent faire l’objet de modifications, notamment
                  au fil de l’élaboration de la feuille de route.
                  <br />
                  <br />
                  Nous attirons votre attention sur le fait que les besoins en
                  ingénierie pour élaborer ou déployer votre ou vos feuille(s)
                  de route France Numérique Ensemble ne nous ont pas été
                  remontés. <br />
                  Nous vous invitons à vous concerter et à exprimer ces besoins
                  le plus rapidement possible. <br />
                  Le formulaire reste accessible jusqu’au 29 février. Il pourra
                  vous être demandé de repréciser vos besoins d’ici à la remise
                  des feuilles de route France Numérique Ensemble en juin 2024
                  conformément à la circulaire du 28 juillet 2023. <br />
                  <br />
                  Nous communiquerons fin février sur les premières pistes de
                  financement des besoins exprimés.
                </>
              )}
              <br />
              <br />
              <br />
              Bien cordialement, <br />
              <br />
              Le Programme Société Numérique de l’ANCT
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </LayoutWithFooter>,
    ),
}
