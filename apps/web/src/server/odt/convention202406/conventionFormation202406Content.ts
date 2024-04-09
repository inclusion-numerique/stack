import { MembreBeneficiaireDataForConventionPostProcessed } from '@app/web/gouvernance/getMembreBeneficiaireDataForConvention'
import { dateAsDay } from '@app/web/utils/dateAsDay'

export const conventionFormation202406Content = ({
  nom,
}: MembreBeneficiaireDataForConventionPostProcessed) => `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
                         xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0"
                         xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
                         xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0"
                         xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0"
                         xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0"
                         xmlns:xlink="http://www.w3.org/1999/xlink"
                         xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0"
                         xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0"
                         xmlns:chart="urn:oasis:names:tc:opendocument:xmlns:chart:1.0"
                         xmlns:dr3d="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0"
                         xmlns:form="urn:oasis:names:tc:opendocument:xmlns:form:1.0"
                         xmlns:script="urn:oasis:names:tc:opendocument:xmlns:script:1.0"
                         xmlns:of="urn:oasis:names:tc:opendocument:xmlns:of:1.2"
                         xmlns:field="urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0"
                         office:version="1.2">
    <office:scripts/>
    <office:font-face-decls>
        <style:font-face style:name="Symbol" svg:font-family="Symbol" style:font-family-generic="roman"
                         style:font-pitch="variable" style:font-charset="x-symbol"/>
        <style:font-face style:name="Wingdings" svg:font-family="Wingdings" style:font-family-generic="system"
                         style:font-pitch="variable" style:font-charset="x-symbol"/>
        <style:font-face style:name="Ubuntu" svg:font-family="Ubuntu" style:font-family-generic="system"/>
        <style:font-face style:name="font283" svg:font-family="font283" style:font-family-generic="system"/>
        <style:font-face style:name="Courier New" svg:font-family="&apos;Courier New&apos;"
                         style:font-family-generic="modern" style:font-pitch="fixed"/>
        <style:font-face style:name="MS Mincho" svg:font-family="&apos;MS Mincho&apos;"
                         style:font-family-generic="modern" style:font-pitch="fixed"/>
        <style:font-face style:name="Marianne" svg:font-family="Marianne" style:font-family-generic="modern"
                         style:font-pitch="variable"/>
        <style:font-face style:name="Times New Roman" svg:font-family="&apos;Times New Roman&apos;"
                         style:font-family-generic="roman" style:font-pitch="variable"/>
        <style:font-face style:name="Comic Sans MS" svg:font-family="&apos;Comic Sans MS&apos;"
                         style:font-family-generic="script" style:font-pitch="variable"/>
        <style:font-face style:name="Arial" svg:font-family="Arial" style:font-family-generic="swiss"
                         style:font-pitch="variable"/>
        <style:font-face style:name="Calibri" svg:font-family="Calibri" style:font-family-generic="swiss"
                         style:font-pitch="variable"/>
        <style:font-face style:name="Helvetica" svg:font-family="Helvetica" style:font-family-generic="swiss"
                         style:font-pitch="variable"/>
        <style:font-face style:name="Segoe UI" svg:font-family="&apos;Segoe UI&apos;" style:font-family-generic="swiss"
                         style:font-pitch="variable"/>
        <style:font-face style:name="Palatino" svg:font-family="Palatino" style:font-family-generic="system"
                         style:font-pitch="variable"/>
        <style:font-face style:name="SimSun" svg:font-family="SimSun" style:font-family-generic="system"
                         style:font-pitch="variable"/>
    </office:font-face-decls>
    <office:automatic-styles>
        <style:style style:name="Tableau1" style:family="table">
            <style:table-properties style:width="6.4889in" fo:margin-left="0in" table:align="left"/>
        </style:style>
        <style:style style:name="Tableau1.A" style:family="table-column">
            <style:table-column-properties style:column-width="3.9514in"/>
        </style:style>
        <style:style style:name="Tableau1.B" style:family="table-column">
            <style:table-column-properties style:column-width="2.5375in"/>
        </style:style>
        <style:style style:name="Tableau1.1" style:family="table-row">
            <style:table-row-properties style:min-row-height="0.9063in"/>
        </style:style>
        <style:style style:name="Tableau1.A1" style:family="table-cell">
            <style:table-cell-properties fo:padding-left="0.075in" fo:padding-right="0.075in" fo:padding-top="0in"
                                         fo:padding-bottom="0in" fo:border="none" style:writing-mode="lr-tb"/>
        </style:style>
        <style:style style:name="Tableau1.2" style:family="table-row">
            <style:table-row-properties style:min-row-height="0.1806in"/>
        </style:style>
        <style:style style:name="P1" style:family="paragraph" style:parent-style-name="Pied_20_de_20_page">
            <style:paragraph-properties fo:text-align="end" style:justify-single-word="false"/>
        </style:style>
        <style:style style:name="P2" style:family="paragraph" style:parent-style-name="Pied_20_de_20_page">
            <style:paragraph-properties fo:text-align="center" style:justify-single-word="false"/>
        </style:style>
        <style:style style:name="P3" style:family="paragraph" style:parent-style-name="Normal">
            <style:text-properties style:language-asian="fr" style:country-asian="FR"/>
        </style:style>
        <style:style style:name="P4" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="center" style:justify-single-word="false"/>
        </style:style>
        <style:style style:name="P5" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="center" style:justify-single-word="false"/>
            <style:text-properties style:font-name="Helvetica" fo:font-size="16pt" fo:font-weight="bold"
                                   style:font-name-asian="Arial" style:font-size-asian="16pt" style:language-asian="fr"
                                   style:country-asian="FR" style:font-weight-asian="bold"
                                   style:font-size-complex="16pt"/>
        </style:style>
        <style:style style:name="P6" style:family="paragraph" style:parent-style-name="Normal">
            <style:text-properties style:font-name="Helvetica" fo:font-size="12pt" fo:font-weight="bold"
                                   style:font-name-asian="Arial" style:font-size-asian="12pt" style:language-asian="fr"
                                   style:country-asian="FR" style:font-weight-asian="bold"
                                   style:font-size-complex="12pt"/>
        </style:style>
        <style:style style:name="P7" style:family="paragraph" style:parent-style-name="Normal">
            <style:text-properties style:font-name="Helvetica" fo:font-size="12pt" style:font-name-asian="Arial"
                                   style:font-size-asian="12pt" style:language-asian="fr" style:country-asian="FR"
                                   style:font-size-complex="12pt"/>
        </style:style>
        <style:style style:name="P8" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
        </style:style>
        <style:style style:name="P9" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false">
                <style:tab-stops>
                    <style:tab-stop style:position="0.1972in"/>
                    <style:tab-stop style:position="4.7362in"/>
                </style:tab-stops>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P10" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false">
                <style:tab-stops>
                    <style:tab-stop style:position="0.7874in"/>
                </style:tab-stops>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P11" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P12" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:line-height="115%" fo:text-align="justify"
                                        style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P13" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P14" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" fo:font-size="12pt" fo:font-weight="bold"
                                   style:font-name-asian="Arial" style:font-size-asian="12pt" style:language-asian="fr"
                                   style:country-asian="FR" style:font-weight-asian="bold"
                                   style:font-name-complex="Arial" style:font-size-complex="12pt"/>
        </style:style>
        <style:style style:name="P15" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" fo:font-size="12pt" fo:font-weight="bold"
                                   fo:background-color="#ffffff" style:font-name-asian="Arial"
                                   style:font-size-asian="12pt" style:font-weight-asian="bold"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P16" style:family="paragraph" style:parent-style-name="Normal">
            <style:text-properties style:font-name="Arial" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P17" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P18" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="center" style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P19" style:family="paragraph" style:parent-style-name="Normal">
            <style:text-properties style:font-name="Arial" style:language-asian="fr" style:country-asian="FR"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P20" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" style:language-asian="fr" style:country-asian="FR"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P21" style:family="paragraph" style:parent-style-name="Normal">
            <style:text-properties style:font-name="Arial" fo:font-weight="bold" style:font-weight-asian="bold"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P22" style:family="paragraph" style:parent-style-name="Normal">
            <style:text-properties style:font-name="Arial" fo:font-size="14pt" fo:font-weight="bold"
                                   style:font-name-asian="Arial" style:font-size-asian="14pt"
                                   style:font-weight-asian="bold" style:font-name-complex="Arial"
                                   style:font-size-complex="14pt"/>
        </style:style>
        <style:style style:name="P23" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="center" style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" fo:font-size="14pt" fo:font-weight="bold"
                                   style:font-name-asian="Arial" style:font-size-asian="14pt"
                                   style:font-weight-asian="bold" style:font-name-complex="Arial"
                                   style:font-size-complex="14pt"/>
        </style:style>
        <style:style style:name="P24" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="center" style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" fo:font-size="14pt" style:text-underline-style="solid"
                                   style:text-underline-width="auto" style:text-underline-color="font-color"
                                   style:text-underline-mode="continuous" style:text-overline-mode="continuous"
                                   style:text-line-through-mode="continuous" style:font-name-asian="Arial"
                                   style:font-size-asian="14pt" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P25" style:family="paragraph" style:parent-style-name="Normal">
            <style:text-properties style:font-name="Arial" fo:font-style="italic" style:font-style-asian="italic"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P26" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:line-height="115%" fo:text-align="justify"
                                        style:justify-single-word="false"/>
        </style:style>
        <style:style style:name="P27" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties>
                <style:tab-stops>
                    <style:tab-stop style:position="2.528in"/>
                </style:tab-stops>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P28" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0.25in" fo:margin-bottom="0.1665in" fo:text-align="center"
                                        style:justify-single-word="false"/>
            <style:text-properties style:font-name="Helvetica" fo:font-size="16pt" fo:font-weight="bold"
                                   style:font-size-asian="16pt" style:font-weight-asian="bold"
                                   style:font-name-complex="Helvetica"/>
        </style:style>
        <style:style style:name="P29" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0.0835in" fo:margin-bottom="0.139in" fo:text-align="justify"
                                        style:justify-single-word="false"/>
        </style:style>
        <style:style style:name="P30" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"
                                        fo:background-color="#ffffff">
                <style:background-image/>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P31" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"
                                        fo:background-color="#ffffff">
                <style:background-image/>
            </style:paragraph-properties>
            <style:text-properties style:font-name="Arial" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P32" style:family="paragraph" style:parent-style-name="TM_20_2">
            <style:paragraph-properties>
                <style:tab-stops>
                    <style:tab-stop style:position="6.1402in" style:type="right" style:leader-style="dotted"
                                    style:leader-text="."/>
                </style:tab-stops>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P33" style:family="paragraph" style:parent-style-name="TM_20_3">
            <style:paragraph-properties>
                <style:tab-stops>
                    <style:tab-stop style:position="5.9874in" style:type="right" style:leader-style="dotted"
                                    style:leader-text="."/>
                </style:tab-stops>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P34" style:family="paragraph" style:parent-style-name="TM_20_4">
            <style:paragraph-properties>
                <style:tab-stops>
                    <style:tab-stop style:position="5.8346in" style:type="right" style:leader-style="dotted"
                                    style:leader-text="."/>
                </style:tab-stops>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P35" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:hyphenation-ladder-count="no-limit" fo:break-before="page"/>
            <style:text-properties style:language-asian="fr" style:country-asian="FR" fo:hyphenate="true"
                                   fo:hyphenation-remain-char-count="0" fo:hyphenation-push-char-count="0"/>
        </style:style>
        <style:style style:name="P36" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in"/>
        </style:style>
        <style:style style:name="P37" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P38" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P39" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:orphans="0" fo:widows="0">
                <style:tab-stops>
                    <style:tab-stop style:position="3.1425in"/>
                </style:tab-stops>
            </style:paragraph-properties>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P40" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:orphans="0" fo:widows="0"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P41" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Times New Roman"
                                   style:language-asian="fr" style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P42" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false">
                <style:tab-stops>
                    <style:tab-stop style:position="0.1972in"/>
                    <style:tab-stop style:position="4.7362in"/>
                </style:tab-stops>
            </style:paragraph-properties>
            <style:text-properties style:font-name="Arial" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P43" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:orphans="0" fo:widows="0">
                <style:tab-stops>
                    <style:tab-stop style:position="3.1425in"/>
                </style:tab-stops>
            </style:paragraph-properties>
            <style:text-properties style:font-name="Arial" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P44" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in"/>
            <style:text-properties style:font-name="Arial" fo:background-color="#ff00ff" style:font-name-asian="Arial"
                                   style:language-asian="fr" style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P45" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:orphans="0" fo:widows="0"/>
        </style:style>
        <style:style style:name="P46" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:orphans="0" fo:widows="0">
                <style:tab-stops>
                    <style:tab-stop style:position="3.1425in"/>
                </style:tab-stops>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P47" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:orphans="0" fo:widows="0"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P48" style:family="paragraph" style:parent-style-name="docdata">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" fo:font-size="11pt" fo:background-color="#ffffff"
                                   style:font-name-asian="Calibri" style:font-size-asian="11pt"
                                   style:language-asian="en" style:country-asian="US" style:font-name-complex="Arial"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="P49" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:keep-with-next="always"/>
        </style:style>
        <style:style style:name="P50" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:keep-with-next="always">
                <style:tab-stops>
                    <style:tab-stop style:position="3.1425in"/>
                </style:tab-stops>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P51" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:keep-with-next="always"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P52" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:keep-with-next="always">
                <style:tab-stops>
                    <style:tab-stop style:position="3.1425in"/>
                </style:tab-stops>
            </style:paragraph-properties>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P53" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:keep-with-next="always"/>
            <style:text-properties style:font-name="Arial" style:language-asian="fr" style:country-asian="FR"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P54" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:keep-with-next="always"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P55" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:orphans="0" fo:widows="0"
                                        fo:background-color="#ffffff">
                <style:tab-stops>
                    <style:tab-stop style:position="3.1425in"/>
                </style:tab-stops>
                <style:background-image/>
            </style:paragraph-properties>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P56" style:family="paragraph"
                     style:parent-style-name="Note_20_de_20_bas_20_de_20_page">
            <style:paragraph-properties fo:text-align="start" style:justify-single-word="false"/>
        </style:style>
        <style:style style:name="P57" style:family="paragraph" style:parent-style-name="Corps_20_de_20_texte">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
            <style:text-properties fo:font-size="11pt" fo:background-color="#ffffff" style:font-name-asian="Calibri"
                                   style:font-size-asian="11pt" style:language-asian="en" style:country-asian="US"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="P58" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-left="0.3945in" fo:margin-right="0in" fo:text-indent="-0.1445in"
                                        style:auto-text-indent="false">
                <style:tab-stops/>
            </style:paragraph-properties>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P59" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-left="0in" fo:margin-right="0in" fo:margin-top="0in"
                                        fo:margin-bottom="0in" fo:text-align="justify" style:justify-single-word="false"
                                        fo:orphans="0" fo:widows="0" fo:text-indent="0.1972in"
                                        style:auto-text-indent="false"/>
            <style:text-properties style:font-name="Arial" fo:font-weight="bold" style:font-name-asian="Arial"
                                   style:language-asian="fr" style:country-asian="FR" style:font-weight-asian="bold"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P60" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-left="0in" fo:margin-right="0in" fo:margin-top="0in"
                                        fo:margin-bottom="0in" fo:text-align="justify" style:justify-single-word="false"
                                        fo:orphans="0" fo:widows="0" fo:text-indent="0.1972in"
                                        style:auto-text-indent="false"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P61" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false" fo:orphans="0"
                                        fo:widows="0" fo:keep-with-next="always"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P62" style:family="paragraph" style:parent-style-name="Corps_20_de_20_texte">
            <style:paragraph-properties fo:margin-left="0in" fo:margin-right="-0.002in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:text-indent="0in"
                                        style:auto-text-indent="false"/>
            <style:text-properties fo:font-size="11pt" style:font-name-asian="Arial" style:font-size-asian="11pt"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="P63" style:family="paragraph" style:parent-style-name="Corps_20_de_20_texte">
            <style:paragraph-properties fo:margin-left="0in" fo:margin-right="-0.002in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:text-indent="0in"
                                        style:auto-text-indent="false"/>
            <style:text-properties fo:font-size="11pt" style:font-name-asian="Calibri" style:font-size-asian="11pt"
                                   style:language-asian="en" style:country-asian="US" style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="P64" style:family="paragraph" style:parent-style-name="Corps_20_de_20_texte">
            <style:paragraph-properties fo:margin-left="0in" fo:margin-right="-0.002in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:text-indent="0in"
                                        style:auto-text-indent="false"/>
        </style:style>
        <style:style style:name="P65" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0.0835in" fo:keep-with-next="always"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P66" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0.0835in" fo:margin-bottom="0.111in" fo:text-align="justify"
                                        style:justify-single-word="false"/>
        </style:style>
        <style:style style:name="P67" style:family="paragraph" style:parent-style-name="Heading_20_4">
            <style:text-properties fo:background-color="#ffffff"/>
        </style:style>
        <style:style style:name="P68" style:family="paragraph" style:parent-style-name="Heading_20_3">
            <style:text-properties style:use-window-font-color="true" fo:font-size="12pt" fo:language="fr"
                                   fo:country="FR" fo:font-weight="bold" style:font-size-asian="12pt"
                                   style:font-weight-asian="bold" style:font-size-complex="12pt"/>
        </style:style>
        <style:style style:name="P69" style:family="paragraph" style:parent-style-name="Heading_20_2">
            <style:text-properties style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P70" style:family="paragraph" style:parent-style-name="Heading_20_2">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
            <style:text-properties style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P71" style:family="paragraph" style:parent-style-name="Heading_20_2">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
            <style:text-properties style:font-name-asian="Calibri" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P72" style:family="paragraph" style:parent-style-name="Heading_20_2">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
        </style:style>
        <style:style style:name="P73" style:family="paragraph" style:parent-style-name="Heading_20_2">
            <style:text-properties fo:font-size="14pt" style:font-size-asian="14pt"/>
        </style:style>
        <style:style style:name="P74" style:family="paragraph" style:parent-style-name="Heading_20_2">
            <style:paragraph-properties fo:text-align="center" style:justify-single-word="false"/>
            <style:text-properties fo:font-size="14pt" style:font-size-asian="14pt"/>
        </style:style>
        <style:style style:name="P75" style:family="paragraph" style:parent-style-name="Heading_20_2">
            <style:paragraph-properties fo:break-before="page"/>
        </style:style>
        <style:style style:name="P76" style:family="paragraph" style:parent-style-name="Heading_20_2">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in"/>
            <style:text-properties style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P77" style:family="paragraph" style:parent-style-name="Normal"
                     style:master-page-name="MPF0">
            <style:paragraph-properties fo:text-align="center" style:justify-single-word="false" style:page-number="1"
                                        fo:break-before="page"/>
        </style:style>
        <style:style style:name="P78" style:family="paragraph" style:parent-style-name="Normal"
                     style:list-style-name="L2">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false">
                <style:tab-stops>
                    <style:tab-stop style:position="-6.928in"/>
                    <style:tab-stop style:position="-6.5311in"/>
                    <style:tab-stop style:position="-2.389in"/>
                </style:tab-stops>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P79" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:break-before="page">
                <style:tab-stops>
                    <style:tab-stop style:position="6.1402in" style:type="right" style:leader-style="dotted"
                                    style:leader-text="."/>
                </style:tab-stops>
            </style:paragraph-properties>
            <style:text-properties style:font-name="Helvetica" fo:font-size="12pt" style:font-name-asian="Arial"
                                   style:font-size-asian="12pt" style:language-asian="fr" style:country-asian="FR"
                                   style:font-size-complex="12pt"/>
        </style:style>
        <style:style style:name="P80" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste"
                     style:list-style-name="L1">
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P81" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste"
                     style:list-style-name="L4">
            <style:text-properties style:font-name="Arial" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P82" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste"
                     style:list-style-name="L3">
            <style:text-properties style:font-name="Arial" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P83" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste"
                     style:list-style-name="L3"/>
        <style:style style:name="P84" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste"
                     style:list-style-name="L4"/>
        <style:style style:name="P85" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste"
                     style:list-style-name="L3">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false" fo:orphans="0"
                                        fo:widows="0" fo:keep-with-next="always"/>
        </style:style>
        <style:style style:name="P86" style:family="paragraph" style:parent-style-name="TM_20_2">
            <style:paragraph-properties>
                <style:tab-stops>
                    <style:tab-stop style:position="6.1402in" style:type="right" style:leader-style="dotted"
                                    style:leader-text="."/>
                </style:tab-stops>
            </style:paragraph-properties>
            <style:text-properties style:font-name="Helvetica" fo:font-size="12pt" style:font-name-asian="Arial"
                                   style:font-size-asian="12pt" style:language-asian="fr" style:country-asian="FR"
                                   style:font-size-complex="12pt"/>
        </style:style>
        <style:style style:name="T1" style:family="text">
            <style:text-properties style:language-asian="fr" style:country-asian="FR"/>
        </style:style>
        <style:style style:name="T2" style:family="text">
            <style:text-properties style:font-name="Helvetica" fo:font-size="16pt" fo:font-weight="bold"
                                   style:font-name-asian="Arial" style:font-size-asian="16pt" style:language-asian="fr"
                                   style:country-asian="FR" style:font-weight-asian="bold"
                                   style:font-size-complex="16pt"/>
        </style:style>
        <style:style style:name="T3" style:family="text">
            <style:text-properties style:font-name="Helvetica" fo:font-size="12pt" style:font-name-asian="Arial"
                                   style:font-size-asian="12pt" style:language-asian="fr" style:country-asian="FR"
                                   style:font-size-complex="12pt"/>
        </style:style>
        <style:style style:name="T4" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-weight="bold" style:font-name-asian="Arial"
                                   style:language-asian="fr" style:country-asian="FR" style:font-weight-asian="bold"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T5" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-weight="bold" style:font-name-asian="Arial"
                                   style:font-weight-asian="bold" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T6" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-weight="bold" fo:background-color="#00ffff"
                                   style:font-name-asian="Arial" style:language-asian="fr" style:country-asian="FR"
                                   style:font-weight-asian="bold" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T7" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-weight="bold" fo:background-color="#ffff00"
                                   style:font-name-asian="Arial" style:language-asian="fr" style:country-asian="FR"
                                   style:font-weight-asian="bold" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T8" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-weight="bold" fo:background-color="#ff00ff"
                                   style:font-name-asian="Arial" style:language-asian="fr" style:country-asian="FR"
                                   style:font-weight-asian="bold" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T9" style:family="text">
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T10" style:family="text">
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T11" style:family="text">
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:font-name-complex="Arial"
                                   style:font-weight-complex="bold"/>
        </style:style>
        <style:style style:name="T12" style:family="text">
            <style:text-properties style:font-name="Arial" fo:background-color="#ffff00" style:font-name-asian="Arial"
                                   style:language-asian="fr" style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T13" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-size="12pt" style:font-name-asian="Arial"
                                   style:font-size-asian="12pt" style:language-asian="fr" style:country-asian="FR"
                                   style:font-name-complex="Arial" style:font-size-complex="12pt"/>
        </style:style>
        <style:style style:name="T14" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-size="12pt" fo:background-color="#ffffff"
                                   style:font-name-asian="Arial" style:font-size-asian="12pt" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"
                                   style:font-size-complex="12pt"/>
        </style:style>
        <style:style style:name="T15" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-size="12pt" fo:font-weight="bold"
                                   fo:background-color="#ffffff" style:font-name-asian="Arial"
                                   style:font-size-asian="12pt" style:font-weight-asian="bold"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T16" style:family="text">
            <style:text-properties style:font-name="Arial" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T17" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-size="9pt" style:font-size-asian="9pt"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T18" style:family="text">
            <style:text-properties style:font-name="Arial" style:language-asian="fr" style:country-asian="FR"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T19" style:family="text">
            <style:text-properties style:font-name="Arial" fo:background-color="#ffffff"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T20" style:family="text">
            <style:text-properties style:font-name="Arial" fo:background-color="#ffffff" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T21" style:family="text">
            <style:text-properties style:font-name="Arial" fo:background-color="#ff00ff" style:font-name-asian="Arial"
                                   style:language-asian="fr" style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T22" style:family="text">
            <style:text-properties style:font-name="Arial" fo:background-color="#00ffff" style:font-name-asian="Arial"
                                   style:language-asian="fr" style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T23" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-size="14pt" fo:font-weight="bold"
                                   style:font-name-asian="Arial" style:font-size-asian="14pt"
                                   style:font-weight-asian="bold" style:font-name-complex="Arial"
                                   style:font-size-complex="14pt"/>
        </style:style>
        <style:style style:name="T24" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-size="14pt" style:text-underline-style="solid"
                                   style:text-underline-width="auto" style:text-underline-color="font-color"
                                   style:text-underline-mode="continuous" style:text-overline-mode="continuous"
                                   style:text-line-through-mode="continuous" style:font-name-asian="Arial"
                                   style:font-size-asian="14pt" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T25" style:family="text">
            <style:text-properties style:text-position="super 64%" style:font-name="Arial" style:font-name-asian="Arial"
                                   style:language-asian="fr" style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T26" style:family="text">
            <style:text-properties fo:font-weight="bold" style:font-weight-asian="bold"/>
        </style:style>
        <style:style style:name="T27" style:family="text">
            <style:text-properties fo:font-weight="bold" style:font-weight-asian="bold"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T28" style:family="text">
            <style:text-properties fo:font-weight="bold" fo:background-color="#ffffff" style:font-weight-asian="bold"/>
        </style:style>
        <style:style style:name="T29" style:family="text">
            <style:text-properties style:font-name-asian="Calibri" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T30" style:family="text">
            <style:text-properties fo:font-size="11pt" style:font-name-asian="Arial" style:font-size-asian="11pt"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="T31" style:family="text">
            <style:text-properties fo:font-size="11pt" fo:background-color="#ffffff" style:font-name-asian="Calibri"
                                   style:font-size-asian="11pt" style:language-asian="en" style:country-asian="US"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="T32" style:family="text">
            <style:text-properties fo:font-size="11pt" fo:font-style="italic" style:font-name-asian="Arial"
                                   style:font-size-asian="11pt" style:font-style-asian="italic"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="T33" style:family="text">
            <style:text-properties style:font-name-asian="Arial"/>
        </style:style>
        <style:style style:name="fr1" style:family="graphic" style:parent-style-name="Graphics">
            <style:graphic-properties style:wrap="parallel" style:number-wrapped-paragraphs="no-limit"
                                      style:vertical-pos="from-top" style:vertical-rel="paragraph"
                                      style:horizontal-pos="from-left" style:horizontal-rel="paragraph"
                                      fo:background-color="#ffffff" style:background-transparency="0%"
                                      fo:padding-left="0.1in" fo:padding-right="0.1in" fo:padding-top="0.05in"
                                      fo:padding-bottom="0.05in" fo:border="0.0138in solid #000000"
                                      style:writing-mode="lr-tb">
                <style:background-image/>
            </style:graphic-properties>
        </style:style>
        <style:style style:name="fr2" style:family="graphic" style:parent-style-name="Graphics">
            <style:graphic-properties style:vertical-pos="from-top" style:horizontal-pos="from-left"
                                      style:horizontal-rel="paragraph-content" fo:background-color="transparent"
                                      style:background-transparency="100%" fo:padding="0in" fo:border="none"
                                      style:mirror="none" fo:clip="rect(0in, 0in, 0in, 0in)" draw:luminance="0%"
                                      draw:contrast="0%" draw:red="0%" draw:green="0%" draw:blue="0%" draw:gamma="100%"
                                      draw:color-inversion="false" draw:image-opacity="100%" draw:color-mode="standard">
                <style:background-image/>
            </style:graphic-properties>
        </style:style>
        <style:style style:name="Sect1" style:family="section">
            <style:section-properties style:editable="false">
                <style:columns fo:column-count="1" fo:column-gap="0in"/>
            </style:section-properties>
        </style:style>
        <text:list-style style:name="L1">
            <text:list-level-style-bullet text:level="1" text:style-name="WW_5f_CharLFO5LVL1" text:bullet-char="-">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="0.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Arial"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="2" text:style-name="WW_5f_CharLFO5LVL2" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="1in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="3" text:style-name="WW_5f_CharLFO5LVL3" text:bullet-char="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="1.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Wingdings"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="4" text:style-name="WW_5f_CharLFO5LVL4" text:bullet-char="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="2in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Symbol"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="5" text:style-name="WW_5f_CharLFO5LVL5" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="2.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="6" text:style-name="WW_5f_CharLFO5LVL6" text:bullet-char="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="3in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Wingdings"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="7" text:style-name="WW_5f_CharLFO5LVL7" text:bullet-char="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="3.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Symbol"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="8" text:style-name="WW_5f_CharLFO5LVL8" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="4in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="9" text:style-name="WW_5f_CharLFO5LVL9" text:bullet-char="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="4.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Wingdings"/>
            </text:list-level-style-bullet>
            <text:list-level-style-number text:level="10" style:num-suffix="." style:num-format="1">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab"
                                                      text:list-tab-stop-position="2.75in" fo:text-indent="-0.25in"
                                                      fo:margin-left="2.75in"/>
                </style:list-level-properties>
            </text:list-level-style-number>
        </text:list-style>
        <text:list-style style:name="L2">
            <text:list-level-style-bullet text:level="1" text:style-name="WW_5f_CharLFO6LVL1" text:bullet-char="-">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.3437in"
                                                      fo:margin-left="0.5937in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Arial"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="2" text:style-name="WW_5f_CharLFO6LVL2" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="1in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="3" text:style-name="WW_5f_CharLFO6LVL3" text:bullet-char="§">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="1.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Wingdings"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="4" text:style-name="WW_5f_CharLFO6LVL4" text:bullet-char="·">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="2in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Symbol"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="5" text:style-name="WW_5f_CharLFO6LVL5" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="2.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="6" text:style-name="WW_5f_CharLFO6LVL6" text:bullet-char="§">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="3in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Wingdings"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="7" text:style-name="WW_5f_CharLFO6LVL7" text:bullet-char="·">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="3.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Symbol"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="8" text:style-name="WW_5f_CharLFO6LVL8" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="4in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="9" text:style-name="WW_5f_CharLFO6LVL9" text:bullet-char="§">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="4.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Wingdings"/>
            </text:list-level-style-bullet>
            <text:list-level-style-number text:level="10" style:num-suffix="." style:num-format="1">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab"
                                                      text:list-tab-stop-position="2.75in" fo:text-indent="-0.25in"
                                                      fo:margin-left="2.75in"/>
                </style:list-level-properties>
            </text:list-level-style-number>
        </text:list-style>
        <text:list-style style:name="L3">
            <text:list-level-style-bullet text:level="1" text:style-name="WW_5f_CharLFO7LVL1" text:bullet-char="-">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="0.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Arial"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="2" text:style-name="WW_5f_CharLFO7LVL2" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="1in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="3" text:style-name="WW_5f_CharLFO7LVL3" text:bullet-char="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="1.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Wingdings"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="4" text:style-name="WW_5f_CharLFO7LVL4" text:bullet-char="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="2in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Symbol"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="5" text:style-name="WW_5f_CharLFO7LVL5" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="2.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="6" text:style-name="WW_5f_CharLFO7LVL6" text:bullet-char="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="3in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Wingdings"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="7" text:style-name="WW_5f_CharLFO7LVL7" text:bullet-char="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="3.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Symbol"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="8" text:style-name="WW_5f_CharLFO7LVL8" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="4in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="9" text:style-name="WW_5f_CharLFO7LVL9" text:bullet-char="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="4.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Wingdings"/>
            </text:list-level-style-bullet>
            <text:list-level-style-number text:level="10" style:num-suffix="." style:num-format="1">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab"
                                                      text:list-tab-stop-position="2.75in" fo:text-indent="-0.25in"
                                                      fo:margin-left="2.75in"/>
                </style:list-level-properties>
            </text:list-level-style-number>
        </text:list-style>
        <text:list-style style:name="L4">
            <text:list-level-style-number text:level="1" style:num-suffix="-" style:num-format="1">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="0.5in"/>
                </style:list-level-properties>
            </text:list-level-style-number>
            <text:list-level-style-number text:level="2" style:num-suffix="." style:num-format="a"
                                          style:num-letter-sync="true">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="1in"/>
                </style:list-level-properties>
            </text:list-level-style-number>
            <text:list-level-style-number text:level="3" style:num-suffix="." style:num-format="i">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment"
                                             fo:text-align="end">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.1252in"
                                                      fo:margin-left="1.5in"/>
                </style:list-level-properties>
            </text:list-level-style-number>
            <text:list-level-style-number text:level="4" style:num-suffix="." style:num-format="1">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="2in"/>
                </style:list-level-properties>
            </text:list-level-style-number>
            <text:list-level-style-number text:level="5" style:num-suffix="." style:num-format="a"
                                          style:num-letter-sync="true">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="2.5in"/>
                </style:list-level-properties>
            </text:list-level-style-number>
            <text:list-level-style-number text:level="6" style:num-suffix="." style:num-format="i">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment"
                                             fo:text-align="end">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.1252in"
                                                      fo:margin-left="3in"/>
                </style:list-level-properties>
            </text:list-level-style-number>
            <text:list-level-style-number text:level="7" style:num-suffix="." style:num-format="1">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="3.5in"/>
                </style:list-level-properties>
            </text:list-level-style-number>
            <text:list-level-style-number text:level="8" style:num-suffix="." style:num-format="a"
                                          style:num-letter-sync="true">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="4in"/>
                </style:list-level-properties>
            </text:list-level-style-number>
            <text:list-level-style-number text:level="9" style:num-suffix="." style:num-format="i">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment"
                                             fo:text-align="end">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.1252in"
                                                      fo:margin-left="4.5in"/>
                </style:list-level-properties>
            </text:list-level-style-number>
            <text:list-level-style-number text:level="10" style:num-suffix="." style:num-format="1">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab"
                                                      text:list-tab-stop-position="2.75in" fo:text-indent="-0.25in"
                                                      fo:margin-left="2.75in"/>
                </style:list-level-properties>
            </text:list-level-style-number>
        </text:list-style>
    </office:automatic-styles>
    <office:body>
        <office:text text:use-soft-page-breaks="true">
            <text:sequence-decls>
                <text:sequence-decl text:display-outline-level="0" text:name="Illustration"/>
                <text:sequence-decl text:display-outline-level="0" text:name="Table"/>
                <text:sequence-decl text:display-outline-level="0" text:name="Text"/>
                <text:sequence-decl text:display-outline-level="0" text:name="Drawing"/>
            </text:sequence-decls>
            <text:p text:style-name="P77">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T1">
                        <draw:frame draw:style-name="fr2" draw:name="Image 2" text:anchor-type="as-char" svg:y="0in"
                                    svg:width="4.4445in" style:rel-width="scale" svg:height="1.3984in"
                                    style:rel-height="scale" draw:z-index="0">
                            <draw:image xlink:href="Pictures/10000201000005DC000001D853CD6968.png" xlink:type="simple"
                                        xlink:show="embed" xlink:actuate="onLoad"/>
                        </draw:frame>
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P3"/>
            <text:p text:style-name="P3"/>
            <text:p text:style-name="P4">
                <draw:frame draw:style-name="fr1" draw:name="Zone de texte 2" text:anchor-type="paragraph"
                            svg:x="0.9673in" svg:y="0.1154in" svg:width="4.1665in" style:rel-width="scale"
                            svg:height="0.8228in" style:rel-height="scale" draw:z-index="1">
                    <draw:text-box>
                        <text:p text:style-name="P28">Convention de subventionnement</text:p>
                    </draw:text-box>
                </draw:frame>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T2"/>
                </text:span>
            </text:p>
            <text:p text:style-name="P5"/>
            <text:p text:style-name="P5"/>
            <text:p text:style-name="P5"/>
            <text:p text:style-name="P5"/>
            <text:p text:style-name="P6">Entre</text:p>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T3">
                        <text:line-break/>
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T4">L’Agence Nationale de la Cohésion des Territoires</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">, « </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T4">ANCT</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9"> »,</text:span>
                </text:span>
                <text:bookmark-start text:name="_Hlk117601944"/>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">établissement public de l’Etat immatriculé sous le numéro SIREN
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">130 026 032 dont le siège est 20 avenue de Ségur – TSA 10717 – 75334
                        PARIS CEDEX 07, représenté par Monsieur Stanislas BOURRON Directeur Général de ladite Agence,
                        nommé à ces fonctions par décret du Président de la République en date du 1
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T25">er</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">décembre 2022 e</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">t domicilié en cette qualité audit siège</text:span>
                </text:span>
                <text:bookmark-end text:name="_Hlk117601944"/>
            </text:p>
            <text:p text:style-name="P29">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">Ci-après dénommée «</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T4">l’ANCT</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">»,</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P7"/>
            <text:p text:style-name="P6">Et</text:p>
            <text:p text:style-name="P30">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">${nom},</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T7">Détail statut (association de loi de 1901, coopérative, autre…)</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">, situé(e)
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T4"></text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T7">Adresse</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T16">,</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">représenté(e) par</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T7">Nom du référent, fonction du référent</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T4">.</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P7"/>
            <text:p text:style-name="Normal">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T13">Ci-après</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T13">dénommé(e)</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T14">« le Bénéficiaire »,</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P7"/>
            <text:p text:style-name="P7">L’ANCT et le bénéficiaire sont ci-après désignés ensemble « les Parties »,
            </text:p>
            <text:p text:style-name="P7"/>
            <text:p text:style-name="P7">Il a été convenu ce qui suit :</text:p>
            <text:p text:style-name="BREAK"/>
            <text:table-of-content text:style-name="Sect1" text:name="_TOC0">
                <text:table-of-content-source text:outline-level="4" text:use-index-marks="false">
                    <text:index-title-template text:style-name="Contents_20_Heading">Table des matières
                    </text:index-title-template>
                    <text:table-of-content-entry-template text:outline-level="1" text:style-name="TM_20_1">
                        <text:index-entry-link-start/>
                        <text:index-entry-text/>
                        <text:index-entry-tab-stop style:type="right" style:leader-char="."/>
                        <text:index-entry-page-number/>
                        <text:index-entry-link-end/>
                    </text:table-of-content-entry-template>
                    <text:table-of-content-entry-template text:outline-level="2" text:style-name="TM_20_2">
                        <text:index-entry-link-start/>
                        <text:index-entry-text/>
                        <text:index-entry-tab-stop style:type="right" style:leader-char="."/>
                        <text:index-entry-page-number/>
                        <text:index-entry-link-end/>
                    </text:table-of-content-entry-template>
                    <text:table-of-content-entry-template text:outline-level="3" text:style-name="TM_20_3">
                        <text:index-entry-link-start/>
                        <text:index-entry-text/>
                        <text:index-entry-tab-stop style:type="right" style:leader-char="."/>
                        <text:index-entry-page-number/>
                        <text:index-entry-link-end/>
                    </text:table-of-content-entry-template>
                    <text:table-of-content-entry-template text:outline-level="4" text:style-name="TM_20_4">
                        <text:index-entry-link-start/>
                        <text:index-entry-text/>
                        <text:index-entry-tab-stop style:type="right" style:leader-char="."/>
                        <text:index-entry-page-number/>
                        <text:index-entry-link-end/>
                    </text:table-of-content-entry-template>
                    <text:table-of-content-entry-template text:outline-level="5" text:style-name="Contents_20_5">
                        <text:index-entry-chapter/>
                        <text:index-entry-text/>
                        <text:index-entry-tab-stop style:type="right" style:leader-char="."/>
                        <text:index-entry-page-number/>
                    </text:table-of-content-entry-template>
                    <text:table-of-content-entry-template text:outline-level="6" text:style-name="Contents_20_6">
                        <text:index-entry-chapter/>
                        <text:index-entry-text/>
                        <text:index-entry-tab-stop style:type="right" style:leader-char="."/>
                        <text:index-entry-page-number/>
                    </text:table-of-content-entry-template>
                    <text:table-of-content-entry-template text:outline-level="7" text:style-name="Contents_20_7">
                        <text:index-entry-chapter/>
                        <text:index-entry-text/>
                        <text:index-entry-tab-stop style:type="right" style:leader-char="."/>
                        <text:index-entry-page-number/>
                    </text:table-of-content-entry-template>
                    <text:table-of-content-entry-template text:outline-level="8" text:style-name="Contents_20_8">
                        <text:index-entry-chapter/>
                        <text:index-entry-text/>
                        <text:index-entry-tab-stop style:type="right" style:leader-char="."/>
                        <text:index-entry-page-number/>
                    </text:table-of-content-entry-template>
                    <text:table-of-content-entry-template text:outline-level="9" text:style-name="Contents_20_9">
                        <text:index-entry-chapter/>
                        <text:index-entry-text/>
                        <text:index-entry-tab-stop style:type="right" style:leader-char="."/>
                        <text:index-entry-page-number/>
                    </text:table-of-content-entry-template>
                    <text:table-of-content-entry-template text:outline-level="10" text:style-name="Contents_20_10">
                        <text:index-entry-chapter/>
                        <text:index-entry-text/>
                        <text:index-entry-tab-stop style:type="right" style:leader-char="."/>
                        <text:index-entry-page-number/>
                    </text:table-of-content-entry-template>
                </text:table-of-content-source>
                <text:p text:style-name="BREAK"/>
                <text:index-body>
                    <text:p text:style-name="P32">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950394" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T26">Préambule</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950394" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>3
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P32">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950395" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T27">Article 1 : Objet</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950395" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T27">de la convention</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950395" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>4
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P32">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950396" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T27">Article 2 : Description du projet de la gouvernance
                                </text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950396" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>4
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P33">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950397" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T26">Article 2.1: la formation des agents publics à Aidant
                                    Connect
                                </text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950397" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>4
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P32">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950398" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T27">Article 3 : Durée de l</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950398" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T27">a convention</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950398" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>4
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P32">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950399" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T27">Article 4 : Modalités du financement</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950399" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>4
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P33">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950400" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T26">4.1. Montant de la participation financière</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950400" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>4
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P34">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950401" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T26">4. 1. 1. Formations Aidants Connect</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950401" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>4
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P33">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950402" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T26">4.2. Versement et délai de paiement</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950402" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>5
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P32">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950403" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T27">Article 5 : Suivi de la réalisation du projet du
                                    bénéficiaire et son évaluation
                                </text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950403" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>5
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P33">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950404" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T26">5.1. Suivi et animation collective</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950404" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>5
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P34">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950405" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T28">5. 1. 2. Formations Aidants Connect</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950405" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>5
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P33">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950406" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T26">5.2. Evaluation de la dépense des fonds</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950406" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>5
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P32">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950407" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T27">Article 6 : Communication et propriété intellectuelle
                                </text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950407" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>6
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P32">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950408" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T27">Article 7 : Respect du Contrat d’engagement républicain
                                    par les associations et les fondations
                                </text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950408" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>6
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P32">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950409" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T27">Article 8 : Résiliation</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950409" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>7
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P33">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950410" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T26">8.1. Résiliation pour faute</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950410" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>7
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P33">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950411" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T26">8.2.<text:s/>Effets de la résiliation
                                </text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950411" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>7
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P32">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950412" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T27">Article 9 : Force majeure</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950412" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>7
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P32">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950413" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T27">Article 10 : Dispositions générales</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950413" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>7
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P33">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950414" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T26">10.1. Modification de la convention</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950414" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>7
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P33">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950415" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T26">10.2. Nullité</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950415" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>8
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P33">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950416" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T26">10.3. Renonciation</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950416" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>8
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P33">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950417" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T26">10.4. Cession et transmission de la convention
                                </text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950417" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>8
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P33">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950418" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T26">10.5. Publication des données</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950418" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>8
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P33">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950419" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T26">10.6. Données personnelles</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950419" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>8
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P32">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950420" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T27">Article 11 : Conflit d&apos;intérêts</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950420" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>8
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P32">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950421" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T27">Article 12 : Litiges</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950421" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>8
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P32">
                        <text:a xlink:type="simple" xlink:href="#_Toc162950422" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T26">Annexes</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162950422" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T26"><text:tab/>9
                                </text:span>
                            </text:span>
                        </text:a>
                    </text:p>
                </text:index-body>
            </text:table-of-content>
            <text:h text:style-name="P75" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162950394"/>
                <text:bookmark-start text:name="_Toc162605987"/>
                <text:bookmark-start text:name="_Toc162604406"/>
                <text:bookmark-start text:name="_Toc162603181"/>
                <text:bookmark-start text:name="_Toc162530243"/>Préambule
                <text:bookmark-end text:name="_Toc162950394"/>
                <text:bookmark-end text:name="_Toc162605987"/>
                <text:bookmark-end text:name="_Toc162604406"/>
                <text:bookmark-end text:name="_Toc162603181"/>
                <text:bookmark-end text:name="_Toc162530243"/>
            </text:h>
            <text:p text:style-name="P11">L’Agence nationale de la cohésion des territoires (ANCT) conseille et soutien
                les collectivités territoriales et leurs groupements dans la conception, la définition et la mise en
                œuvre de leurs projets. En application de l’article L. 1231-2-V du Code général des collectivités
                territoriales, dans le domaine du numérique, l&apos;Agence a pour mission d&apos;impulser, d&apos;aider
                à concevoir et d&apos;accompagner les projets et les initiatives portés par l&apos;Etat, les
                collectivités territoriales et leurs groupements, les réseaux d&apos;entreprises et les associations. A
                ce titre, l&apos;ANCT favorise l&apos;accès de l&apos;ensemble de la population aux outils numériques et
                le développement des usages et des services numériques dans les territoires.
            </text:p>
            <text:p text:style-name="P38"/>
            <text:p text:style-name="P14">Contexte</text:p>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">Cinq ans après le lancement de la première Stratégie nationale pour
                        un numérique inclusif (SNN
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">I) et à l’issue d’une vaste concertation partenariale menée dans le
                        cadre du Conseil National de la Refondation numérique (CNR numérique), l’État, les collectivités
                        territoriales et les acteurs de la société civile ont souhaité réaffirmer leur engagement e
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">n faveur de l’inclusion numérique du plus grand nombre. Prenant la
                        suite de la SNNI,
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T4">la feuille de route France Numérique Ensemble (FNE) est structurée
                        autour de 4 axes et 16 engagements
                    </text:span>
                </text:span>
                <text:span text:style-name="Appel_20_note_20_de_20_bas_20_de_20_p.">
                    <text:span text:style-name="T4">
                        <text:note text:id="ftn1" text:note-class="footnote">
                            <text:note-citation>1</text:note-citation>
                            <text:note-body>
                                <text:p>
                                    <text:span text:style-name="Police_20_par_20_défaut">
                                        <text:span text:style-name="T16">
                                            <text:s/>
                                        </text:span>
                                    </text:span>
                                    <text:span text:style-name="Police_20_par_20_défaut">
                                        <text:span text:style-name="T17">La feuille de route France Numérique Ensemble
                                            est disponible sur l
                                        </text:span>
                                    </text:span>
                                    <text:span text:style-name="Police_20_par_20_défaut">
                                        <text:span text:style-name="T17">e site du Programme Société Numérique. Lien :
                                        </text:span>
                                    </text:span>
                                    <text:a xlink:type="simple"
                                            xlink:href="https://societenumerique.gouv.fr/documents/84/Feuille_route_23-27_-_engagements_mis_à_jour.pdf"
                                            office:target-frame-name="_top" xlink:show="replace"
                                            text:style-name="Internet_20_link"
                                            text:visited-style-name="Visited_20_Internet_20_Link">
                                        <text:span text:style-name="Lien_20_hypertexte">
                                            <text:span text:style-name="T17">https://societenumerique.gouv.fr/document
                                            </text:span>
                                        </text:span>
                                    </text:a>
                                    <text:a xlink:type="simple"
                                            xlink:href="https://societenumerique.gouv.fr/documents/84/Feuille_route_23-27_-_engagements_mis_à_jour.pdf"
                                            office:target-frame-name="_top" xlink:show="replace"
                                            text:style-name="Internet_20_link"
                                            text:visited-style-name="Visited_20_Internet_20_Link">
                                        <text:span text:style-name="Lien_20_hypertexte">
                                            <text:span text:style-name="T17">
                                                s/84/Feuille_route_23-27_-_engagements_mis_%C3%A0_jour.pdf
                                            </text:span>
                                        </text:span>
                                    </text:a>
                                    <text:span text:style-name="Police_20_par_20_défaut">
                                        <text:span text:style-name="T17">.</text:span>
                                    </text:span>
                                </text:p>
                            </text:note-body>
                        </text:note>
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">. Elle doit permettre, d’ici à 2027, d’atteindre les objectifs
                        suivants : 8 millions de personnes accompagnées, 25 000 lieux d’inclusion numérique, 20 000
                        aidants numériques formés et 2 millions d
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">’équipements informatiques reconditionnés accessibles aux ménages
                        les plus modestes, en complément des objectifs fixés dans le cadre de la politique prioritaire
                        du Gouvernement « Devenir la première puissance numérique européenne » et de son chantier « Favoriser l’inclusion numérique pour tous par la formation et les
                        conseillers numériques ».
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">Le Programme Société Numérique de l’ANCT, chargé de mettre en œuvre
                        cette feuille de route France Numérique Ensemble, entend ainsi mener des actions pour
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T5"></text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">renforcer les</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">acteurs territoriaux de la politique d’inclusion numérique.
                        L’Instruction du Gouvernement relative à la territorialisation de la feuille de route France
                        Numérique Ensemble signée le 28/07/2023 détaille le calendrier qui permet la territorialisation
                        de la
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">politique publique d’inclusion numérique. Ainsi, dans 80
                        départements, au moins une collectivité s’est déclarée volontaire pour co-porter une gouvernance
                        locale auprès de l’Etat. Cette gouvernance locale est constituée des différents acteurs
                        concernés par
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">l’inclusion numérique.</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P12">Afin de renforcer leur rôle dans le cadre de France Numérique Ensemble, et
                pérenniser l’action de la médiation numérique, une enveloppe de 5 millions d’euros est dédiée aux
                gouvernances locales pour financer des projets d&apos;élaboration ou de mise en œuvre de feuilles de
                route territoriales.
                <text:s/>
            </text:p>
            <text:p text:style-name="P26">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">Les enveloppes dont les montants varient selon le département sont
                        indexées sur 5 critères que sont : le taux de chômage, le taux de pauvreté, la part des
                        habitants peu ou pas diplômés, la démographie, et la part des +65 ans.<text:s/>Le montant exact auquel chaque
                        gouvernance peut prétendre a été communiqué aux départements et aux régions en mars 2024.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P31">Par ailleurs, la formation des professionnels de la médiation numérique, à la
                fois aidants et médiateurs numérique, est un enjeu majeur de la feuille de route France Numérique
                Ensemble. C’est pourquoi 1,2 millions d’euros sont répartis au sein des gouvernances locales pour
                proposer des formations Aidants Connect aux professionnels hors conseillers numériques et salariés de
                structures adhérentes à l’OPCO Uniformation.
            </text:p>
            <text:p text:style-name="P31">Les besoins des gouvernances locales en ingénierie de projet et en formation
                des professionnels de la médiation numérique ont été transmis à l’ANCT par le biais des
                préfectures de département via leur espace France Numérique Ensemble, après
                concertation des acteurs au niveau local. Pour bénéficier de ce dispositif, le bénéficiaire a eu
                connaissance du cahier des charges via cet espace France Numérique Ensemble (annexes 1 et 2).
            </text:p>
            <text:p text:style-name="P13"/>
            <text:h text:style-name="P70" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162950395"/>
                <text:bookmark-start text:name="_Toc162605988"/>
                <text:bookmark-start text:name="_Toc162604407"/>
                <text:bookmark-start text:name="_Toc162603182"/>
                <text:bookmark-start text:name="_Toc162530244"/>Article 1 : Objet de la convention
                <text:bookmark-end text:name="_Toc162950395"/>
                <text:bookmark-end text:name="_Toc162605988"/>
                <text:bookmark-end text:name="_Toc162604407"/>
                <text:bookmark-end text:name="_Toc162603182"/>
                <text:bookmark-end text:name="_Toc162530244"/>
            </text:h>
            <text:p>L’objet de la présente convention est l&apos;octroi par l’ANCT d&apos;une subvention destinée au
                bénéficiaire pour permettre le financement de 62 formations au dispositif Aidants Connect pour les
                professionnels du territoire.
            </text:p>
            <text:p text:style-name="P58">.</text:p>
            <text:h text:style-name="P70" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162950396"/>
                <text:bookmark-start text:name="_Toc162605989"/>
                <text:bookmark-start text:name="_Toc162604408"/>
                <text:bookmark-start text:name="_Toc162603183"/>
                <text:bookmark-start text:name="_Toc162530245"/>Article 2 : Description du projet de la gouvernance
                <text:bookmark-end text:name="_Toc162950396"/>
                <text:bookmark-end text:name="_Toc162605989"/>
                <text:bookmark-end text:name="_Toc162604408"/>
                <text:bookmark-end text:name="_Toc162603183"/>
                <text:bookmark-end text:name="_Toc162530245"/>
            </text:h>
            <text:h text:style-name="P68" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162605993"/>
                <text:bookmark-start text:name="_Toc162604412"/>
                <text:bookmark-start text:name="_Toc162603186"/>
                <text:bookmark-start text:name="_Toc162530248"/>
                <text:bookmark-start text:name="_Toc162950397"/>Article 2.1: la formation des agents publics à Aidant
                Connect
                <text:bookmark-end text:name="_Toc162950397"/>
            </text:h>
            <text:p text:style-name="Normal">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T16">Le Bénéficiaire s’est positionné comme tiers financeur sur son
                        territoire pour 62 formations à Aidants Connect (hors conseillers numériques et salariés des
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T16">branches de l’OPCO Uniformation). La subvention dédiée s’élève à 20
                        000 euros.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P16">Le bénéficiaire peut financer les formations à Aidants Connect des
                professionnels de sa structure. Toutefois, il doit aussi permettre le financement de formation de
                professionnels d’autres structures de son territoire, dans la limite de 62 formations (à hauteur de 322
                euros par agent, soit le coût d’une formation Aidants Connect de 7 heures).
            </text:p>
            <text:p text:style-name="P3"/>
            <text:h text:style-name="P71" text:outline-level="2"><text:bookmark-start text:name="_Toc162950398"/>Article
                3 : Durée de la convention
                <text:bookmark-end text:name="_Toc162605993"/>
                <text:bookmark-end text:name="_Toc162604412"/>
                <text:bookmark-end text:name="_Toc162603186"/>
                <text:bookmark-end text:name="_Toc162530248"/>
                <text:bookmark-end text:name="_Toc162950398"/>
            </text:h>
            <text:p text:style-name="P20">La présente convention prend effet à la date de sa signature par les parties
                et s’étend jusqu’à la réalisation et la validation des livrables attendus pour l’évaluation de la
                dépense des fonds mentionnés à l’article 5.2 de la présente convention.
            </text:p>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T18">Durant cette période, le bénéficia</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T18">ire s’engage à notifier tout retard pris dans l’exécution, toute
                        modification des conditions d’exécution, de ses statuts ou de ses coordonnées bancaires.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P41"/>
            <text:h text:style-name="P72" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162950399"/>
                <text:bookmark-start text:name="_Toc162605994"/>
                <text:bookmark-start text:name="_Toc162604413"/>
                <text:bookmark-start text:name="_Toc162603187"/>
                <text:bookmark-start text:name="_Toc162530249"/>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T29">Article 4 : Modalités du financement</text:span>
                </text:span>
                <text:bookmark-end text:name="_Toc162950399"/>
                <text:bookmark-end text:name="_Toc162605994"/>
                <text:bookmark-end text:name="_Toc162604413"/>
                <text:bookmark-end text:name="_Toc162603187"/>
                <text:bookmark-end text:name="_Toc162530249"/>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T29"></text:span>
                </text:span>
            </text:h>
            <text:h text:style-name="P68" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162950400"/>
                <text:bookmark-start text:name="_Toc162605995"/>
                <text:bookmark-start text:name="_Toc162604414"/>
                <text:bookmark-start text:name="_Toc162603188"/>
                <text:bookmark-start text:name="_Toc162530250"/>
                <text:bookmark text:name="_Toc144976519"/>
                <text:bookmark text:name="_Toc144736307"/>
                <text:bookmark text:name="_Toc144713429"/>
                <text:bookmark text:name="_Toc141446328"/>
                <text:bookmark text:name="_Toc128583435"/>
                <text:bookmark text:name="_Toc128580827"/>
                <text:bookmark text:name="_Toc128580785"/>
                <text:bookmark text:name="_Toc128579795"/>
                <text:bookmark text:name="_Toc128579652"/>
                <text:bookmark text:name="_Toc128578891"/>
                <text:bookmark text:name="_Toc127542398"/>
                <text:bookmark text:name="_Toc127540840"/>
                <text:bookmark text:name="_Toc127540540"/>
                <text:bookmark text:name="_Toc127540499"/>
                <text:bookmark text:name="_Toc144976518"/>
                <text:bookmark text:name="_Toc144736306"/>
                <text:bookmark text:name="_Toc144713428"/>
                <text:bookmark text:name="_Toc141446327"/>
                <text:bookmark text:name="_Toc128583434"/>
                <text:bookmark text:name="_Toc128580826"/>
                <text:bookmark text:name="_Toc128580784"/>
                <text:bookmark text:name="_Toc128579794"/>
                <text:bookmark text:name="_Toc128579651"/>
                <text:bookmark text:name="_Toc128578890"/>
                <text:bookmark text:name="_Toc127542397"/>
                <text:bookmark text:name="_Toc127540839"/>
                <text:bookmark text:name="_Toc127540539"/>
                <text:bookmark text:name="_Toc127540498"/>
                <text:bookmark text:name="_Toc144976517"/>
                <text:bookmark text:name="_Toc144736305"/>
                <text:bookmark text:name="_Toc144713427"/>
                <text:bookmark text:name="_Toc141446326"/>
                <text:bookmark text:name="_Toc128583433"/>
                <text:bookmark text:name="_Toc128580825"/>
                <text:bookmark text:name="_Toc128580783"/>
                <text:bookmark text:name="_Toc128579793"/>
                <text:bookmark text:name="_Toc128579650"/>
                <text:bookmark text:name="_Toc128578889"/>
                <text:bookmark text:name="_Toc127542396"/>
                <text:bookmark text:name="_Toc127540838"/>
                <text:bookmark text:name="_Toc127540538"/>
                <text:bookmark text:name="_Toc127540497"/>
                <text:bookmark text:name="_Toc144976516"/>
                <text:bookmark text:name="_Toc144736304"/>
                <text:bookmark text:name="_Toc144713426"/>
                <text:bookmark text:name="_Toc141446325"/>
                <text:bookmark text:name="_Toc128583432"/>
                <text:bookmark text:name="_Toc128580824"/>
                <text:bookmark text:name="_Toc128580782"/>
                <text:bookmark text:name="_Toc128579792"/>
                <text:bookmark text:name="_Toc128579649"/>
                <text:bookmark text:name="_Toc128578888"/>
                <text:bookmark text:name="_Toc127542395"/>
                <text:bookmark text:name="_Toc127540837"/>
                <text:bookmark text:name="_Toc127540537"/>
                <text:bookmark text:name="_Toc127540496"/>
                <text:bookmark text:name="_Toc144976515"/>
                <text:bookmark text:name="_Toc144736303"/>
                <text:bookmark text:name="_Toc144713425"/>
                <text:bookmark text:name="_Toc141446324"/>
                <text:bookmark text:name="_Toc128583431"/>
                <text:bookmark text:name="_Toc128580823"/>
                <text:bookmark text:name="_Toc128580781"/>
                <text:bookmark text:name="_Toc128579791"/>
                <text:bookmark text:name="_Toc128579648"/>
                <text:bookmark text:name="_Toc128578887"/>
                <text:bookmark text:name="_Toc127542394"/>
                <text:bookmark text:name="_Toc127540836"/>
                <text:bookmark text:name="_Toc127540536"/>
                <text:bookmark text:name="_Toc127540495"/>4.1. Montant de la participation financière
                <text:bookmark-end text:name="_Toc162950400"/>
                <text:bookmark-end text:name="_Toc162605995"/>
                <text:bookmark-end text:name="_Toc162604414"/>
                <text:bookmark-end text:name="_Toc162603188"/>
                <text:bookmark-end text:name="_Toc162530250"/>
                <text:bookmark-start text:name="_Hlk127547269"/>
            </text:h>
            <text:h text:style-name="Heading_20_4" text:outline-level="4">
                <text:bookmark-end text:name="_Hlk127547269"/>
                <text:bookmark-start text:name="_Toc162950401"/>4. 1. 1. Formations Aidants Connect
                <text:bookmark-end text:name="_Toc162950401"/>
            </text:h>
            <text:p text:style-name="P40"/>
            <text:p text:style-name="P40">Au titre de l’exercice 2024, l’ANCT contribue financièrement aux formations
                pour un montant de vingt mille euros toutes taxes comprises (20 000€ TTC).
            </text:p>
            <text:p text:style-name="P40"/>
            <text:p text:style-name="P40">Ce financement doit permettre 62 formations à Aidants Connect de 7 heures, à
                hauteur de 322 euros par formation.
            </text:p>
            <text:p text:style-name="P40"/>
            <text:p text:style-name="P40">Des formations plus longues intégrant une brique Aidants Connect sont
                également disponibles et peuvent être choisies par les professionnels. Les frais complémentaires
                (au-delà de 322 euros) restent à la charge de leur structure employeuse.
            </text:p>
            <text:p text:style-name="P40"/>
            <text:p text:style-name="P40">L’ANCT se réserve le droit de réévaluer ce montant par la voie d’un avenant,
                notamment si le bénéficiaire n’est pas en mesure de justifier de l’emploi de la
                subvention conformément à la présente convention avant a fin de l’année 2024.
            </text:p>
            <text:h text:style-name="P68" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162950402"/>
                <text:bookmark-start text:name="_Toc162605998"/>
                <text:bookmark-start text:name="_Toc162604417"/>4.2. Versement et délai de paiement
                <text:bookmark-end text:name="_Toc162950402"/>
                <text:bookmark-end text:name="_Toc162605998"/>
                <text:bookmark-end text:name="_Toc162604417"/>
            </text:h>
            <text:p text:style-name="P59"/>
            <text:p text:style-name="P40">Le versement s’effectuera à compter de la signature de la convention.</text:p>
            <text:p text:style-name="P47">
                <text:s/>
            </text:p>
            <text:p text:style-name="P40">L’ANCT se réserve le droit de réclamer la restitution de tout ou partie de
                l’aide versée si le bénéficiaire justifie d’une exécution partiellement conforme à la présente
                convention.
            </text:p>
            <text:p text:style-name="P40"/>
            <text:p text:style-name="P45">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">Le bénéficiaire des fonds s’engage à fournir, dès la signature de
                        la convention, un avis SIRENE et un RIB en format PDF.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P40"/>
            <text:p text:style-name="P40">Le comptable assignataire est l’agent comptable de l’ANCT, nommé à cet effet
                par arrêté du Ministre de l’action et des comptes publics.
            </text:p>
            <text:p text:style-name="P40"/>
            <text:p text:style-name="P60"/>
            <text:p text:style-name="P39"/>
            <text:h text:style-name="P76" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162950403"/>
                <text:bookmark-start text:name="_Toc162605999"/>
                <text:bookmark-start text:name="_Toc162604418"/>
                <text:bookmark-start text:name="_Toc162603191"/>
                <text:bookmark-start text:name="_Toc162530253"/>Article 5 : Suivi de la réalisation du projet du
                bénéficiaire et son évaluation
                <text:bookmark-end text:name="_Toc162950403"/>
                <text:bookmark-end text:name="_Toc162605999"/>
                <text:bookmark-end text:name="_Toc162604418"/>
                <text:bookmark-end text:name="_Toc162603191"/>
                <text:bookmark-end text:name="_Toc162530253"/>
            </text:h>
            <text:h text:style-name="P68" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162950404"/>
                <text:bookmark-start text:name="_Toc162606000"/>
                <text:bookmark-start text:name="_Toc162604419"/>
                <text:bookmark-start text:name="_Toc162603192"/>
                <text:bookmark-start text:name="_Toc162530254"/>5.1. Suivi et animation collective
                <text:bookmark-end text:name="_Toc162950404"/>
                <text:bookmark-end text:name="_Toc162606000"/>
                <text:bookmark-end text:name="_Toc162604419"/>
                <text:bookmark-end text:name="_Toc162603192"/>
                <text:bookmark-end text:name="_Toc162530254"/>
            </text:h>
            <text:h text:style-name="P67" text:outline-level="4"><text:bookmark-start text:name="_Toc162950405"/>5. 1.
                2. Formations Aidants Connect
                <text:bookmark-end text:name="_Toc162950405"/>
            </text:h>
            <text:p text:style-name="P48">Le bénéficiaire flèchera les 62 formations à Aidants Connect à [XX].</text:p>
            <text:p text:style-name="P48">Le bénéficiaire devra informer la préfecture de département de la bonne mise
                en œuvre de sa stratégie de déploiement des formations.
            </text:p>
            <text:p text:style-name="P48">Il participera aux webinaires animés par l’ANCT pour les accompagner sur ce
                déploiement.
            </text:p>
            <text:h text:style-name="P68" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162950406"/>
                <text:bookmark-start text:name="_Toc162606003"/>
                <text:bookmark-start text:name="_Toc162604422"/>
                <text:bookmark-start text:name="_Toc162603195"/>
                <text:bookmark-start text:name="_Toc162530257"/>5.2. Evaluation de la dépense des fonds
                <text:bookmark-end text:name="_Toc162950406"/>
                <text:bookmark-end text:name="_Toc162606003"/>
                <text:bookmark-end text:name="_Toc162604422"/>
                <text:bookmark-end text:name="_Toc162603195"/>
                <text:bookmark-end text:name="_Toc162530257"/>
            </text:h>
            <text:p text:style-name="P49">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">A l’achèvement du projet et au plus tard à N+1 de la date de
                        signature de la présente convention, est établi par le
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T19">bénéficiaire</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">et transmis à l’ANCT :</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P49"/>
            <text:list xml:id="list1595215052531255689" text:style-name="L1">
                <text:list-item>
                    <text:p text:style-name="P80">Une attestation de fin de formation pour chaque professionnel formé à
                        Aidants Connect via la subvention dédiée de la présente convention.
                    </text:p>
                </text:list-item>
            </text:list>
            <text:p text:style-name="P54"/>
            <text:p text:style-name="P51">Ce document devra attester de la conformité des dépenses effectuées à l&apos;objet
                de la subvention.
            </text:p>
            <text:p text:style-name="P53"/>
            <text:p text:style-name="P45">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T18">L’ANCT pourra</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">réclamer la restitution de tout ou partie de l’aide versée si le
                        bénéficiaire n’est pas en mesure
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">de justifier d’une exécution conforme à la présente convention.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P53"/>
            <text:p text:style-name="P51">Les pièces justificatives des dépenses et le bilan du projet, ainsi que toute
                correspondance relative à l’exécution de la convention, seront également transmis par le bénéficiaire à
                sa préfecture départementale de rattachement.
            </text:p>
            <text:p text:style-name="P51"/>
            <text:p text:style-name="P39"/>
            <text:h text:style-name="P69" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162950407"/>
                <text:bookmark-start text:name="_Toc162606004"/>
                <text:bookmark-start text:name="_Toc162604423"/>
                <text:bookmark-start text:name="_Toc162603196"/>
                <text:bookmark-start text:name="_Toc162530258"/>Article 6 : Communication et propriété intellectuelle
                <text:bookmark-end text:name="_Toc162950407"/>
                <text:bookmark-end text:name="_Toc162606004"/>
                <text:bookmark-end text:name="_Toc162604423"/>
                <text:bookmark-end text:name="_Toc162603196"/>
                <text:bookmark-end text:name="_Toc162530258"/>
            </text:h>
            <text:p text:style-name="P39">Les financements accordés doivent être portés obligatoirement à la
                connaissance des bénéficiaires et du grand public.
            </text:p>
            <text:p text:style-name="P39"/>
            <text:p text:style-name="P55">Tous les documents de promotion et de communication en lien avec les projets
                portés dans le cadre de cet appel à candidatures doivent porter les logotypes de l’ANCT et France
                Numérique Ensemble (affiches, flyers, programmes, site internet...) et la mention &quot;avec le
                soutien de l’ANCT&quot; pour les diverses publications, dossiers de presse,
                communiqués de presse, documents audiovisuels.
            </text:p>
            <text:p text:style-name="P39"/>
            <text:p text:style-name="P9">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">Aux seules fins d’exécution des obligations visées par la présente
                        convention, l’ANCT autorise le Bénéficiaire :
                    </text:span>
                </text:span>
            </text:p>
            <text:list xml:id="list1319551738266012543" text:style-name="L2">
                <text:list-item>
                    <text:p text:style-name="P78">
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T10">À utiliser son logo joint en annexe,</text:span>
                        </text:span>
                    </text:p>
                </text:list-item>
                <text:list-item>
                    <text:p text:style-name="P78">
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T10">À faire mention</text:span>
                        </text:span>
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T10">de la contribution de l’ANCT sous une forme qui aura reçu
                                son accord préalable et écrit.
                            </text:span>
                        </text:span>
                    </text:p>
                </text:list-item>
            </text:list>
            <text:p text:style-name="P42"/>
            <text:p text:style-name="P46">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">De</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">manière générale, chacune des parties à la présente convention
                        s’engage dans l’ensemble de ses actions de communication, d’information et de promotion à ne pas
                        por
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">ter atteinte à l’image ou à la renommée de son cocontractant.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P39"/>
            <text:p text:style-name="P39">En outre, chacune des parties s’engage à informer son cocontractant de tout
                projet d’action promotionnelle.
            </text:p>
            <text:p text:style-name="P39"/>
            <text:p text:style-name="P46">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">Toute utilisation, représentation ou reproduction des signes
                        distinctifs de l’ANCT e
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">t du</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T19">bénéficiaire</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">, par l’une des Parties, non prévue par le présent article, est
                        interdite.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P39"/>
            <text:p text:style-name="P46">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">A l’extinction des obligations visées par l’article 2 de la convention,
                        le Bénéficiaire s’engage à cesser tout usage des signes distinctifs de l’ANCT sauf accord exprès écrit contraire.</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P43"/>
            <text:p text:style-name="P43"/>
            <text:p text:style-name="P46">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T20">Etant donné le rôle de l’ANCT dans la mise en œuvre de la politique
                        publique de l’inclusion numérique et de la feuille de route FNE, le Bénéficiaire l’autorise
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T16">à utiliser, reproduire, représenter et diffuser les communications,
                        documents et autres livrables que le bénéficiaire réalise dans le
                        cadre de cette convention.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P43"/>
            <text:h text:style-name="P69" text:outline-level="2">
                <text:bookmark-start text:name="_Hlk120095132"/>
                <text:bookmark-start text:name="_Toc162950408"/>
                <text:bookmark-start text:name="_Toc162606005"/>
                <text:bookmark-start text:name="_Toc162604424"/>
                <text:bookmark-start text:name="_Toc162603197"/>
                <text:bookmark-start text:name="_Toc162530259"/>Article 7 : Respect du Contrat d’engagement républicain
                par les associations et les fondations
                <text:bookmark-end text:name="_Toc162950408"/>
                <text:bookmark-end text:name="_Toc162606005"/>
                <text:bookmark-end text:name="_Toc162604424"/>
                <text:bookmark-end text:name="_Toc162603197"/>
                <text:bookmark-end text:name="_Toc162530259"/>
            </text:h>
            <text:p text:style-name="P61">Le Bénéficiaire de la subvention publique représentant une association ou une
                fondation, s’engage à respecter le contrat d’engagement républicain prévu à l’article 10-1 de la loi du
                12 avril 2000 relative aux droits des citoyens dans leurs relations avec les administrations notamment :
            </text:p>
            <text:list xml:id="list7962596441673931003" text:style-name="L3">
                <text:list-item>
                    <text:p text:style-name="P85">
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T10">À</text:span>
                        </text:span>
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T9">respecter les principes d</text:span>
                        </text:span>
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T9">e liberté, d&apos;égalité, de fraternité et de dignité de la
                                personne humaine, ainsi que les symboles de la République au sens de l&apos;article 2 de
                                la Constitution ;
                            </text:span>
                        </text:span>
                    </text:p>
                </text:list-item>
                <text:list-item>
                    <text:p text:style-name="P85">
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T10">À</text:span>
                        </text:span>
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T9">ne pas remettre en cause le caractère laïque de la
                                République ;
                            </text:span>
                        </text:span>
                    </text:p>
                </text:list-item>
                <text:list-item>
                    <text:p text:style-name="P85">
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T10">À</text:span>
                        </text:span>
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T9">s&apos;abstenir de toute action portant atteinte à l&apos;ordre public.</text:span>
                        </text:span>
                    </text:p>
                </text:list-item>
            </text:list>
            <text:p text:style-name="P61">L’association ou la fondation informe ses membres par tout moyen (affichage
                dans ses locaux, mise en ligne sur son site internet, etc…) des engagements inscrits dans le contrat
                d’engagement républicain.  Elle veille à ce qu’ils soient respectés par ses dirigeants, ses salariés,
                ses membres et ses bénévoles.
            </text:p>
            <text:p text:style-name="P61">Tout constat d’un manquement commis par l’une ou l’autre de ces personnes
                conduira au reversement de la subvention au prorata de la période restant à courir.
                <text:bookmark-end text:name="_Hlk120095132"/>
            </text:p>
            <text:p text:style-name="P43"/>
            <text:h text:style-name="P69" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162950409"/>
                <text:bookmark-start text:name="_Toc162606006"/>
                <text:bookmark-start text:name="_Toc162604425"/>
                <text:bookmark-start text:name="_Toc162603198"/>
                <text:bookmark-start text:name="_Toc162530260"/>Article 8 : Résiliation
                <text:bookmark-end text:name="_Toc162950409"/>
                <text:bookmark-end text:name="_Toc162606006"/>
                <text:bookmark-end text:name="_Toc162604425"/>
                <text:bookmark-end text:name="_Toc162603198"/>
                <text:bookmark-end text:name="_Toc162530260"/>
            </text:h>
            <text:h text:style-name="P68" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162950410"/>
                <text:bookmark-start text:name="_Toc162606007"/>
                <text:bookmark-start text:name="_Toc162604426"/>
                <text:bookmark-start text:name="_Toc162603199"/>
                <text:bookmark-start text:name="_Toc162530261"/>8.1. Résiliation pour faute
                <text:bookmark-end text:name="_Toc162950410"/>
                <text:bookmark-end text:name="_Toc162606007"/>
                <text:bookmark-end text:name="_Toc162604426"/>
                <text:bookmark-end text:name="_Toc162603199"/>
                <text:bookmark-end text:name="_Toc162530261"/>
                <text:s/>
            </text:h>
            <text:p text:style-name="P13">La convention sera résiliée de plein droit en cas de manquement, de mauvaise
                exécution ou d’inexécution, par l’une ou l’autre des parties, de ses obligations contractuelles, et
                notamment dans l’hypothèse où les sommes versées par l’ANCT au titre de la
                convention étaient utilisées à des fins non conformes aux objectifs définis par les présentes.
            </text:p>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">La Partie plaignante devra préalablement envoyer à l’autre Partie
                        une mise en demeure par lettre recommandée avec accusé de réception. Si à l’issue d’un délai de trente (30) jours
                        calendaires à compter de son envoi, la mise en demeure est restée infructueuse ou que la Partie
                        n’a pas pu remédier au manquement pendant ce même délai, la convention est résiliée par lettre
                        recommandée avec accusé de réception.</text:span>
                </text:span>
            </text:p>
            <text:h text:style-name="P68" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162950411"/>
                <text:bookmark-start text:name="_Toc162606008"/>
                <text:bookmark-start text:name="_Toc162604427"/>
                <text:bookmark-start text:name="_Toc162603200"/>
                <text:bookmark-start text:name="_Toc162530262"/>8.2.<text:s/>Effets de la résiliation
                <text:bookmark-end text:name="_Toc162950411"/>
                <text:bookmark-end text:name="_Toc162606008"/>
                <text:bookmark-end text:name="_Toc162604427"/>
                <text:bookmark-end text:name="_Toc162603200"/>
                <text:bookmark-end text:name="_Toc162530262"/>
            </text:h>
            <text:p>
                <text:bookmark-start text:name="_Hlk127440961"/>
                <text:bookmark-start text:name="_Hlk127441007"/>En cas de résiliation anticipée de la convention, dans
                les cas prévus ci-dessus, la participation financière de l’ANCT est liquidée en fonction des dépenses
                effectivement réalisés et justifiées par le Bénéficiaire à la date d’effet de la résiliation.
            </text:p>
            <text:p/>
            <text:p>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T30">Le cas échéant, le</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T31">bénéficiaire</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T30">sera tenu au reversement des sommes indûment perçues.</text:span>
                </text:span>
            </text:p>
            <text:p/>
            <text:p>Aucune indemnité ne pourra être demandée du fait de cette résiliation.</text:p>
            <text:p/>
            <text:h text:style-name="Heading_20_2" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162950412"/>
                <text:bookmark-start text:name="_Toc162606009"/>
                <text:bookmark-start text:name="_Toc162604428"/>
                <text:bookmark-start text:name="_Toc162603201"/>
                <text:bookmark-start text:name="_Toc162530263"/>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T29">Article 9 : Force majeure</text:span>
                </text:span>
                <text:bookmark-end text:name="_Hlk127440961"/>
                <text:bookmark-end text:name="_Hlk127441007"/>
                <text:bookmark-end text:name="_Toc162950412"/>
                <text:bookmark-end text:name="_Toc162606009"/>
                <text:bookmark-end text:name="_Toc162604428"/>
                <text:bookmark-end text:name="_Toc162603201"/>
                <text:bookmark-end text:name="_Toc162530263"/>
            </text:h>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T16">Les Parties</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T16">conviennent qu’en cas de force majeure tel que défini par l’article
                        1218 du Code civil, les obligations contractuelles seront suspendues à compter de la
                        notification et de la preuve du cas de force majeure par la Partie qui le subit.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P8">
                
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T16">Les obligations suspendues seront exécutées à nouveau dès que les effets de l’événement
                        de force majeure auront cessé.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P17">Si la situation de force majeure se poursuit au-delà d’un délai d’un 1 mois,
                l’autre Partie pourra résilier de plein droit tout ou partie de la convention par lettre recommandée
                avec accusé de réception.
            </text:p>
            <text:p/>
            <text:h text:style-name="P69" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162950413"/>
                <text:bookmark-start text:name="_Toc162606010"/>
                <text:bookmark-start text:name="_Toc162604429"/>
                <text:bookmark-start text:name="_Toc162603202"/>
                <text:bookmark-start text:name="_Toc162530264"/>Article 10 : Dispositions générales
                <text:bookmark-end text:name="_Toc162950413"/>
                <text:bookmark-end text:name="_Toc162606010"/>
                <text:bookmark-end text:name="_Toc162604429"/>
                <text:bookmark-end text:name="_Toc162603202"/>
                <text:bookmark-end text:name="_Toc162530264"/>
            </text:h>
            <text:h text:style-name="P68" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162950414"/>
                <text:bookmark-start text:name="_Toc162606011"/>
                <text:bookmark-start text:name="_Toc162604430"/>
                <text:bookmark-start text:name="_Toc162603203"/>
                <text:bookmark-start text:name="_Toc162530265"/>10.1. Modification de la convention
                <text:bookmark-end text:name="_Toc162950414"/>
                <text:bookmark-end text:name="_Toc162606011"/>
                <text:bookmark-end text:name="_Toc162604430"/>
                <text:bookmark-end text:name="_Toc162603203"/>
                <text:bookmark-end text:name="_Toc162530265"/>
            </text:h>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">Aucun document postérieur, ni aucune modification de la convention,
                        quelle qu’en soit la forme, ne produiront d’effet entre les parties
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">sans prendre la forme d’un avenant dûment daté et signé entre
                        elles.
                    </text:span>
                </text:span>
            </text:p>
            <text:h text:style-name="P68" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162950415"/>
                <text:bookmark-start text:name="_Toc162606012"/>
                <text:bookmark-start text:name="_Toc162604431"/>
                <text:bookmark-start text:name="_Toc162603204"/>
                <text:bookmark-start text:name="_Toc162530266"/>10.2. Nullité
                <text:bookmark-end text:name="_Toc162950415"/>
                <text:bookmark-end text:name="_Toc162606012"/>
                <text:bookmark-end text:name="_Toc162604431"/>
                <text:bookmark-end text:name="_Toc162603204"/>
                <text:bookmark-end text:name="_Toc162530266"/>
            </text:h>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">Si l’une quelconque des stipulations de la présente convention
                        s’avérait nulle au regard d’une règle de droit en vigueur ou d’une décision administrative ou
                        judiciaire devenue définitive, elle serait alors réputée non écrite, sans pour
                        autant entraîner la nullité de la convention, ni altérer la validité des autres stipulations.
                    </text:span>
                </text:span>
            </text:p>
            <text:h text:style-name="P68" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162950416"/>
                <text:bookmark-start text:name="_Toc162606013"/>
                <text:bookmark-start text:name="_Toc162604432"/>
                <text:bookmark-start text:name="_Toc162603205"/>
                <text:bookmark-start text:name="_Toc162530267"/>10.3. Renonciation
                <text:bookmark-end text:name="_Toc162950416"/>
                <text:bookmark-end text:name="_Toc162606013"/>
                <text:bookmark-end text:name="_Toc162604432"/>
                <text:bookmark-end text:name="_Toc162603205"/>
                <text:bookmark-end text:name="_Toc162530267"/>
            </text:h>
            <text:p text:style-name="P13">Le fait que l’une ou l’autre des parties ne revendique pas l’application d’une
                clause quelconque de la convention ou acquiesce à son inexécution, que ce soit de manière temporaire ou
                définitive, ne pourra être interprété comme une renonciation par cette partie aux droits qui découlent
                pour elle de ladite clause.
            </text:p>
            <text:h text:style-name="P68" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162950417"/>
                <text:bookmark-start text:name="_Toc162606014"/>
                <text:bookmark-start text:name="_Toc162604433"/>
                <text:bookmark-start text:name="_Toc162603206"/>
                <text:bookmark-start text:name="_Toc162530268"/>10.4. Cession et transmission de la convention
                <text:bookmark-end text:name="_Toc162950417"/>
                <text:bookmark-end text:name="_Toc162606014"/>
                <text:bookmark-end text:name="_Toc162604433"/>
                <text:bookmark-end text:name="_Toc162603206"/>
                <text:bookmark-end text:name="_Toc162530268"/>
            </text:h>
            <text:p>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T30">La présente convention étant conclu</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T32">intuitu personæ</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T30">, le</text:span>
                </text:span>
                <text:bookmark-start text:name="_Hlk161321318"/>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T31">bénéficiaire</text:span>
                </text:span>
                <text:bookmark-end text:name="_Hlk161321318"/>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T30">ne pourra transférer ou céder, de quelque manière que ce soit les
                        droits et obligations en résultant, sans l’accord exprès, préalable et écrit respectif de
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T30">l’ANCT.</text:span>
                </text:span>
            </text:p>
            <text:h text:style-name="P68" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162950418"/>
                <text:bookmark-start text:name="_Toc162606015"/>
                <text:bookmark-start text:name="_Toc162604434"/>
                <text:bookmark-start text:name="_Toc162603207"/>
                <text:bookmark-start text:name="_Toc162530269"/>10.5. Publication des données
                <text:bookmark-end text:name="_Toc162950418"/>
                <text:bookmark-end text:name="_Toc162606015"/>
                <text:bookmark-end text:name="_Toc162604434"/>
                <text:bookmark-end text:name="_Toc162603207"/>
                <text:bookmark-end text:name="_Toc162530269"/>
            </text:h>
            <text:p text:style-name="P11">Les données essentielles relatives aux conditions de la subvention de la
                présente convention seront publiées par l’ANCT sur le site Internet data.gouv.fr.
            </text:p>
            <text:h text:style-name="P68" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162950419"/>
                <text:bookmark-start text:name="_Toc162606016"/>
                <text:bookmark-start text:name="_Toc162604435"/>
                <text:bookmark-start text:name="_Toc162603208"/>
                <text:bookmark-start text:name="_Toc162530270"/>10.6. Données personnelles
                <text:bookmark-end text:name="_Toc162950419"/>
                <text:bookmark-end text:name="_Toc162606016"/>
                <text:bookmark-end text:name="_Toc162604435"/>
                <text:bookmark-end text:name="_Toc162603208"/>
                <text:bookmark-end text:name="_Toc162530270"/>
            </text:h>
            <text:p text:style-name="P10">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">Dans le cadre de la présente convention, les parties s’engagent à respecter la réglementation en
                        vigueur applicable au traitement de données à caractère personnel et en particulier, le
                        règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 entré en vigueur le
                        25 mai 2
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">018.</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">Les Parties s’engagent à utiliser les données recueillies pour les
                        seuls besoins de l’exécution de la convention ainsi qu’à respecter et à faire respecter par les
                        personnes auxquelles seront confiés le traitement d’informations à caractère personnel d
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">es participants, les dispositions législatives et réglementaires
                        relatives à l’informatique, aux fichiers et aux libertés.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P65"/>
            <text:h text:style-name="P69" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162950420"/>
                <text:bookmark-start text:name="_Toc162606017"/>
                <text:bookmark-start text:name="_Toc162604436"/>
                <text:bookmark-start text:name="_Toc162603209"/>
                <text:bookmark-start text:name="_Toc162530271"/>Article 11 : Conflit d&apos;intérêts
                <text:bookmark-end text:name="_Toc162950420"/>
                <text:bookmark-end text:name="_Toc162606017"/>
                <text:bookmark-end text:name="_Toc162604436"/>
                <text:bookmark-end text:name="_Toc162603209"/>
                <text:bookmark-end text:name="_Toc162530271"/>
            </text:h>
            <text:p text:style-name="P66">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">Le bénéficiaire doit mettre en œuvre toutes les mesures nécessaires
                        pour éviter une situation de conflit d’intérêts où l&apos;exécution impartiale et objective de la
                        présente convention est ou parait compromise pour des raisons mettant en jeu l&apos;intérêt
                        économique, l&apos;affinité politique ou nationale, les liens familiaux ou affectifs ou tout
                        autre intérêt part
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">agé avec une autre personne.</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P66">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">Si un conflit d&apos;intérêts survient pendant l&apos;exécution de
                        la présente convention, le bénéficiaire doit immédiatement prendre toutes les mesures
                        nécessaires pour le résoudre et prévenir l’ANCT.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P66">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">L’ANCT se réserve le droit de vérifier que les mesures prises sont appropriées et peut exiger que des
                        mesures supplémentaires soient prises si nécessaire.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P13"/>
            <text:h text:style-name="P69" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162950421"/>
                <text:bookmark-start text:name="_Toc162606018"/>
                <text:bookmark-start text:name="_Toc162604437"/>
                <text:bookmark-start text:name="_Toc162603210"/>
                <text:bookmark-start text:name="_Toc162530272"/>Article 12 : Litiges
                <text:bookmark-end text:name="_Toc162950421"/>
                <text:bookmark-end text:name="_Toc162606018"/>
                <text:bookmark-end text:name="_Toc162604437"/>
                <text:bookmark-end text:name="_Toc162603210"/>
                <text:bookmark-end text:name="_Toc162530272"/>
            </text:h>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">La présente convention est régie par le droit français.</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P8">
                
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">En cas de contestation, litiges ou autres différends éventuels sur l’interprétation ou l’exécution de la présente
                        convention, les parties s’efforceront de parvenir à un règlement à l’amiable entre elles.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">A défaut, et préalablement à l’engagement de toute action
                        contentieuse et sous réserves des dispositions pri
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">ses au titre des articles précédents, les parties s’engagent à
                        recourir à la médiation en application des articles L 213-1 du Code de la justice administrative
                        du différend
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">qui les oppose et de saisir le président du Tribunal administratif
                        de Paris à l’effet d’organiser la mission de médiation et de désigner la ou les
                        personnes qui en seront chargées.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">En cas d’échec d’une solution amiable, tout litige ou contestation
                        auxquels la présente convention pourrait donner lieu tant sur sa validité que sur son interprétation, son exécution ou sa réalisation, sera soumis aux
                        tribunaux compétents.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P19"/>
            <text:p text:style-name="P52">Fait en deux exemplaires originaux,</text:p>
            <text:p text:style-name="P52"/>
            <text:p text:style-name="P50">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">Le ${dateAsDay(new Date())}</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P52"/>
            <text:p text:style-name="P52"/>
            <table:table table:name="Tableau1" table:style-name="Tableau1">
                <table:table-column table:style-name="Tableau1.A"/>
                <table:table-column table:style-name="Tableau1.B"/>
                <table:table-row table:style-name="Tableau1.1">
                    <table:table-cell table:style-name="Tableau1.A1" office:value-type="string">
                        <text:p text:style-name="P36">
                            <text:bookmark-start text:name="_Hlk149643635"/>
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T9">Pour ${nom}</text:span>
                            </text:span>
                        </text:p>
                        <text:p text:style-name="P44">NOM</text:p>
                        <text:p text:style-name="P36">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T21">FONCTION</text:span>
                            </text:span>
                        </text:p>
                    </table:table-cell>
                    <table:table-cell table:style-name="Tableau1.A1" office:value-type="string">
                        <text:p text:style-name="P37">Pour l’ANCT,</text:p>
                        <text:p text:style-name="P37">Stanislas BOURRON,</text:p>
                        <text:p text:style-name="P37">Directeur Général</text:p>
                        <text:p text:style-name="P37"/>
                        <text:p text:style-name="P37"/>
                    </table:table-cell>
                </table:table-row>
                <table:table-row table:style-name="Tableau1.2">
                    <table:table-cell table:style-name="Tableau1.A1" office:value-type="string">
                        <text:p text:style-name="P37"/>
                    </table:table-cell>
                    <table:table-cell table:style-name="Tableau1.A1" office:value-type="string">
                        <text:p text:style-name="P37">
                            <text:bookmark-end text:name="_Hlk149643635"/>
                        </text:p>
                    </table:table-cell>
                </table:table-row>
            </table:table>
            
            <text:p text:style-name="BREAK"/>
            <text:h text:style-name="P73" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162606019"/>
                <text:bookmark-start text:name="_Toc162604438"/>
                <text:bookmark-start text:name="_Toc162603211"/>
                <text:bookmark-start text:name="_Toc162530273"/>
            </text:h>
            <text:h text:style-name="P74" text:outline-level="2"/>
            <text:h text:style-name="P74" text:outline-level="2"><text:bookmark-start text:name="_Toc162950422"/>Annexes
                <text:bookmark-end text:name="_Toc162606019"/>
                <text:bookmark-end text:name="_Toc162604438"/>
                <text:bookmark-end text:name="_Toc162603211"/>
                <text:bookmark-end text:name="_Toc162530273"/>
                <text:bookmark-end text:name="_Toc162950422"/>
            </text:h>
            <text:p text:style-name="P21"/>
            <text:p text:style-name="Normal">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T5">Liste des annexes :</text:span>
                </text:span>
            </text:p>
            <text:list xml:id="list7308484361153802979" text:style-name="L4">
                <text:list-item>
                    <text:p text:style-name="P81">Cadrage du financement des formation Aidants Connect</text:p>
                </text:list-item>
                <text:list-item>
                    <text:p text:style-name="P84">
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T10">Logo de l’ANCT</text:span>
                        </text:span>
                    </text:p>
                </text:list-item>
                <text:list-item>
                    <text:p text:style-name="P81">Logo de FNE</text:p>
                </text:list-item>
            </text:list>
            <text:p text:style-name="P23"/>
            <text:p text:style-name="P23"/>
            <text:p text:style-name="P4">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T23">Annexe 1</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P4">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T24">Cadrage du financement des formations Aidants Connect</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P22"/>
            <text:p text:style-name="P15">Article 1 : Le dispositif Aidants Connect</text:p>
            <text:p text:style-name="P16">Aidants Connect est un service public numérique qui permet de sécuriser
                l’accompagnement des usagers dans leurs démarches administratives en ligne. Pour être habilité à Aidants
                Connect, un professionnel doit suivre une formation lui permettant d’acquérir les bases de connaissance
                nécessaires à l’utilisation de ce service.
            </text:p>
            <text:p text:style-name="Normal">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T15">Article 2 : La formation à Aidants Connect</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P16">Des modalités de financement des formations Aidants Connect existent déjà dans
                les cas de figure suivants :
            </text:p>
            <text:list xml:id="list436067278" text:style-name="L3">
                <text:list-item>
                    <text:p text:style-name="P82">Pour les conseillers numériques</text:p>
                </text:list-item>
            </text:list>
            <text:p text:style-name="P16">La formation est financée dans le cadre de la formation continue des
                conseillers numériques* et opérée par la Mednum.
            </text:p>
            <text:p text:style-name="P25">*Dans le cadre de la formation initiale, le dispositif inclut deux modules
                thématiques choisis par le conseiller numérique. Tous les conseillers numériques ayant suivi un parcours
                de formation initiale peuvent également suivre un module par an, financé par l’état.
            </text:p>
            <text:list xml:id="list1785289398" text:continue-numbering="true" text:style-name="L3">
                <text:list-item>
                    <text:p text:style-name="P83">
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T16"><text:s/>La structure demandeuse est adhérente à l’OPCO
                                Uniformation
                            </text:span>
                        </text:span>
                    </text:p>
                </text:list-item>
            </text:list>
            <text:p text:style-name="P16">La formation est financée dans le cadre d’un partenariat entre l’ANCT et
                Uniformation, et la formation peut être suivi auprès de l’organisme du choix de la structure.
            </text:p>
            <text:list xml:id="list1362736705" text:continue-numbering="true" text:style-name="L3">
                <text:list-item>
                    <text:p text:style-name="P82">La structure est déjà habilitée Aidants Connect</text:p>
                </text:list-item>
            </text:list>
            <text:p text:style-name="P16">En plus des 2 options ci-dessus, un employé habilité et utilisateur d’Aidants
                Connect d’une structure peut former son collègue si celui-ci a réalisé plus de 5 mandats (se rapprocher
                du référent Aidants Connect de votre structure pour bénéficier d’une formation entre pairs).
            </text:p>
            <text:p text:style-name="P23"/>
            <text:p text:style-name="BREAK"/>
            <text:p text:style-name="P4">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T23">Annexe 2</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P4">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T24">Logo ANCT</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P16"/>
            <text:p text:style-name="P18"/>
            <text:p text:style-name="P4">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T16">
                        <draw:frame draw:style-name="fr2" draw:name="Image 7" text:anchor-type="as-char" svg:y="0in"
                                    svg:width="6.3in" style:rel-width="scale" svg:height="2.378in"
                                    style:rel-height="scale" draw:z-index="0">
                            <draw:image xlink:href="Pictures/10000000000003200000012EED57178D.png" xlink:type="simple"
                                        xlink:show="embed" xlink:actuate="onLoad"/>
                        </draw:frame>
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P27">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T33">
                        <text:tab/>
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P23"/>
            <text:p text:style-name="P23">Annexe 3</text:p>
            <text:p text:style-name="P24">Logo France Numérique Ensemble</text:p>
            <text:p text:style-name="P24"/>
            <text:p text:style-name="P4">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T23">
                        <draw:frame draw:style-name="fr2" draw:name="Image 6" text:anchor-type="as-char" svg:y="0in"
                                    svg:width="5.2484in" style:rel-width="scale" svg:height="1.7445in"
                                    style:rel-height="scale" draw:z-index="0">
                            <draw:image xlink:href="Pictures/100000000000043800000167D46606F0.png" xlink:type="simple"
                                        xlink:show="embed" xlink:actuate="onLoad"/>
                        </draw:frame>
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P18"/>
            <text:p text:style-name="P18"/>
            <text:p text:style-name="P18"/>
            <text:p text:style-name="P18"/>
            <text:p text:style-name="P18"/>
            <text:p text:style-name="P18"/>
            <text:p text:style-name="P16"/>
        </office:text>
    </office:body>
</office:document-content>
`
