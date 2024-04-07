import { MembreBeneficiaireDataForConvention } from '@app/web/gouvernance/getMembreBeneficiaireDataForConvention'

export const convention202406Content = ({
  beneficiaireFormation,
  nom,
}: MembreBeneficiaireDataForConvention) => `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
                         xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0"
                         xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
                         xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0"
                         xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0"
                         xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0"
                         xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:dc="http://purl.org/dc/elements/1.1/"
                         xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0"
                         xmlns:number="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0"
                         xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0"
                         xmlns:chart="urn:oasis:names:tc:opendocument:xmlns:chart:1.0"
                         xmlns:dr3d="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0"
                         xmlns:math="http://www.w3.org/1998/Math/MathML"
                         xmlns:form="urn:oasis:names:tc:opendocument:xmlns:form:1.0"
                         xmlns:script="urn:oasis:names:tc:opendocument:xmlns:script:1.0"
                         xmlns:ooo="http://openoffice.org/2004/office" xmlns:ooow="http://openoffice.org/2004/writer"
                         xmlns:oooc="http://openoffice.org/2004/calc" xmlns:dom="http://www.w3.org/2001/xml-events"
                         xmlns:xforms="http://www.w3.org/2002/xforms" xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                         xmlns:rpt="http://openoffice.org/2005/report"
                         xmlns:of="urn:oasis:names:tc:opendocument:xmlns:of:1.2"
                         xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:grddl="http://www.w3.org/2003/g/data-view#"
                         xmlns:tableooo="http://openoffice.org/2009/table"
                         xmlns:textooo="http://openoffice.org/2013/office"
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
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" fo:background-color="#ffffff"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P17" style:family="paragraph" style:parent-style-name="Normal">
            <style:text-properties style:font-name="Arial" style:language-asian="fr" style:country-asian="FR"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P18" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" style:language-asian="fr" style:country-asian="FR"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P19" style:family="paragraph" style:parent-style-name="Normal">
            <style:text-properties style:font-name="Arial" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P20" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P21" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="center" style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P22" style:family="paragraph" style:parent-style-name="Normal">
            <style:text-properties style:font-name="Arial" fo:font-weight="bold" style:font-weight-asian="bold"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P23" style:family="paragraph" style:parent-style-name="Normal">
            <style:text-properties style:font-name="Arial" fo:font-size="14pt" fo:font-weight="bold"
                                   style:font-name-asian="Arial" style:font-size-asian="14pt"
                                   style:font-weight-asian="bold" style:font-name-complex="Arial"
                                   style:font-size-complex="14pt"/>
        </style:style>
        <style:style style:name="P24" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="center" style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" fo:font-size="14pt" fo:font-weight="bold"
                                   style:font-name-asian="Arial" style:font-size-asian="14pt"
                                   style:font-weight-asian="bold" style:font-name-complex="Arial"
                                   style:font-size-complex="14pt"/>
        </style:style>
        <style:style style:name="P25" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="center" style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" fo:font-size="14pt" style:text-underline-style="solid"
                                   style:text-underline-width="auto" style:text-underline-color="font-color"
                                   style:text-underline-mode="continuous" style:text-overline-mode="continuous"
                                   style:text-line-through-mode="continuous" style:font-name-asian="Arial"
                                   style:font-size-asian="14pt" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P26" style:family="paragraph" style:parent-style-name="Normal">
            <style:text-properties style:font-name="Arial" fo:font-style="italic" style:font-style-asian="italic"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P27" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:line-height="115%" fo:text-align="justify"
                                        style:justify-single-word="false"/>
        </style:style>
        <style:style style:name="P28" style:family="paragraph" style:parent-style-name="Normal">
            <style:text-properties fo:background-color="#00ffff" style:language-asian="fr" style:country-asian="FR"/>
        </style:style>
        <style:style style:name="P29" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties>
                <style:tab-stops>
                    <style:tab-stop style:position="2.528in"/>
                </style:tab-stops>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P30" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0.25in" fo:margin-bottom="0.1665in" fo:text-align="center"
                                        style:justify-single-word="false"/>
            <style:text-properties style:font-name="Helvetica" fo:font-size="16pt" fo:font-weight="bold"
                                   style:font-size-asian="16pt" style:font-weight-asian="bold"
                                   style:font-name-complex="Helvetica"/>
        </style:style>
        <style:style style:name="P31" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0.0835in" fo:margin-bottom="0.139in" fo:text-align="justify"
                                        style:justify-single-word="false"/>
        </style:style>
        <style:style style:name="P32" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"
                                        fo:background-color="#ffffff">
                <style:background-image/>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P33" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:line-height="115%" fo:text-align="justify" style:justify-single-word="false"
                                        fo:background-color="#ffffff">
                <style:background-image/>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P34" style:family="paragraph" style:parent-style-name="TM_20_2">
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
        <style:style style:name="P35" style:family="paragraph" style:parent-style-name="TM_20_2">
            <style:paragraph-properties>
                <style:tab-stops>
                    <style:tab-stop style:position="6.1402in" style:type="right" style:leader-style="dotted"
                                    style:leader-text="."/>
                </style:tab-stops>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P36" style:family="paragraph" style:parent-style-name="TM_20_3">
            <style:paragraph-properties>
                <style:tab-stops>
                    <style:tab-stop style:position="5.9874in" style:type="right" style:leader-style="dotted"
                                    style:leader-text="."/>
                </style:tab-stops>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P37" style:family="paragraph" style:parent-style-name="TM_20_4">
            <style:paragraph-properties>
                <style:tab-stops>
                    <style:tab-stop style:position="5.8346in" style:type="right" style:leader-style="dotted"
                                    style:leader-text="."/>
                </style:tab-stops>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P38" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in"/>
        </style:style>
        <style:style style:name="P39" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P40" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P41" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:orphans="0" fo:widows="0">
                <style:tab-stops>
                    <style:tab-stop style:position="3.1425in"/>
                </style:tab-stops>
            </style:paragraph-properties>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P42" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P43" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:orphans="0" fo:widows="0"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P44" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Times New Roman"
                                   style:language-asian="fr" style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P45" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" fo:background-color="#ff0000" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P46" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:orphans="0" fo:widows="0"/>
            <style:text-properties style:font-name="Arial" fo:background-color="#ff0000" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P47" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false">
                <style:tab-stops>
                    <style:tab-stop style:position="0.1972in"/>
                    <style:tab-stop style:position="4.7362in"/>
                </style:tab-stops>
            </style:paragraph-properties>
            <style:text-properties style:font-name="Arial" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P48" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:orphans="0" fo:widows="0">
                <style:tab-stops>
                    <style:tab-stop style:position="3.1425in"/>
                </style:tab-stops>
            </style:paragraph-properties>
            <style:text-properties style:font-name="Arial" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P49" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in"/>
            <style:text-properties style:font-name="Arial" fo:background-color="#ff00ff" style:font-name-asian="Arial"
                                   style:language-asian="fr" style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P50" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false"/>
        </style:style>
        <style:style style:name="P51" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:orphans="0" fo:widows="0"/>
        </style:style>
        <style:style style:name="P52" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:orphans="0" fo:widows="0">
                <style:tab-stops>
                    <style:tab-stop style:position="3.1425in"/>
                </style:tab-stops>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P53" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:orphans="0" fo:widows="0"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P54" style:family="paragraph" style:parent-style-name="docdata">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" fo:font-size="11pt" fo:background-color="#ff0000"
                                   style:font-name-asian="Calibri" style:font-size-asian="11pt"
                                   style:language-asian="en" style:country-asian="US" style:font-name-complex="Arial"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="P55" style:family="paragraph" style:parent-style-name="docdata">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" fo:font-size="11pt" fo:background-color="#ffffff"
                                   style:font-name-asian="Calibri" style:font-size-asian="11pt"
                                   style:language-asian="en" style:country-asian="US" style:font-name-complex="Arial"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="P56" style:family="paragraph" style:parent-style-name="docdata">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false"/>
        </style:style>
        <style:style style:name="P57" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:keep-with-next="always"/>
        </style:style>
        <style:style style:name="P58" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:keep-with-next="always">
                <style:tab-stops>
                    <style:tab-stop style:position="3.1425in"/>
                </style:tab-stops>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P59" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:keep-with-next="always"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P60" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:keep-with-next="always">
                <style:tab-stops>
                    <style:tab-stop style:position="3.1425in"/>
                </style:tab-stops>
            </style:paragraph-properties>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P61" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:keep-with-next="always"/>
            <style:text-properties style:font-name="Arial" style:language-asian="fr" style:country-asian="FR"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P62" style:family="paragraph" style:parent-style-name="Normal">
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
        <style:style style:name="P63" style:family="paragraph"
                     style:parent-style-name="Note_20_de_20_bas_20_de_20_page">
            <style:paragraph-properties fo:text-align="start" style:justify-single-word="false"/>
        </style:style>
        <style:style style:name="P64" style:family="paragraph" style:parent-style-name="Corps_20_de_20_texte">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
            <style:text-properties fo:font-size="11pt" fo:background-color="#ffffff" style:font-name-asian="Calibri"
                                   style:font-size-asian="11pt" style:language-asian="en" style:country-asian="US"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="P65" style:family="paragraph" style:parent-style-name="Corps_20_de_20_texte">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
            <style:text-properties style:font-name="Calibri" fo:font-size="11pt" fo:background-color="#00ffff"
                                   style:font-name-asian="Calibri" style:font-size-asian="11pt"
                                   style:language-asian="en" style:country-asian="US" style:font-name-complex="Calibri"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="P66" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0.1665in" fo:margin-bottom="0.1665in" fo:text-align="justify"
                                        style:justify-single-word="false"/>
        </style:style>
        <style:style style:name="P67" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-left="0in" fo:margin-right="0in" fo:margin-top="0in"
                                        fo:margin-bottom="0in" fo:text-align="justify" style:justify-single-word="false"
                                        fo:orphans="0" fo:widows="0" fo:text-indent="0.1972in"
                                        style:auto-text-indent="false"/>
            <style:text-properties style:font-name="Arial" fo:font-weight="bold" style:font-name-asian="Arial"
                                   style:language-asian="fr" style:country-asian="FR" style:font-weight-asian="bold"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P68" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-left="0in" fo:margin-right="0in" fo:margin-top="0in"
                                        fo:margin-bottom="0in" fo:text-align="justify" style:justify-single-word="false"
                                        fo:orphans="0" fo:widows="0" fo:text-indent="0.1972in"
                                        style:auto-text-indent="false"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P69" style:family="paragraph" style:parent-style-name="docdata">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0.0835in" fo:text-align="justify"
                                        style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" fo:font-size="11pt" fo:background-color="#ffffff"
                                   style:font-name-asian="Calibri" style:font-size-asian="11pt"
                                   style:language-asian="en" style:country-asian="US" style:font-name-complex="Arial"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="P70" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0.0835in" fo:keep-with-next="always"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P71" style:family="paragraph" style:parent-style-name="docdata">
            <style:paragraph-properties fo:margin-left="0.5in" fo:margin-right="0in" fo:margin-top="0in"
                                        fo:margin-bottom="0.139in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:text-indent="0in"
                                        style:auto-text-indent="false">
                <style:tab-stops/>
            </style:paragraph-properties>
            <style:text-properties style:font-name="Arial" fo:font-size="11pt" fo:background-color="#ffffff"
                                   style:font-name-asian="Calibri" style:font-size-asian="11pt"
                                   style:language-asian="en" style:country-asian="US" style:font-name-complex="Arial"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="P72" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false" fo:orphans="0"
                                        fo:widows="0" fo:keep-with-next="always"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P73" style:family="paragraph" style:parent-style-name="Corps_20_de_20_texte">
            <style:paragraph-properties fo:margin-left="0in" fo:margin-right="-0.002in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:text-indent="0in"
                                        style:auto-text-indent="false"/>
            <style:text-properties fo:font-size="11pt" style:font-name-asian="Arial" style:font-size-asian="11pt"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="P74" style:family="paragraph" style:parent-style-name="Corps_20_de_20_texte">
            <style:paragraph-properties fo:margin-left="0in" fo:margin-right="-0.002in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:text-indent="0in"
                                        style:auto-text-indent="false"/>
            <style:text-properties fo:font-size="11pt" style:font-name-asian="Calibri" style:font-size-asian="11pt"
                                   style:language-asian="en" style:country-asian="US" style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="P75" style:family="paragraph" style:parent-style-name="Corps_20_de_20_texte">
            <style:paragraph-properties fo:margin-left="0in" fo:margin-right="-0.002in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:text-indent="0in"
                                        style:auto-text-indent="false"/>
        </style:style>
        <style:style style:name="P76" style:family="paragraph" style:parent-style-name="Normal">
            <style:paragraph-properties fo:margin-top="0.0835in" fo:margin-bottom="0.111in" fo:text-align="justify"
                                        style:justify-single-word="false"/>
        </style:style>
        <style:style style:name="P77" style:family="paragraph" style:parent-style-name="Text_20_body"
                     style:list-style-name="L1">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
        </style:style>
        <style:style style:name="P78" style:family="paragraph" style:parent-style-name="Text_20_body"
                     style:list-style-name="L1">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"
                                        fo:background-color="#ffffff">
                <style:background-image/>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P79" style:family="paragraph" style:parent-style-name="Heading_20_2">
            <style:text-properties style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P80" style:family="paragraph" style:parent-style-name="Heading_20_2">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
            <style:text-properties style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P81" style:family="paragraph" style:parent-style-name="Heading_20_2">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
            <style:text-properties style:font-name-asian="Calibri" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P82" style:family="paragraph" style:parent-style-name="Heading_20_2">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false"/>
        </style:style>
        <style:style style:name="P83" style:family="paragraph" style:parent-style-name="Heading_20_2">
            <style:text-properties fo:font-size="14pt" style:font-size-asian="14pt"/>
        </style:style>
        <style:style style:name="P84" style:family="paragraph" style:parent-style-name="Heading_20_2">
            <style:paragraph-properties fo:text-align="center" style:justify-single-word="false"/>
            <style:text-properties fo:font-size="14pt" style:font-size-asian="14pt"/>
        </style:style>
        <style:style style:name="P85" style:family="paragraph" style:parent-style-name="Heading_20_2">
            <style:paragraph-properties fo:break-before="page"/>
        </style:style>
        <style:style style:name="P86" style:family="paragraph" style:parent-style-name="Heading_20_2">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in"/>
            <style:text-properties style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P87" style:family="paragraph" style:parent-style-name="Normal"
                     style:master-page-name="MPF0">
            <style:paragraph-properties fo:text-align="center" style:justify-single-word="false" style:page-number="1"
                                        fo:break-before="page"/>
        </style:style>
        <style:style style:name="P88" style:family="paragraph" style:parent-style-name="Normal"
                     style:list-style-name="L5">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false">
                <style:tab-stops>
                    <style:tab-stop style:position="-5.1465in"/>
                    <style:tab-stop style:position="-4.75in"/>
                    <style:tab-stop style:position="-0.6075in"/>
                </style:tab-stops>
            </style:paragraph-properties>
        </style:style>
        <style:style style:name="P89" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste"
                     style:list-style-name="L6"/>
        <style:style style:name="P90" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste"
                     style:list-style-name="L7"/>
        <style:style style:name="P91" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste"
                     style:list-style-name="L7">
            <style:text-properties style:font-name="Arial" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P92" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste"
                     style:list-style-name="L6">
            <style:text-properties style:font-name="Arial" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P93" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste"
                     style:list-style-name="L4">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:keep-with-next="always"/>
            <style:text-properties style:font-name="Arial" style:font-name-asian="Arial" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P94" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste"
                     style:list-style-name="L4">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:keep-with-next="always"/>
            <style:text-properties style:font-name="Arial" fo:background-color="#ff0000" style:font-name-asian="Arial"
                                   style:language-asian="fr" style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="P95" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste"
                     style:list-style-name="L4">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0in" fo:text-align="justify"
                                        style:justify-single-word="false" fo:keep-with-next="always"/>
        </style:style>
        <style:style style:name="P96" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste"
                     style:list-style-name="L6">
            <style:paragraph-properties fo:text-align="justify" style:justify-single-word="false" fo:orphans="0"
                                        fo:widows="0" fo:keep-with-next="always"/>
        </style:style>
        <style:style style:name="P97" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste"
                     style:list-style-name="L2" style:master-page-name="">
            <style:paragraph-properties fo:margin-left="0.5in" fo:margin-right="0in" fo:margin-top="0in"
                                        fo:margin-bottom="0in" fo:text-align="justify" style:justify-single-word="false"
                                        fo:hyphenation-ladder-count="no-limit" fo:text-indent="0in"
                                        style:auto-text-indent="false" style:page-number="auto">
                <style:tab-stops/>
            </style:paragraph-properties>
            <style:text-properties fo:background-color="#00ffff" style:font-name-complex="Calibri" fo:hyphenate="false"
                                   fo:hyphenation-remain-char-count="0" fo:hyphenation-push-char-count="0"/>
        </style:style>
        <style:style style:name="P98" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste"
                     style:list-style-name="L2" style:master-page-name="">
            <style:paragraph-properties fo:margin-left="0.5in" fo:margin-right="0in" fo:margin-top="0in"
                                        fo:margin-bottom="0in" fo:text-align="justify" style:justify-single-word="false"
                                        fo:hyphenation-ladder-count="no-limit" fo:text-indent="0in"
                                        style:auto-text-indent="false" style:page-number="auto">
                <style:tab-stops/>
            </style:paragraph-properties>
            <style:text-properties fo:background-color="#00ffff" style:font-name-complex="Calibri" fo:hyphenate="false"
                                   fo:hyphenation-remain-char-count="0" fo:hyphenation-push-char-count="0"/>
        </style:style>
        <style:style style:name="P99" style:family="paragraph" style:parent-style-name="Paragraphe_20_de_20_liste"
                     style:list-style-name="L2">
            <style:paragraph-properties fo:margin-left="0.5in" fo:margin-right="0in" fo:margin-top="0in"
                                        fo:margin-bottom="0in" fo:text-align="justify" style:justify-single-word="false"
                                        fo:hyphenation-ladder-count="no-limit" fo:text-indent="0in"
                                        style:auto-text-indent="false">
                <style:tab-stops/>
            </style:paragraph-properties>
            <style:text-properties fo:background-color="#00ffff" style:font-name-complex="Calibri" fo:hyphenate="false"
                                   fo:hyphenation-remain-char-count="0" fo:hyphenation-push-char-count="0"/>
        </style:style>
        <style:style style:name="P100" style:family="paragraph" style:parent-style-name="docdata"
                     style:list-style-name="L3">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0.139in" fo:text-align="justify"
                                        style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" fo:font-size="11pt" fo:background-color="#ffffff"
                                   style:font-name-asian="Calibri" style:font-size-asian="11pt"
                                   style:language-asian="en" style:country-asian="US" style:font-name-complex="Arial"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="P101" style:family="paragraph" style:parent-style-name="docdata"
                     style:list-style-name="L3">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0.139in" fo:text-align="justify"
                                        style:justify-single-word="false"/>
        </style:style>
        <style:style style:name="P102" style:family="paragraph" style:parent-style-name="Heading_20_4">
            <style:text-properties fo:background-color="#ff0000"/>
        </style:style>
        <style:style style:name="P103" style:family="paragraph" style:parent-style-name="Heading_20_3">
            <style:text-properties style:use-window-font-color="true" fo:font-size="12pt" fo:language="fr"
                                   fo:country="FR" fo:font-weight="bold" style:font-size-asian="12pt"
                                   style:font-weight-asian="bold" style:font-size-complex="12pt"/>
        </style:style>
        <style:style style:name="P104" style:family="paragraph" style:parent-style-name="Heading_20_3">
            <style:text-properties style:use-window-font-color="true" fo:font-size="12pt" fo:language="fr"
                                   fo:country="FR" fo:font-weight="bold" fo:background-color="#ff0000"
                                   style:font-size-asian="12pt" style:font-weight-asian="bold"
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
            <style:text-properties style:font-name="Arial" fo:background-color="#0000ff" style:font-name-asian="Arial"
                                   style:language-asian="fr" style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T13" style:family="text">
            <style:text-properties style:font-name="Arial" fo:background-color="#ffffff" style:font-name-asian="Arial"
                                   style:language-asian="fr" style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T14" style:family="text">
            <style:text-properties style:font-name="Arial" fo:background-color="#ffffff" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T15" style:family="text">
            <style:text-properties style:font-name="Arial" fo:background-color="#ffffff"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T16" style:family="text">
            <style:text-properties style:font-name="Arial" fo:background-color="#ffff00" style:font-name-asian="Arial"
                                   style:language-asian="fr" style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T17" style:family="text">
            <style:text-properties style:font-name="Arial" fo:background-color="#ffff00" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T18" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-size="12pt" style:font-name-asian="Arial"
                                   style:font-size-asian="12pt" style:language-asian="fr" style:country-asian="FR"
                                   style:font-name-complex="Arial" style:font-size-complex="12pt"/>
        </style:style>
        <style:style style:name="T19" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-size="12pt" fo:background-color="#ffffff"
                                   style:font-name-asian="Arial" style:font-size-asian="12pt" style:language-asian="fr"
                                   style:country-asian="FR" style:font-name-complex="Arial"
                                   style:font-size-complex="12pt"/>
        </style:style>
        <style:style style:name="T20" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-size="12pt" fo:font-weight="bold"
                                   fo:background-color="#ffffff" style:font-name-asian="Arial"
                                   style:font-size-asian="12pt" style:font-weight-asian="bold"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T21" style:family="text">
            <style:text-properties style:font-name="Arial" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T22" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-size="9pt" style:font-size-asian="9pt"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T23" style:family="text">
            <style:text-properties style:font-name="Arial" fo:background-color="#ff0000" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T24" style:family="text">
            <style:text-properties style:font-name="Arial" fo:background-color="#ff0000"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T25" style:family="text">
            <style:text-properties style:font-name="Arial" fo:background-color="#7030a0" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T26" style:family="text">
            <style:text-properties style:font-name="Arial" style:language-asian="fr" style:country-asian="FR"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T27" style:family="text">
            <style:text-properties style:font-name="Arial" fo:background-color="#00ffff" style:font-name-asian="Arial"
                                   style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T28" style:family="text">
            <style:text-properties style:font-name="Arial" fo:background-color="#00ffff" style:font-name-asian="Arial"
                                   style:language-asian="fr" style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T29" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-size="11pt" fo:background-color="#ffffff"
                                   style:font-name-asian="Calibri" style:font-size-asian="11pt"
                                   style:language-asian="en" style:country-asian="US" style:font-name-complex="Arial"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="T30" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-size="11pt" style:font-name-asian="Arial"
                                   style:font-size-asian="11pt" style:font-name-complex="Arial"
                                   style:font-size-complex="11pt" style:font-weight-complex="bold"/>
        </style:style>
        <style:style style:name="T31" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-size="11pt" fo:background-color="#ff0000"
                                   style:font-name-asian="Calibri" style:font-size-asian="11pt"
                                   style:language-asian="en" style:country-asian="US" style:font-name-complex="Arial"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="T32" style:family="text">
            <style:text-properties style:font-name="Arial" fo:background-color="#ff00ff" style:font-name-asian="Arial"
                                   style:language-asian="fr" style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T33" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-size="14pt" fo:font-weight="bold"
                                   style:font-name-asian="Arial" style:font-size-asian="14pt"
                                   style:font-weight-asian="bold" style:font-name-complex="Arial"
                                   style:font-size-complex="14pt"/>
        </style:style>
        <style:style style:name="T34" style:family="text">
            <style:text-properties style:font-name="Arial" fo:font-size="14pt" style:text-underline-style="solid"
                                   style:text-underline-width="auto" style:text-underline-color="font-color"
                                   style:text-underline-mode="continuous" style:text-overline-mode="continuous"
                                   style:text-line-through-mode="continuous" style:font-name-asian="Arial"
                                   style:font-size-asian="14pt" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T35" style:family="text">
            <style:text-properties style:text-position="super 64%" style:font-name="Arial" style:font-name-asian="Arial"
                                   style:language-asian="fr" style:country-asian="FR" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T36" style:family="text">
            <style:text-properties style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T37" style:family="text">
            <style:text-properties fo:font-weight="bold" style:font-weight-asian="bold"/>
        </style:style>
        <style:style style:name="T38" style:family="text">
            <style:text-properties fo:font-weight="bold" fo:background-color="#ff0000" style:font-weight-asian="bold"/>
        </style:style>
        <style:style style:name="T39" style:family="text">
            <style:text-properties fo:background-color="#ff0000"/>
        </style:style>
        <style:style style:name="T40" style:family="text">
            <style:text-properties fo:font-size="11pt" fo:background-color="#ffffff" style:font-name-asian="Calibri"
                                   style:font-size-asian="11pt" style:language-asian="en" style:country-asian="US"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="T41" style:family="text">
            <style:text-properties fo:font-size="11pt" fo:background-color="#00ffff" style:font-name-asian="Calibri"
                                   style:font-size-asian="11pt" style:language-asian="en" style:country-asian="US"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="T42" style:family="text">
            <style:text-properties fo:font-size="11pt" fo:background-color="#ff0000" style:font-name-asian="Calibri"
                                   style:font-size-asian="11pt" style:language-asian="en" style:country-asian="US"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="T43" style:family="text">
            <style:text-properties fo:font-size="11pt" style:font-name-asian="Arial" style:font-size-asian="11pt"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="T44" style:family="text">
            <style:text-properties fo:font-size="11pt" fo:font-style="italic" style:font-name-asian="Arial"
                                   style:font-size-asian="11pt" style:font-style-asian="italic"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="T45" style:family="text">
            <style:text-properties style:font-name-asian="Calibri" style:font-name-complex="Arial"/>
        </style:style>
        <style:style style:name="T46" style:family="text">
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
            <text:list-level-style-bullet text:level="1" text:style-name="WW_5f_CharLFO6LVL1" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="0.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="2" text:style-name="WW_5f_CharLFO6LVL2" text:bullet-char="-">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="1in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Arial"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="3" text:style-name="WW_5f_CharLFO6LVL3" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="1.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="4" text:style-name="WW_5f_CharLFO6LVL4" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="2in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="5" text:style-name="WW_5f_CharLFO6LVL5" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="2.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="6" text:style-name="WW_5f_CharLFO6LVL6" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="3in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="7" text:style-name="WW_5f_CharLFO6LVL7" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="3.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="8" text:style-name="WW_5f_CharLFO6LVL8" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="4in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="9" text:style-name="WW_5f_CharLFO6LVL9" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="4.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
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
            <text:list-level-style-bullet text:level="1" text:style-name="WW_5f_CharLFO7LVL1" text:bullet-char="–">
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
            <text:list-level-style-bullet text:level="1" text:style-name="WW_5f_CharLFO8LVL1" text:bullet-char="-">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="0.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Arial"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="2" text:style-name="WW_5f_CharLFO8LVL2" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="1in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="3" text:style-name="WW_5f_CharLFO8LVL3" text:bullet-char="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="1.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Wingdings"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="4" text:style-name="WW_5f_CharLFO8LVL4" text:bullet-char="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="2in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Symbol"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="5" text:style-name="WW_5f_CharLFO8LVL5" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="2.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="6" text:style-name="WW_5f_CharLFO8LVL6" text:bullet-char="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="3in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Wingdings"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="7" text:style-name="WW_5f_CharLFO8LVL7" text:bullet-char="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="3.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Symbol"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="8" text:style-name="WW_5f_CharLFO8LVL8" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="4in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="9" text:style-name="WW_5f_CharLFO8LVL9" text:bullet-char="">
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
        <text:list-style style:name="L5">
            <text:list-level-style-bullet text:level="1" text:style-name="WW_5f_CharLFO9LVL1" text:bullet-char="-">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.3437in"
                                                      fo:margin-left="0.5937in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Arial"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="2" text:style-name="WW_5f_CharLFO9LVL2" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="1in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="3" text:style-name="WW_5f_CharLFO9LVL3" text:bullet-char="§">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="1.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Wingdings"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="4" text:style-name="WW_5f_CharLFO9LVL4" text:bullet-char="·">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="2in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Symbol"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="5" text:style-name="WW_5f_CharLFO9LVL5" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="2.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="6" text:style-name="WW_5f_CharLFO9LVL6" text:bullet-char="§">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="3in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Wingdings"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="7" text:style-name="WW_5f_CharLFO9LVL7" text:bullet-char="·">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="3.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Symbol"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="8" text:style-name="WW_5f_CharLFO9LVL8" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="4in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="9" text:style-name="WW_5f_CharLFO9LVL9" text:bullet-char="§">
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
        <text:list-style style:name="L6">
            <text:list-level-style-bullet text:level="1" text:style-name="WW_5f_CharLFO10LVL1" text:bullet-char="-">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="0.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Arial"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="2" text:style-name="WW_5f_CharLFO10LVL2" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="1in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="3" text:style-name="WW_5f_CharLFO10LVL3" text:bullet-char="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="1.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Wingdings"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="4" text:style-name="WW_5f_CharLFO10LVL4" text:bullet-char="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="2in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Symbol"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="5" text:style-name="WW_5f_CharLFO10LVL5" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="2.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="6" text:style-name="WW_5f_CharLFO10LVL6" text:bullet-char="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="3in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Wingdings"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="7" text:style-name="WW_5f_CharLFO10LVL7" text:bullet-char="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="3.5in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Symbol"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="8" text:style-name="WW_5f_CharLFO10LVL8" text:bullet-char="o">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" fo:text-indent="-0.25in"
                                                      fo:margin-left="4in"/>
                </style:list-level-properties>
                <style:text-properties style:font-name="Courier New"/>
            </text:list-level-style-bullet>
            <text:list-level-style-bullet text:level="9" text:style-name="WW_5f_CharLFO10LVL9" text:bullet-char="">
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
        <text:list-style style:name="L7">
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
            <text:p text:style-name="P87">
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
                            svg:height="0.8228in" style:rel-height="scale" draw:z-index="4">
                    <draw:text-box>
                        <text:p text:style-name="P30">Convention de subventionnement</text:p>
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
                        nommé à ces fonctions par décret du Président de la République en date du 1</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T35">er</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">décembre 2022 et domicilié en cette qualité audit siège</text:span>
                </text:span>
                <text:bookmark-end text:name="_Hlk117601944"/>
            </text:p>
            <text:p text:style-name="P31">
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
            <text:p text:style-name="P32">
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
                    <text:span text:style-name="T18">Ci-après</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T18">dénommé(e)</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T19">« le Bénéficiaire »,</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P7"/>
            <text:p text:style-name="P7">L’ANCT et le bénéficiaire sont ci-après désignés ensemble « les Parties »,
            </text:p>
            <text:p text:style-name="P7"/>
            <text:p text:style-name="P7">Il a été convenu ce qui suit :</text:p>
            <text:p text:style-name="P7"/>
            <text:p text:style-name="P7"/>
            <text:p text:style-name="P34"/>
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
                <text:index-body>
                    <text:p text:style-name="P35">
                        <text:a xlink:type="simple" xlink:href="#_Toc162605987" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">Préambule</text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162605987" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>3
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P35">
                        <text:a xlink:type="simple" xlink:href="#_Toc162605988" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T36">Article 1 : Objet</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162605988" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T36">de la convention</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162605988" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>4
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P35">
                        <text:a xlink:type="simple" xlink:href="#_Toc162605989" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T36">Article 2 : Description du projet de la gouvernance
                                </text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162605989" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>4
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P36">
                        <text:a xlink:type="simple" xlink:href="#_Toc162605990" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T37">Article 2.1 : Contexte des actions et demande de
                                    subvention
                                </text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162605990" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>4
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P36">
                        <text:a xlink:type="simple" xlink:href="#_Toc162605991" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T37">Article 2.2: Description</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162605991" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T37">de la ou des action(s) subventionnée(s)</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162605991" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>4
                        </text:a>
                    </text:p>
                    ${
                      beneficiaireFormation
                        ? `<text:p text:style-name='P36'>
                        <text:a xlink:type='simple' xlink:href='#_Toc162605992' office:target-frame-name='_top'
                                xlink:show='replace' text:style-name='Internet_20_link'
                                text:visited-style-name='Visited_20_Internet_20_Link'>
                            <text:span text:style-name='Lien_20_hypertexte'>
                                <text:span text:style-name='T37'>Article 2.3: la formation des agents publics à Aidant
                                    Connect
                                </text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type='simple' xlink:href='#_Toc162605992' office:target-frame-name='_top'
                                xlink:show='replace' text:style-name='Internet_20_link'
                                text:visited-style-name='Visited_20_Internet_20_Link'><text:tab/>4
                        </text:a>
                    </text:p>`
                        : ''
                    }
                    <text:p text:style-name="P35">
                        <text:a xlink:type="simple" xlink:href="#_Toc162605993" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T36">Article 3 : Durée de la convention</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162605993" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>5
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P35">
                        <text:a xlink:type="simple" xlink:href="#_Toc162605994" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T36">Article 4 : Moda</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162605994" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T36">lités du financement</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162605994" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>5
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P36">
                        <text:a xlink:type="simple" xlink:href="#_Toc162605995" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T37">4.1. Montant de la participation financière</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162605995" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>5
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P37">
                        <text:a xlink:type="simple" xlink:href="#_Toc162605996" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">4. 1. 1. Ingénierie de projet</text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162605996" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>5
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P37">
                        <text:a xlink:type="simple" xlink:href="#_Toc162605997" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T39">4. 1. 2. Formations Aidants Connect</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162605997" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>5
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P36">
                        <text:a xlink:type="simple" xlink:href="#_Toc162605998" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T37">4.2. Versement et délai de paiement</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162605998" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>5
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P35">
                        <text:a xlink:type="simple" xlink:href="#_Toc162605999" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T36">Article 5 : Suivi de la réalisation du projet du
                                    bénéficiaire et son évaluation
                                </text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162605999" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>6
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P36">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606000" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T37">5.1. Suivi et animation collective</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606000" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>6
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P37">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606001" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">5. 1. 1. Projets d’ingénierie</text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606001" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>6
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P37">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606002" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T39">5. 1. 2. Formations Aidants connect</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606002" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>6
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P36">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606003" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T37">5.2. Evaluation de la dépense des fonds</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606003" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>7
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P35">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606004" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T36">Article 6 :</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606004" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T36">Communication et propriété intellectuelle</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606004" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>7
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P35">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606005" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T36">Article 7 : Respect du Contrat d’engagement républicain
                                    par les associations et les fondations
                                </text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606005" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>8
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P35">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606006" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T36">Article 8 : Résiliation</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606006" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>8
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P36">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606007" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T37">8.1. Résiliation pour faute</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606007" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>8
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P36">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606008" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T37">8.2.<text:s/>Effets de la résiliation
                                </text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606008" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>8
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P35">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606009" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T36">Article 9 : Force majeure</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606009" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>9
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P35">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606010" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T36">Article 10 : Dispositions générales</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606010" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>9
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P36">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606011" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T37">10.1. Modification de la convention</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606011" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>9
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P36">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606012" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T37">10.2. Nullité</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606012" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>9
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P36">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606013" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T37">10.3. Renonciation</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606013" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>9
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P36">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606014" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T37">10.4. Cession et transmission de la convention
                                </text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606014" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>9
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P36">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606015" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T37">10.5. Publication des données</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606015" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>9
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P36">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606016" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T37">10.6. Données personnelles</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606016" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>9
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P35">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606017" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T36">Article 11 : Conflit d&apos;intérêts</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606017" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>10
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P35">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606018" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">
                                <text:span text:style-name="T36">Article 12 : Litiges</text:span>
                            </text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606018" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>10
                        </text:a>
                    </text:p>
                    <text:p text:style-name="P35">
                        <text:a xlink:type="simple" xlink:href="#_Toc162606019" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link">
                            <text:span text:style-name="Lien_20_hypertexte">Annexes</text:span>
                        </text:a>
                        <text:a xlink:type="simple" xlink:href="#_Toc162606019" office:target-frame-name="_top"
                                xlink:show="replace" text:style-name="Internet_20_link"
                                text:visited-style-name="Visited_20_Internet_20_Link"><text:tab/>12
                        </text:a>
                    </text:p>
                </text:index-body>
            </text:table-of-content>
            <text:h text:style-name="P85" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162605987"/>
                <text:bookmark-start text:name="_Toc162604406"/>
                <text:bookmark-start text:name="_Toc162603181"/>
                <text:bookmark-start text:name="_Toc162530243"/>Préambule
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
            <text:p text:style-name="P40"/>
            <text:p text:style-name="P14">Contexte</text:p>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">C</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">inq ans après le lancement de la première Stratégie nationale pour
                        un numérique inclusif (SNNI) et à l’issue d’une vaste concertation partenariale menée dans le
                        cadre du Conseil National de la Refondation numérique (CNR numérique), l’État, les collectivité
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">s territoriales et les acteurs de la société civile ont souhaité
                        réaffirmer leur engagement en faveur de l’inclusion numérique du plus grand nombre. Prenant la
                        suite de la SNNI,
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T4">la feuille de route France Numérique Ensemble (FNE) est structurée
                        autour de 4
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T4">axes et 16 engagements</text:span>
                </text:span>
                <text:span text:style-name="Appel_20_note_20_de_20_bas_20_de_20_p.">
                    <text:span text:style-name="T4">
                        <text:note text:id="ftn1" text:note-class="footnote">
                            <text:note-citation>1</text:note-citation>
                            <text:note-body>
                                <text:p>
                                    <text:span text:style-name="Police_20_par_20_défaut">
                                        <text:span text:style-name="T21">
                                            <text:s/>
                                        </text:span>
                                    </text:span>
                                    <text:span text:style-name="Police_20_par_20_défaut">
                                        <text:span text:style-name="T22">La feuille de route France Numérique Ensemble
                                            est disponible sur le site du Programme Société Numérique. Lien :
                                        </text:span>
                                    </text:span>
                                    <text:a xlink:type="simple"
                                            xlink:href="https://societenumerique.gouv.fr/documents/84/Feuille_route_23-27_-_engagements_mis_à_jour.pdf"
                                            office:target-frame-name="_top" xlink:show="replace"
                                            text:style-name="Internet_20_link"
                                            text:visited-style-name="Visited_20_Internet_20_Link">
                                        <text:span text:style-name="Lien_20_hypertexte">
                                            <text:span text:style-name="T22">
                                                https://societenumerique.gouv.fr/documents/84/Feuille_route_23-27_-_engagements_mis_%C3%A0_jour.pdf
                                            </text:span>
                                        </text:span>
                                    </text:a>
                                    <text:span text:style-name="Police_20_par_20_défaut">
                                        <text:span text:style-name="T22">.</text:span>
                                    </text:span>
                                </text:p>
                            </text:note-body>
                        </text:note>
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">. Elle doit permettre, d’ici à 2027, d’atteindre les ob</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">jectifs suivants : 8 millions de personnes accompagnées, 25 000
                        lieux d’inclusion numérique, 20 000 aidants numériques formés et 2 millions d’équipements
                        informatiques reconditionnés accessibles aux ménages les plus modestes, en complément des
                        objectifs fi
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">xés dans le cadre de la politique prioritaire du Gouvernement
                        « Devenir la première puissance numérique européenne » et de son chantier « Favoriser
                        l’inclusion numérique pour tous par la formation et les conseillers numériques ».
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">Le Programme Société Numér</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">ique de l’ANCT, chargé de mettre en œuvre cette feuille de route
                        France Numérique Ensemble, entend ainsi mener des actions pour
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T5"></text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">renforcer les acteurs territoriaux de la politique d’inclusion
                        numérique. L’Instruction du Gouvernement relative à la territoria
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">lisation de la feuille de route France Numérique Ensemble signée le
                        28/07/2023 détaille le calendrier qui permet la territorialisation de la politique publique
                        d’inclusion numérique. Ainsi, dans 80 départements, au moins une collectivité s’est déclarée vol
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">ontaire pour co-porter une gouvernance locale auprès de l’Etat.
                        Cette gouvernance locale est constituée des différents acteurs concernés par l’inclusion
                        numérique.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P12">Afin de renforcer leur rôle dans le cadre de France Numérique Ensemble, et
                pérenniser l’action de la médiation numérique, une enveloppe de 5 millions d’euros est dédiée aux
                gouvernances locales pour financer des projets d&apos;élaboration ou de mise en œuvre de feuilles de
                route territoriales.
                <text:s/>
            </text:p>
            <text:p text:style-name="P27">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">Les enveloppes dont les montants varient selon le</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">département sont indexées sur 5 critères que sont : le taux de
                        chômage, le taux de pauvreté, la part des habitants peu ou pas diplômés, la démographie, et la
                        part des +65 ans.<text:s/>Le montant exact auquel chaque gouvernance peut prétendre a été
                        communiqué aux
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">départements et aux régions en mars 2024.</text:span>
                </text:span>
            </text:p>
            ${
              beneficiaireFormation
                ? `<text:p text:style-name='P27'>
                <text:span text:style-name='Police_20_par_20_défaut'>
                    <text:span text:style-name='T10'>Par ailleurs, la formation des professionnels de la médiation
                        numérique, à la fois aidants et médiateurs numérique, est un enjeu majeur de la feuille de route
                        France Numérique Ensemble. C’est pourquoi 1,2 millions
                    </text:span>
                </text:span>
                <text:span text:style-name='Police_20_par_20_défaut'>
                    <text:span text:style-name='T10'>d’euros sont répartis au sein des gouvernances locales pour
                    </text:span>
                </text:span>
                <text:span text:style-name='Police_20_par_20_défaut'>
                    <text:span text:style-name='T10'></text:span>
                </text:span>
                <text:span text:style-name='Police_20_par_20_défaut'>
                    <text:span text:style-name='T10'>proposer des formations Aidants Connect aux professionnels hors
                        conseillers numériques et salariés de structures adhérentes à l’OPCO Uniformation
                    </text:span>
                </text:span>
            </text:p>`
                : ''
            }
            <text:p text:style-name="P8">
                <text:soft-page-break/>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">Les besoins des gouvernances locales en ingénieri</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">e de projet</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T23">et en formation des professionnels de la médiation numérique
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T14">ont</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">été transmis à l’ANCT par le biais des préfectures de département
                        via leur espace France Numérique Ensemble, après concertation des acteurs au niveau local. Pour
                        bénéficier de ce
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">dispositif, le bénéficiaire a eu connaissance du cahier des charges
                        via cet espace France Numérique Ensemble (annexes 1 et 2).
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P13"/>
            <text:h text:style-name="P80" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162605988"/>
                <text:bookmark-start text:name="_Toc162604407"/>
                <text:bookmark-start text:name="_Toc162603182"/>
                <text:bookmark-start text:name="_Toc162530244"/>Article 1 : Objet de la convention
                <text:bookmark-end text:name="_Toc162605988"/>
                <text:bookmark-end text:name="_Toc162604407"/>
                <text:bookmark-end text:name="_Toc162603182"/>
                <text:bookmark-end text:name="_Toc162530244"/>
            </text:h>
            <text:p>L’objet de la présente convention est l&apos;octroi par l’ANCT d&apos;une subvention destinée au
                bénéficiaire pour :
            </text:p>
            <text:list xml:id="list2290038263924295194" text:style-name="L1">
                <text:list-item>
                    <text:p text:style-name="P77">
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T40">Soutenir son projet d’élaboration et/ou de mise en œuvre de
                                la feuille de route France Numérique Ensemble au niveau du territoire à hauteur de
                            </text:span>
                        </text:span>
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T41">XXX</text:span>
                        </text:span>
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T40">€.</text:span>
                        </text:span>
                    </text:p>
                </text:list-item>
                <text:list-item>
                    <text:p text:style-name="P78">
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T42">Permettre le financement de 62 formations au dispositif
                                Aidants Connect pour les professionn
                            </text:span>
                        </text:span>
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T42">els du territoire.</text:span>
                        </text:span>
                    </text:p>
                </text:list-item>
            </text:list>
            <text:p/>
            <text:p text:style-name="P40"/>
            <text:h text:style-name="P80" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162605989"/>
                <text:bookmark-start text:name="_Toc162604408"/>
                <text:bookmark-start text:name="_Toc162603183"/>
                <text:bookmark-start text:name="_Toc162530245"/>Article 2 : Description du projet de la gouvernance
                <text:bookmark-end text:name="_Toc162605989"/>
                <text:bookmark-end text:name="_Toc162604408"/>
                <text:bookmark-end text:name="_Toc162603183"/>
                <text:bookmark-end text:name="_Toc162530245"/>
            </text:h>
            <text:h text:style-name="P103" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162605990"/>
                <text:bookmark-start text:name="_Toc162604409"/>
                <text:bookmark-start text:name="_Toc162603184"/>
                <text:bookmark-start text:name="_Toc162530246"/>Article 2.1 : Contexte des actions et demande de
                subvention
                <text:bookmark-end text:name="_Toc162605990"/>
                <text:bookmark-end text:name="_Toc162604409"/>
                <text:bookmark-end text:name="_Toc162603184"/>
                <text:bookmark-end text:name="_Toc162530246"/>
            </text:h>
            <text:p text:style-name="P16">Le Bénéficiaire s’est engagé à mettre en œuvre de sa propre initiative et sous
                sa responsabilité, sans que l’ANCT n’en tire de contrepartie directe, le projet suivant :
            </text:p>
            <text:p text:style-name="P28">Reprise des éléments de la case contexte de l’action, dans le formulaire de
                demande de subvention.
            </text:p>
            <text:p text:style-name="P28">Si plusieurs actions pour ce bénéficiaire, ajout des différents contextes avec
                Contexte de l’action [nom de l’action] puis le contexte de l’action renseignée dans le formulaire de
                demande de suvbvention.
            </text:p>
            <text:h text:style-name="P103" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162605991"/>
                <text:bookmark-start text:name="_Toc162604410"/>
                <text:bookmark-start text:name="_Toc162603185"/>
                <text:bookmark-start text:name="_Toc162530247"/>Article 2.2: Description de la ou des action(s)
                subventionnée(s)
                <text:bookmark-end text:name="_Toc162605991"/>
                <text:bookmark-end text:name="_Toc162604410"/>
                <text:bookmark-end text:name="_Toc162603185"/>
                <text:bookmark-end text:name="_Toc162530247"/>
            </text:h>
            <text:p>Les actions de la gouvernance reposent sur les besoins suivants :</text:p>
            <text:p/>
            <text:p>Reprise des besoins exprimés dans le formulaire de demande.</text:p>
            <text:p>Ex :</text:p>
            <text:list xml:id="list6507117097520247627" text:style-name="L2">
                <text:list-item>
                    <text:list>
                        <text:list-item>
                            <text:p text:style-name="P97">Structurer un fonds local pour l’inclusion numérique</text:p>
                        </text:list-item>
                        <text:list-item>
                            <text:p text:style-name="P97">Monter des dossier subvention</text:p>
                        </text:list-item>
                        <text:list-item>
                            <text:p text:style-name="P99">Animer et mettre en œuvre la gouvernance et la feuille de
                                route
                            </text:p>
                        </text:list-item>
                        <text:list-item>
                            <text:p text:style-name="P99">XXX</text:p>
                        </text:list-item>
                    </text:list>
                </text:list-item>
            </text:list>
            <text:h text:style-name="P104" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162605992"/>
                <text:bookmark-start text:name="_Toc162604411"/>
                <text:soft-page-break/>Article 2.3: la formation des agents publics à Aidant Connect
                <text:bookmark-end text:name="_Toc162605992"/>
                <text:bookmark-end text:name="_Toc162604411"/>
            </text:h>
            <text:p text:style-name="P66">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T24">Le</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T24">Bénéficiaire s’est positionné comme tiers financeur sur son
                        territoire pour 62 formations à Aidants Connect (hors conseillers numériques et salariés des
                        branches de l’OPCO Uniformation). La subvention dédiée s’élève à 20 000 euros.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P66">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T24">Le bénéficiaire peut fin</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T24">ancer les formations à Aidants Connect des professionnels de sa
                        structure. Toutefois, il doit aussi permettre le financement de formation de professionnels
                        d’autres structures de son territoire, dans la limite de 62 formations (à hauteur de 322 euros
                        par a
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T24">gent, soit le coût d’une formation Aidants Connect de 7 heures).
                    </text:span>
                </text:span>
            </text:p>
            <text:h text:style-name="P81" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162605993"/>
                <text:bookmark-start text:name="_Toc162604412"/>
                <text:bookmark-start text:name="_Toc162603186"/>
                <text:bookmark-start text:name="_Toc162530248"/>Article 3 : Durée de la convention
                <text:bookmark-end text:name="_Toc162605993"/>
                <text:bookmark-end text:name="_Toc162604412"/>
                <text:bookmark-end text:name="_Toc162603186"/>
                <text:bookmark-end text:name="_Toc162530248"/>
            </text:h>
            <text:p text:style-name="P18">La présente convention prend effet à la date de sa signature par les parties
                et s’étend jusqu’à la réalisation et la validation des livrables attendus pour l’évaluation de la
                dépense des fonds mentionnés à l’article 5.2 de la présente convention.
            </text:p>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T26">Durant cette période, le bénéficiaire s’engage à notifier tout
                        retard pris dans l’exécution, toute modification des conditions d’exécution, de ses statuts ou
                        de ses
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T26">coordonnées bancaires.</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P44"/>
            <text:h text:style-name="P82" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162605994"/>
                <text:bookmark-start text:name="_Toc162604413"/>
                <text:bookmark-start text:name="_Toc162603187"/>
                <text:bookmark-start text:name="_Toc162530249"/>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T45">Article 4 : Modalités du financement</text:span>
                </text:span>
                <text:bookmark-end text:name="_Toc162605994"/>
                <text:bookmark-end text:name="_Toc162604413"/>
                <text:bookmark-end text:name="_Toc162603187"/>
                <text:bookmark-end text:name="_Toc162530249"/>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T45"></text:span>
                </text:span>
            </text:h>
            <text:h text:style-name="P103" text:outline-level="3">
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
                <text:bookmark-end text:name="_Toc162605995"/>
                <text:bookmark-end text:name="_Toc162604414"/>
                <text:bookmark-end text:name="_Toc162603188"/>
                <text:bookmark-end text:name="_Toc162530250"/>
            </text:h>
            <text:h text:style-name="Heading_20_4" text:outline-level="4">
                <text:bookmark-start text:name="_Toc162605996"/>
                <text:bookmark-start text:name="_Toc162604415"/>
                <text:bookmark-start text:name="_Toc162603189"/>
                <text:bookmark-start text:name="_Toc162530251"/>4. 1. 1. Ingénierie de projet
                <text:bookmark-end text:name="_Toc162605996"/>
                <text:bookmark-end text:name="_Toc162604415"/>
                <text:bookmark-end text:name="_Toc162603189"/>
                <text:bookmark-end text:name="_Toc162530251"/>
            </text:h>
            <text:p text:style-name="P50">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">Au titre de l’exercice 2024, l’ANCT contribue financièrement au
                        projet pour un montant de
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T17">(montant en toute lettre</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T27">(XXX</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">) euros TTC, ce qui représente</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T17">XX</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T14">%</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">du budget prévisionnel 2024 du projet dont le budget global s’élève
                        à
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T17">montant en toute lettre</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10"></text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T27">XXX</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">euros TTC.</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P42"/>
            <text:p text:style-name="P42">L’ANCT se réserve le droit de réévaluer ce montant par la voie d’un avenant,
                notamment si le bénéficiaire n’est pas en mesure de justifier de l’emploi de la subvention conformément
                à la présente convention.
            </text:p>
            <text:p text:style-name="P50">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">
                        <text:s/>
                    </text:span>
                </text:span>
                <text:bookmark-start text:name="_Hlk127547269"/>
            </text:p>
            <text:h text:style-name="P102" text:outline-level="4">
                <text:bookmark-start text:name="_Toc162605997"/>
                <text:bookmark-start text:name="_Toc162604416"/>
                <text:bookmark-start text:name="_Toc162603190"/>
                <text:bookmark-start text:name="_Toc162530252"/>4. 1. 2.<text:bookmark-end text:name="_Hlk127547269"/>
                Formations Aidants Connect
                <text:bookmark-end text:name="_Toc162605997"/>
                <text:bookmark-end text:name="_Toc162604416"/>
                <text:bookmark-end text:name="_Toc162603190"/>
                <text:bookmark-end text:name="_Toc162530252"/>
            </text:h>
            <text:p text:style-name="P46"/>
            <text:p text:style-name="P45">Au titre de l’exercice 2024, l’ANCT contribue financièrement aux formations
                pour un montant de vingt mille euros toutes taxes comprises (20 000€ TTC).
            </text:p>
            <text:p text:style-name="P45"/>
            <text:p text:style-name="P45">Ce financement doit permettre 62 formations à Aidants Connect de 7 heures, à
                hauteur de 322 euros par formation.
            </text:p>
            <text:p text:style-name="P45"/>
            <text:p text:style-name="P50">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T23">Des formations plus longues intégrant une brique Aidants Connect
                        sont également disponibles et peuvent être ch
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T23">oisies par les professionnels. Les frais complémentaires (au-delà
                        de 322 euros) restent à la charge de leur structure employeuse.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P45"/>
            <text:p text:style-name="P50">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T23">L’ANCT se réserve le droit de réévaluer ce montant par la voie d’un
                        avenant, notamment si le bénéficiaire n’est pas en mesure
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T23">de justifier de l’emploi de la subvention conformément à la
                        présente convention avant a fin de l’année 2024.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P43"/>
            <text:h text:style-name="P103" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162605998"/>
                <text:bookmark-start text:name="_Toc162604417"/>4.2. Versement et délai de paiement
                <text:bookmark-end text:name="_Toc162605998"/>
                <text:bookmark-end text:name="_Toc162604417"/>
            </text:h>
            <text:p text:style-name="P67"/>
            <text:p text:style-name="P43">Le versement s’effectuera à compter de la signature de la convention.</text:p>
            <text:p text:style-name="P53">
                <text:soft-page-break/>
                <text:s/>
            </text:p>
            <text:p text:style-name="P43">L’ANCT se réserve le droit de réclamer la restitution de tout ou partie de
                l’aide versée si le bénéficiaire justifie d’une exécution partiellement conforme à la présente
                convention.
            </text:p>
            <text:p text:style-name="P43"/>
            <text:p text:style-name="P51">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">Le bénéficiaire des fonds s’engage à fournir, dès la signature de
                        la convention, un avis
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">SIRENE et un R</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">IB en format PDF.</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P43"/>
            <text:p text:style-name="P43">Le comptable assignataire est l’agent comptable de l’ANCT, nommé à cet effet
                par arrêté du Ministre de l’action et des comptes publics.
            </text:p>
            <text:p text:style-name="P43"/>
            <text:p text:style-name="P68"/>
            <text:p text:style-name="P41"/>
            <text:h text:style-name="P86" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162605999"/>
                <text:bookmark-start text:name="_Toc162604418"/>
                <text:bookmark-start text:name="_Toc162603191"/>
                <text:bookmark-start text:name="_Toc162530253"/>Article 5 : Suivi de la réalisation du projet du
                bénéficiaire et son évaluation
                <text:bookmark-end text:name="_Toc162605999"/>
                <text:bookmark-end text:name="_Toc162604418"/>
                <text:bookmark-end text:name="_Toc162603191"/>
                <text:bookmark-end text:name="_Toc162530253"/>
            </text:h>
            <text:p text:style-name="P3"/>
            <text:h text:style-name="P103" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162606000"/>
                <text:bookmark-start text:name="_Toc162604419"/>
                <text:bookmark-start text:name="_Toc162603192"/>
                <text:bookmark-start text:name="_Toc162530254"/>5.1. Suivi et animation collective
                <text:bookmark-end text:name="_Toc162606000"/>
                <text:bookmark-end text:name="_Toc162604419"/>
                <text:bookmark-end text:name="_Toc162603192"/>
                <text:bookmark-end text:name="_Toc162530254"/>
            </text:h>
            <text:h text:style-name="Heading_20_4" text:outline-level="4">
                <text:bookmark-start text:name="_Toc162606001"/>
                <text:bookmark-start text:name="_Toc162604420"/>
                <text:bookmark-start text:name="_Toc162603193"/>
                <text:bookmark-start text:name="_Toc162530255"/>5. 1. 1. Projets d’ingénierie
                <text:bookmark-end text:name="_Toc162606001"/>
                <text:bookmark-end text:name="_Toc162604420"/>
                <text:bookmark-end text:name="_Toc162603193"/>
                <text:bookmark-end text:name="_Toc162530255"/>
            </text:h>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">Le bénéficiaire conduit le suivi et l’évaluation de son projet sur
                        la base d’indicateurs quantitatifs et
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T14">des retours qualitatifs sur les actions et initiatives de la
                        gouvernance.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P69">Le bénéficiaire s’engage à fournir tous les documents nécessaires aux
                évaluations des actions décrites à l’article 2 ainsi qu’au suivi technique et financier du projet.
                <text:s/>
            </text:p>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T21">Le suivi et l’animation de ce dispositif impliquera les modalités
                        de fonctionnement suivantes :
                    </text:span>
                </text:span>
                <text:bookmark-start text:name="_Hlk149848689"/>
            </text:p>
            <text:list xml:id="list344063789134117038" text:style-name="L3">
                <text:list-item>
                    <text:p text:style-name="P100">Communiquer à la première demande et dans les plus brefs délais de
                        manière électronique, toute information ou document que l’ANCT pourrait solliciter dans le cadre
                        du suivi budgétaire du projet et de l’appel à candidatures au global.
                    </text:p>
                </text:list-item>
                <text:list-item>
                    <text:p text:style-name="P100">Participer, autant que faire se peut, à toutes rencontres ou action
                        d’animation, de formation et de suivi mises en place par l’ANCT ou toute personne ou organisme
                        désignée par l’agence.
                    </text:p>
                </text:list-item>
                <text:list-item>
                    <text:p text:style-name="P100">Utiliser et alimenter en ressources, de manière mutualisée et ouverte
                        (contribution à des communs), les outils collaboratifs comme Les Bases.
                    </text:p>
                </text:list-item>
                <text:list-item>
                    <text:p text:style-name="P101">
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T29">Informer l’ANCT dès qu’il en a connaissance de tout
                                évènement pouvant affecter le bon déroulement de ses actions ou la bonne exécution de la
                                convention. En cas de difficulté majeure à la mise en œuvre d’une action conv
                            </text:span>
                        </text:span>
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T29">entionnée, un plan d’actions pour y remédier doit être mis
                                en place par le
                            </text:span>
                        </text:span>
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T30">bénéficiaire</text:span>
                        </text:span>
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T29">concerné et les changements stratégiques peuvent faire
                                l’objet d’un avenant à la convention sur accord des deux Parties.
                            </text:span>
                        </text:span>
                    </text:p>
                </text:list-item>
                <text:list-item>
                    <text:p text:style-name="P100">Autoriser pour l’ANCT ou toute autre personnes ou organisme désigné
                        par elle, l’accès aux sites sur lesquels une action est réalisée, la consultation de tout
                        document relatif aux actions, dans le respect de la confidentialité des informations transmises.
                        <text:bookmark-end text:name="_Hlk149848689"/>
                    </text:p>
                </text:list-item>
            </text:list>
            <text:p text:style-name="P71"/>
            <text:h text:style-name="Heading_20_4" text:outline-level="4">
                <text:bookmark-start text:name="_Toc162606002"/>
                <text:bookmark-start text:name="_Toc162604421"/>
                <text:bookmark-start text:name="_Toc162603194"/>
                <text:bookmark-start text:name="_Toc162530256"/>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T39">5. 1. 2. Formations Aidants connect</text:span>
                </text:span>
                <text:bookmark-end text:name="_Toc162606002"/>
                <text:bookmark-end text:name="_Toc162604421"/>
                <text:bookmark-end text:name="_Toc162603194"/>
                <text:bookmark-end text:name="_Toc162530256"/>
            </text:h>
            <text:p text:style-name="P54">Le bénéficiaire flèchera les 62 formations à Aidant Connect à [XX].</text:p>
            <text:p text:style-name="P54"/>
            <text:p text:style-name="P54">Le bénéficiaire devra informer la préfecture de département de la bonne mise
                en œuvre de sa stratégie de déploiement des formations.
            </text:p>
            <text:p text:style-name="P54"/>
            <text:p text:style-name="P56">
                <text:soft-page-break/>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T31">Il participera aux webinaires animés par l’ANCT pour les accom
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T31">pagner sur ce déploiement.</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T29"></text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P55"/>
            <text:p text:style-name="P55"/>
            <text:h text:style-name="P103" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162606003"/>
                <text:bookmark-start text:name="_Toc162604422"/>
                <text:bookmark-start text:name="_Toc162603195"/>
                <text:bookmark-start text:name="_Toc162530257"/>5.2. Evaluation de la dépense des fonds
                <text:bookmark-end text:name="_Toc162606003"/>
                <text:bookmark-end text:name="_Toc162604422"/>
                <text:bookmark-end text:name="_Toc162603195"/>
                <text:bookmark-end text:name="_Toc162530257"/>
            </text:h>
            <text:p text:style-name="P57">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">A l’achèvement du projet et au plus tard à N+1 de la date de
                        signature de la présente convention de fin de la présente convention, sont établis par le
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T15">bénéficiaire</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">et transmis à l’ANCT :</text:span>
                </text:span>
            </text:p>
            <text:list xml:id="list3083093069019995337" text:style-name="L4">
                <text:list-item>
                    <text:p text:style-name="P93">Un état des dépenses réalisées,</text:p>
                </text:list-item>
                <text:list-item>
                    <text:p text:style-name="P95">
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T15">Un bilan du projet</text:span>
                        </text:span>
                    </text:p>
                </text:list-item>
                <text:list-item>
                    <text:p text:style-name="P93">Une évaluation des résultats du projet</text:p>
                </text:list-item>
                <text:list-item>
                    <text:p text:style-name="P94">Une attestation de fin de formation pour chaque professionnel formé à
                        Aidants Connect via la subvention dédiée de la présente convention
                    </text:p>
                </text:list-item>
            </text:list>
            <text:p text:style-name="P59"/>
            <text:p text:style-name="P59">Ces documents devront attester de la conformité des dépenses effectuées à l&apos;objet
                de la subvention.
            </text:p>
            <text:p text:style-name="P61"/>
            <text:p text:style-name="P51">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T26">L’ANCT pourra</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">réclamer la restitution de tout ou partie de l’aide versée si le
                        bénéficiaire n’est pas en mesure de justifier d’une exécution conforme à la présente convention.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P61"/>
            <text:p text:style-name="P61"/>
            <text:p text:style-name="P59">Les pièces justificatives des dépenses et le bilan du projet, ainsi que toute
                correspondance relative à l’exécution de la convention, seront également transmis par le bénéficiaire à
                sa préfecture départementale de rattachement.
            </text:p>
            <text:p text:style-name="P59"/>
            <text:p text:style-name="P41"/>
            <text:h text:style-name="P79" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162606004"/>
                <text:bookmark-start text:name="_Toc162604423"/>
                <text:bookmark-start text:name="_Toc162603196"/>
                <text:bookmark-start text:name="_Toc162530258"/>Article 6 : Communication et propriété intellectuelle
                <text:bookmark-end text:name="_Toc162606004"/>
                <text:bookmark-end text:name="_Toc162604423"/>
                <text:bookmark-end text:name="_Toc162603196"/>
                <text:bookmark-end text:name="_Toc162530258"/>
            </text:h>
            <text:p text:style-name="P41">Les financements accordés doivent être portés obligatoirement à la
                connaissance des bénéficiaires et du grand public.
            </text:p>
            <text:p text:style-name="P41"/>
            <text:p text:style-name="P62">Tous les documents de promotion et de communication en lien avec les projets
                portés dans le cadre de cet appel à candidatures doivent porter les logotypes de l’ANCT et France
                Numérique Ensemble (affiches, flyers, programmes, site internet...) et la mention &quot;avec le soutien
                de l’ANCT&quot; pour les diverses publications, dossiers de presse, communiqués de presse, documents
                audiovisuels.
            </text:p>
            <text:p text:style-name="P41"/>
            <text:p text:style-name="P9">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">Aux seules fins d’exécution des obligations visées par la présente
                        convention, l’ANCT autorise le Bénéficiaire :
                    </text:span>
                </text:span>
            </text:p>
            <text:list xml:id="list1438152112945862493" text:style-name="L5">
                <text:list-item>
                    <text:p text:style-name="P88">
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T10">À utiliser son logo joint en annexe,</text:span>
                        </text:span>
                    </text:p>
                </text:list-item>
                <text:list-item>
                    <text:p text:style-name="P88">
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T10">À faire mention de la contribution de l’ANCT sous une forme
                                qui aura reçu son
                            </text:span>
                        </text:span>
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T10">accord préalable et écrit.</text:span>
                        </text:span>
                    </text:p>
                </text:list-item>
            </text:list>
            <text:p text:style-name="P47"/>
            <text:p text:style-name="P52">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">De</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">manière générale, chacune des parties à la présente convention
                        s’engage dans l’ensemble de ses actions de communication, d’information et de promotion à ne pas
                        porter atteinte à l’image ou à la renommée de son cocontractant.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P41"/>
            <text:p text:style-name="P41">En outre, chacune des parties s’engage à informer son cocontractant de tout
                projet d’action promotionnelle.
            </text:p>
            <text:p text:style-name="P41"/>
            <text:p text:style-name="P52">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">Toute utilisation, représentation ou reproduction des signes
                        distinctifs de l’ANCT et du
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T15">bénéficiaire</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">, par l’une des Parties, non prévue par le pr</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">ésent article, est interdite.</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P41"/>
            <text:p text:style-name="P52">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">A l’e</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">xtinction des obligations visées par l’article 2 de la convention,
                        le Bénéficiaire s’engage à cesser tout usage des signes distinctifs de l’ANCT sauf accord exprès
                        écrit contraire.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P48"/>
            <text:p text:style-name="P48">
                <text:soft-page-break/>
            </text:p>
            <text:p text:style-name="P52">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T14">Etant donné le rôle de l’ANCT dans la</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T14">mise en œuvre de la politique publique de l’inclusion numérique et
                        de la feuille de route FNE, le Bénéficiaire l’autorise
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T21">à utiliser, reproduire, représenter et diffuser les communications,
                        documents et autres livrables que le bénéficiaire réalise dans le
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T21">cadre de cette convention.</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P48"/>
            <text:h text:style-name="P79" text:outline-level="2">
                <text:bookmark-start text:name="_Hlk120095132"/>
                <text:bookmark-start text:name="_Toc162606005"/>
                <text:bookmark-start text:name="_Toc162604424"/>
                <text:bookmark-start text:name="_Toc162603197"/>
                <text:bookmark-start text:name="_Toc162530259"/>Article 7 : Respect du Contrat d’engagement républicain
                par les associations et les fondations
                <text:bookmark-end text:name="_Toc162606005"/>
                <text:bookmark-end text:name="_Toc162604424"/>
                <text:bookmark-end text:name="_Toc162603197"/>
                <text:bookmark-end text:name="_Toc162530259"/>
            </text:h>
            <text:p text:style-name="P72">Le Bénéficiaire de la subvention publique représentant une association ou une
                fondation, s’engage à respecter le contrat d’engagement républicain prévu à l’article 10-1 de la loi du
                12 avril 2000 relative aux droits des citoyens dans leurs relations avec les administrations notamment :
            </text:p>
            <text:list xml:id="list5993885943826627712" text:style-name="L6">
                <text:list-item>
                    <text:p text:style-name="P96">
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T10">À</text:span>
                        </text:span>
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T9">respecter les principes de liberté, d&apos;égalité, de
                                fraternité et de dignité de la personne humaine
                            </text:span>
                        </text:span>
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T9">, ainsi que les symboles de la République au sens de l&apos;article
                                2 de la Constitution ;
                            </text:span>
                        </text:span>
                    </text:p>
                </text:list-item>
                <text:list-item>
                    <text:p text:style-name="P96">
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
                    <text:p text:style-name="P96">
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T10">À</text:span>
                        </text:span>
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T9">s&apos;abstenir de toute action portant atteinte à l&apos;ordre
                                public.
                            </text:span>
                        </text:span>
                    </text:p>
                </text:list-item>
            </text:list>
            <text:p text:style-name="P72">L’association ou la fondation informe ses membres par tout moyen (affichage
                dans ses locaux, mise en ligne sur son site internet, etc…) des engagements inscrits dans le contrat
                d’engagement républicain.  Elle veille à ce qu’ils soient respectés par ses dirigeants, ses salariés,
                ses membres et ses bénévoles.
            </text:p>
            <text:p text:style-name="P72">Tout constat d’un manquement commis par l’une ou l’autre de ces personnes
                conduira au reversement de la subvention au prorata de la période restant à courir.
                <text:bookmark-end text:name="_Hlk120095132"/>
            </text:p>
            <text:p text:style-name="P48"/>
            <text:h text:style-name="P79" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162606006"/>
                <text:bookmark-start text:name="_Toc162604425"/>
                <text:bookmark-start text:name="_Toc162603198"/>
                <text:bookmark-start text:name="_Toc162530260"/>Article 8 : Résiliation
                <text:bookmark-end text:name="_Toc162606006"/>
                <text:bookmark-end text:name="_Toc162604425"/>
                <text:bookmark-end text:name="_Toc162603198"/>
                <text:bookmark-end text:name="_Toc162530260"/>
            </text:h>
            <text:h text:style-name="P103" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162606007"/>
                <text:bookmark-start text:name="_Toc162604426"/>
                <text:bookmark-start text:name="_Toc162603199"/>
                <text:bookmark-start text:name="_Toc162530261"/>8.1. Résiliation pour faute
                <text:bookmark-end text:name="_Toc162606007"/>
                <text:bookmark-end text:name="_Toc162604426"/>
                <text:bookmark-end text:name="_Toc162603199"/>
                <text:bookmark-end text:name="_Toc162530261"/>
                <text:s/>
            </text:h>
            <text:p text:style-name="P13">La convention sera résiliée de plein droit en cas de manquement, de mauvaise
                exécution ou d’inexécution, par l’une ou l’autre des parties, de ses obligations contractuelles, et
                notamment dans l’hypothèse où les sommes versées par l’ANCT au titre de la convention étaient utilisées
                à des fins non conformes aux objectifs définis par les présentes.
            </text:p>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">La Partie plaignante devra préalablement envoyer à l’autre Partie
                        une mise en demeure par lettre recommandée avec accusé de réception. Si à l’issue d’un délai de
                        trente (30) jours calendaires à
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">compter de son envoi, la mise en demeure est restée infructueuse ou
                        que la Partie n’a pas pu remédier au manquement pendant ce même délai, la convention est
                        résiliée par lettre recommandée avec accusé de réception.
                    </text:span>
                </text:span>
            </text:p>
            <text:h text:style-name="P103" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162606008"/>
                <text:bookmark-start text:name="_Toc162604427"/>
                <text:bookmark-start text:name="_Toc162603200"/>
                <text:bookmark-start text:name="_Toc162530262"/>8.2.<text:s/>Effets de la résiliation
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
                    <text:span text:style-name="T43">Le cas échéa</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T43">nt, le</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T40">bénéficiaire</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T43">sera tenu au reversement des sommes indûment perçues.</text:span>
                </text:span>
            </text:p>
            <text:p/>
            <text:p><text:soft-page-break/>Aucune indemnité ne pourra être demandée du fait de cette résiliation.
            </text:p>
            <text:p/>
            <text:p/>
            <text:h text:style-name="Heading_20_2" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162606009"/>
                <text:bookmark-start text:name="_Toc162604428"/>
                <text:bookmark-start text:name="_Toc162603201"/>
                <text:bookmark-start text:name="_Toc162530263"/>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T45">Article 9 : Force majeure</text:span>
                </text:span>
                <text:bookmark-end text:name="_Hlk127440961"/>
                <text:bookmark-end text:name="_Hlk127441007"/>
                <text:bookmark-end text:name="_Toc162606009"/>
                <text:bookmark-end text:name="_Toc162604428"/>
                <text:bookmark-end text:name="_Toc162603201"/>
                <text:bookmark-end text:name="_Toc162530263"/>
            </text:h>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T21">Les Parties conviennent qu’en cas de force majeure tel que défini
                        par l’article 1
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T21">218 du Code civil, les obligations contractuelles seront suspendues
                        à compter de la notification et de la preuve du cas de force majeure par la Partie qui le subit.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T21">Les obligations suspendues seront exécutées à nouveau dès que les
                        effets de l’événement de
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T21">force majeure auront cessé.</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P20">Si la situation de force majeure se poursuit au-delà d’un délai d’un 1 mois,
                l’autre Partie pourra résilier de plein droit tout ou partie de la convention par lettre recommandée
                avec accusé de réception.
            </text:p>
            <text:p/>
            <text:h text:style-name="P79" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162606010"/>
                <text:bookmark-start text:name="_Toc162604429"/>
                <text:bookmark-start text:name="_Toc162603202"/>
                <text:bookmark-start text:name="_Toc162530264"/>Article 10 : Dispositions générales
                <text:bookmark-end text:name="_Toc162606010"/>
                <text:bookmark-end text:name="_Toc162604429"/>
                <text:bookmark-end text:name="_Toc162603202"/>
                <text:bookmark-end text:name="_Toc162530264"/>
            </text:h>
            <text:h text:style-name="P103" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162606011"/>
                <text:bookmark-start text:name="_Toc162604430"/>
                <text:bookmark-start text:name="_Toc162603203"/>
                <text:bookmark-start text:name="_Toc162530265"/>10.1. Modification de la convention
                <text:bookmark-end text:name="_Toc162606011"/>
                <text:bookmark-end text:name="_Toc162604430"/>
                <text:bookmark-end text:name="_Toc162603203"/>
                <text:bookmark-end text:name="_Toc162530265"/>
            </text:h>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">Aucun document postérieur, ni aucune modification de la convention,
                        quelle qu’en soit la forme, ne produiront d’effet entre les parties sans prendre la forme d’un
                        avenant dûment daté et signé entre elles.
                    </text:span>
                </text:span>
            </text:p>
            <text:h text:style-name="P103" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162606012"/>
                <text:bookmark-start text:name="_Toc162604431"/>
                <text:bookmark-start text:name="_Toc162603204"/>
                <text:bookmark-start text:name="_Toc162530266"/>10.2. Nullité
                <text:bookmark-end text:name="_Toc162606012"/>
                <text:bookmark-end text:name="_Toc162604431"/>
                <text:bookmark-end text:name="_Toc162603204"/>
                <text:bookmark-end text:name="_Toc162530266"/>
            </text:h>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">Si l’une quelconque des stipulations de la présente convention
                        s’avérait nulle au regard d’une règle de droit en vigueur ou d’une décision administrative ou
                        judiciaire devenue définitive, elle serait alors réputée non écrite, sans pour autant
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">entraîner la nullité de la convention, ni altérer la validité des
                        autres stipulations.
                    </text:span>
                </text:span>
            </text:p>
            <text:h text:style-name="P103" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162606013"/>
                <text:bookmark-start text:name="_Toc162604432"/>
                <text:bookmark-start text:name="_Toc162603205"/>
                <text:bookmark-start text:name="_Toc162530267"/>10.3. Renonciation
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
            <text:h text:style-name="P103" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162606014"/>
                <text:bookmark-start text:name="_Toc162604433"/>
                <text:bookmark-start text:name="_Toc162603206"/>
                <text:bookmark-start text:name="_Toc162530268"/>10.4. Cession et transmission de la convention
                <text:bookmark-end text:name="_Toc162606014"/>
                <text:bookmark-end text:name="_Toc162604433"/>
                <text:bookmark-end text:name="_Toc162603206"/>
                <text:bookmark-end text:name="_Toc162530268"/>
            </text:h>
            <text:p>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T43">La présente convention étant conclu</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T44">intuitu</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T44">personæ</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T43">, le</text:span>
                </text:span>
                <text:bookmark-start text:name="_Hlk161321318"/>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T40">bénéficiaire</text:span>
                </text:span>
                <text:bookmark-end text:name="_Hlk161321318"/>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T43">ne pourra transférer ou céder, de quelque manière que ce soit les
                        droits et obligations en résultant, sans l’accord exprès, préalable et écrit respectif de
                        l’ANCT.
                    </text:span>
                </text:span>
            </text:p>
            <text:h text:style-name="P103" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162606015"/>
                <text:bookmark-start text:name="_Toc162604434"/>
                <text:bookmark-start text:name="_Toc162603207"/>
                <text:bookmark-start text:name="_Toc162530269"/>10.5. Publication des données
                <text:bookmark-end text:name="_Toc162606015"/>
                <text:bookmark-end text:name="_Toc162604434"/>
                <text:bookmark-end text:name="_Toc162603207"/>
                <text:bookmark-end text:name="_Toc162530269"/>
            </text:h>
            <text:p text:style-name="P11">Les données essentielles relatives aux conditions de la subvention de la
                présente convention seront publiées par l’ANCT sur le site Internet data.gouv.fr.
            </text:p>
            <text:h text:style-name="P103" text:outline-level="3">
                <text:bookmark-start text:name="_Toc162606016"/>
                <text:bookmark-start text:name="_Toc162604435"/>
                <text:bookmark-start text:name="_Toc162603208"/>
                <text:bookmark-start text:name="_Toc162530270"/>
                <text:soft-page-break/>10.6. Données personnelles
                <text:bookmark-end text:name="_Toc162606016"/>
                <text:bookmark-end text:name="_Toc162604435"/>
                <text:bookmark-end text:name="_Toc162603208"/>
                <text:bookmark-end text:name="_Toc162530270"/>
            </text:h>
            <text:p text:style-name="P10">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">Dans le cadre de la présente convention, les parties s’engagent à
                        respecter la réglementation en vigueur
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T10">applicable au traitement de données à caractère personnel et en
                        particulier, le règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016
                        entré en vigueur le 25 mai 2018.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">Les Parties s’engagent à utiliser les données recueillies pour
                        les
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">seuls besoins de l’exécution de la convention ainsi qu’à respecter
                        et à faire respecter par les personnes auxquelles seront
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">confiés le traitement d’informations à caractère personnel des
                        participants, les dispositions législatives et réglementaires relati
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">ves à l’informatique, aux fichiers et aux libertés.</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P70"/>
            <text:h text:style-name="P79" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162606017"/>
                <text:bookmark-start text:name="_Toc162604436"/>
                <text:bookmark-start text:name="_Toc162603209"/>
                <text:bookmark-start text:name="_Toc162530271"/>Article 11 : Conflit d&apos;intérêts
                <text:bookmark-end text:name="_Toc162606017"/>
                <text:bookmark-end text:name="_Toc162604436"/>
                <text:bookmark-end text:name="_Toc162603209"/>
                <text:bookmark-end text:name="_Toc162530271"/>
            </text:h>
            <text:p text:style-name="P76">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">Le bénéficiaire doit mettre en œuvre toutes les mesures nécessaires
                        pour éviter une situation de conflit d’intérêts où l&apos;exécution impartiale et objective de
                        la présente
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">convention est ou parait compromise pour des raisons mettant en jeu
                        l&apos;intérêt économique, l&apos;affinité politique ou nationale, les liens familiaux ou
                        affectifs ou tout autre intérêt partagé avec une autre personne.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P76">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">Si un conflit d&apos;intérêts survient pendant</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">l&apos;exécution de la présente convention, le bénéficiaire doit
                        immédiatement prendre toutes les mesures nécessaires pour le résoudre et prévenir l’ANCT.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P76">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">L’ANCT se réserve le droit de vérifier que les mesures prises sont
                        appropriées et peut exiger que des mes
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">ures supplémentaires soient prises si nécessaire.</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P13"/>
            <text:h text:style-name="P79" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162606018"/>
                <text:bookmark-start text:name="_Toc162604437"/>
                <text:bookmark-start text:name="_Toc162603210"/>
                <text:bookmark-start text:name="_Toc162530272"/>Article 12 : Litiges
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
                    <text:span text:style-name="T11">En cas de contestation, litiges ou autres différends éventuels sur
                        l’interprétation ou l’exécution de la présente convention, le
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">s parties s’efforceront de parvenir à un règlement à l’amiable
                        entre elles.
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">A défaut, et préalablement à l’engagement de toute action
                        contentieuse et sous réserves des dispositions prises au titre des articles précédents, les
                        parties s’engagent à recourir
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">à la médiation en application des articles L 213-1 du Code de la
                        justice administrative du différend qui les oppose et de saisir le président du Tribunal
                        administratif de Paris à l’effet d’organiser la mission de médiation et de désigner la ou les
                        personn
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">es qui en seront chargées.</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">En cas d’échec d’une solution amiable, tout litige ou contestation
                        auxquels la présente convention pourrait donner lieu tant sur sa validité que sur son
                        interprétation, son exécution ou sa réalisation, sera soumis aux tribunaux c
                    </text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T11">ompétents.</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P17"/>
            <text:p text:style-name="P60"><text:soft-page-break/>Fait en deux exemplaires originaux,
            </text:p>
            <text:p text:style-name="P60"/>
            <text:p text:style-name="P58">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T9">Le _</text:span>
                </text:span>
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T32">___________XX /XX/XXXX________</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P60"/>
            <text:p text:style-name="P60"/>
            <table:table table:name="Tableau1" table:style-name="Tableau1">
                <table:table-column table:style-name="Tableau1.A"/>
                <table:table-column table:style-name="Tableau1.B"/>
                <table:table-row table:style-name="Tableau1.1">
                    <table:table-cell table:style-name="Tableau1.A1" office:value-type="string">
                        <text:p text:style-name="P38">
                            <text:bookmark-start text:name="_Hlk149643635"/>
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T9">Pour</text:span>
                            </text:span>
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T28">NOM DE LA STRUCTURE,</text:span>
                            </text:span>
                        </text:p>
                        <text:p text:style-name="P49">Le/La FONCTON</text:p>
                        <text:p text:style-name="P38">
                            <text:span text:style-name="Police_20_par_20_défaut">
                                <text:span text:style-name="T32">Monsieur/Madame NOM</text:span>
                            </text:span>
                        </text:p>
                    </table:table-cell>
                    <table:table-cell table:style-name="Tableau1.A1" office:value-type="string">
                        <text:p text:style-name="P39">Pour l’ANCT,</text:p>
                        <text:p text:style-name="P39">Stanislas BOURRON,</text:p>
                        <text:p text:style-name="P39">Directeur Général</text:p>
                        <text:p text:style-name="P39"/>
                        <text:p text:style-name="P39"/>
                    </table:table-cell>
                </table:table-row>
                <table:table-row table:style-name="Tableau1.2">
                    <table:table-cell table:style-name="Tableau1.A1" office:value-type="string">
                        <text:p text:style-name="P39"/>
                    </table:table-cell>
                    <table:table-cell table:style-name="Tableau1.A1" office:value-type="string">
                        <text:p text:style-name="P39">
                            <text:bookmark-end text:name="_Hlk149643635"/>
                        </text:p>
                    </table:table-cell>
                </table:table-row>
            </table:table>
            <text:h text:style-name="P83" text:outline-level="2">
                <text:bookmark-start text:name="_Toc162606019"/>
                <text:bookmark-start text:name="_Toc162604438"/>
                <text:bookmark-start text:name="_Toc162603211"/>
                <text:bookmark-start text:name="_Toc162530273"/>
            </text:h>
            <text:p text:style-name="P3"/>
            <text:h text:style-name="P84" text:outline-level="2"/>
            <text:h text:style-name="P84" text:outline-level="2">Annexes
                <text:bookmark-end text:name="_Toc162606019"/>
                <text:bookmark-end text:name="_Toc162604438"/>
                <text:bookmark-end text:name="_Toc162603211"/>
                <text:bookmark-end text:name="_Toc162530273"/>
            </text:h>
            <text:p text:style-name="P22"/>
            <text:p text:style-name="Normal">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T5">Liste des annexes :</text:span>
                </text:span>
            </text:p>
            <text:list xml:id="list222982699171591548" text:style-name="L7">
                <text:list-item>
                    <text:p text:style-name="P90">
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T10">Cadrage du</text:span>
                        </text:span>
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T10">financement des projets d’ingénierie</text:span>
                        </text:span>
                    </text:p>
                </text:list-item>
                <text:list-item>
                    <text:p text:style-name="P91">Cadrage du financement des formation Aidants Connect</text:p>
                </text:list-item>
                <text:list-item>
                    <text:p text:style-name="P90">
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T10">Logo de l’ANCT</text:span>
                        </text:span>
                    </text:p>
                </text:list-item>
                <text:list-item>
                    <text:p text:style-name="P91">Logo de FNE</text:p>
                </text:list-item>
            </text:list>
            <text:p text:style-name="P24"/>
            <text:p text:style-name="P24"/>
            <text:p text:style-name="Normal">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T33">Annexe 1</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P4">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T34">Cadrage du financement des projets d’ingénierie</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P23"/>
            <text:p text:style-name="P8">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T20">Article 1 : Type de dépenses éligibles et transfert des fonds
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P20">La subvention reçue par le bénéficiaire doit être fléchée sur un ou plusieurs
                projet(s) de territoires qui s’inscrivent dans le cadre suivant :
            </text:p>
            <text:p text:style-name="P8">
                <draw:frame draw:style-name="fr2" draw:name="Image 5" text:anchor-type="as-char" svg:y="0in"
                            svg:width="6.2709in" style:rel-width="scale" svg:height="2.1098in" style:rel-height="scale"
                            draw:z-index="1">
                    <draw:image xlink:href="Pictures/100000000000044A0000015D34F20EE6.png" xlink:type="simple"
                                xlink:show="embed" xlink:actuate="onLoad"/>
                </draw:frame>
            </text:p>
            <text:p text:style-name="P20"><text:soft-page-break/>La subvention reçue par le bénéficiaire ne peut en
                aucun cas être transférée à un autre organisme hormis dans le cadre de prestation de service avec devis
                associé.
            </text:p>
            <text:p text:style-name="P20">Dans le cadre où plusieurs membres de la gouvernance sont destinataires des
                fonds d’ingénierie, une convention par organisme bénéficiaire doit être établie avec l’ANCT.
            </text:p>
            <text:p text:style-name="P15"/>
            <text:p text:style-name="P15">Article 2 : Co-financement d’ETP pour la fonction publique</text:p>
            <text:p text:style-name="P19">Les coûts de personnels titulaires de la fonction publique territoriale ne
                sont pas éligibles à une subvention de l’Etat.
            </text:p>
            <text:p text:style-name="P24"/>
            <text:p text:style-name="P4">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T33">Annexe 2</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P4">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T34">Cadrage du financement des formations Aidants Connect</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P23"/>
            <text:p text:style-name="P15">Article 1 : Le dispositif Aidants Connect</text:p>
            <text:p text:style-name="P19">Aidants Connect est un service public numérique qui permet de sécuriser
                l’accompagnement des usagers dans leurs démarches administratives en ligne. Pour être habilité à Aidants
                Connect, un professionnel doit suivre une formation lui permettant d’acquérir les bases de connaissance
                nécessaires à l’utilisation de ce service.
            </text:p>
            <text:p text:style-name="Normal">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T20">Article 2 : La formation à Aidants Connect</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P19">Des modalités de financement des formations Aidants Connect existent déjà dans
                les cas de figure suivants :
            </text:p>
            <text:list xml:id="list222206924" text:style-name="L6">
                <text:list-item>
                    <text:p text:style-name="P92">Pour les conseillers numériques</text:p>
                </text:list-item>
            </text:list>
            <text:p text:style-name="P19">La formation est financée dans le cadre de la formation continue des
                conseillers numériques* et opérée par la Mednum.
            </text:p>
            <text:p text:style-name="P26">*Dans le cadre de la formation initiale, le dispositif inclut deux modules
                thématiques choisis par le conseiller numérique. Tous les conseillers numériques ayant suivi un parcours
                de formation initiale peuvent également suivre un module par an, financé par l’état.
            </text:p>
            <text:list xml:id="list1073365824" text:continue-numbering="true" text:style-name="L6">
                <text:list-item>
                    <text:p text:style-name="P89">
                        <text:span text:style-name="Police_20_par_20_défaut">
                            <text:span text:style-name="T21"><text:s/>La structure demandeuse est adhérente à l’OPCO
                                Uniformation
                            </text:span>
                        </text:span>
                    </text:p>
                </text:list-item>
            </text:list>
            <text:p text:style-name="P19">La formation est financée dans le cadre d’un partenariat entre l’ANCT et
                Uniformation, et la formation peut être suivi auprès de l’organisme du choix de la structure.
            </text:p>
            <text:list xml:id="list1048657532" text:continue-numbering="true" text:style-name="L6">
                <text:list-item>
                    <text:p text:style-name="P92">La structure est déjà habilitée Aidants Connect</text:p>
                </text:list-item>
            </text:list>
            <text:p text:style-name="P19">En plus des 2 options ci-dessus, un employé habilité et utilisateur d’Aidants
                Connect d’une structure peut former son collègue si celui-ci a réalisé plus de 5 mandats (se rapprocher
                du référent Aidants Connect de votre structure pour bénéficier d’une formation entre pairs).
            </text:p>
            <text:p text:style-name="P24"/>
            <text:p text:style-name="P23"/>
            <text:p text:style-name="P23"/>
            <text:p text:style-name="P24"/>
            <text:p text:style-name="P24"/>
            <text:p text:style-name="P24"/>
            <text:p text:style-name="P24">
                <text:soft-page-break/>
            </text:p>
            <text:p text:style-name="P24"/>
            <text:p text:style-name="P24"/>
            <text:p text:style-name="P24"/>
            <text:p text:style-name="P24"/>
            <text:p text:style-name="P4">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T33">Annexe 3</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P4">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T34">Logo ANCT</text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P19"/>
            <text:p text:style-name="P21"/>
            <text:p text:style-name="P4">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T21">
                        <draw:frame draw:style-name="fr2" draw:name="Image 7" text:anchor-type="as-char" svg:y="0in"
                                    svg:width="6.3in" style:rel-width="scale" svg:height="2.378in"
                                    style:rel-height="scale" draw:z-index="2">
                            <draw:image xlink:href="Pictures/10000000000003200000012EED57178D.png" xlink:type="simple"
                                        xlink:show="embed" xlink:actuate="onLoad"/>
                        </draw:frame>
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P29">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T46">
                        <text:tab/>
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P24"/>
            <text:p text:style-name="P24">Annexe 4</text:p>
            <text:p text:style-name="P25">Logo France Numérique Ensemble</text:p>
            <text:p text:style-name="P25"/>
            <text:p text:style-name="P4">
                <text:span text:style-name="Police_20_par_20_défaut">
                    <text:span text:style-name="T33">
                        <draw:frame draw:style-name="fr2" draw:name="Image 6" text:anchor-type="as-char" svg:y="0in"
                                    svg:width="5.2484in" style:rel-width="scale" svg:height="1.7445in"
                                    style:rel-height="scale" draw:z-index="3">
                            <draw:image xlink:href="Pictures/100000000000043800000167D46606F0.png" xlink:type="simple"
                                        xlink:show="embed" xlink:actuate="onLoad"/>
                        </draw:frame>
                    </text:span>
                </text:span>
            </text:p>
            <text:p text:style-name="P21"/>
            <text:p text:style-name="P21"/>
            <text:p text:style-name="P21"/>
            <text:p text:style-name="P21"/>
            <text:p text:style-name="P21">
                <text:soft-page-break/>
            </text:p>
            <text:p text:style-name="P21"/>
            <text:p text:style-name="P19"/>
        </office:text>
    </office:body>
</office:document-content>
`
